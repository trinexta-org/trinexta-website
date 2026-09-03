type GtmEventData = Record<string, string | number | boolean | null | undefined>;

interface Tarteaucitron {
  init: (config: Record<string, string | boolean>) => void;
  user: {
    googletagmanagerId?: string;
    googleadsId?: string;
    googleadsMore?: () => void;
    gtagUa?: string;
    gtagCrossdomain?: string[];
    gtagMore?: () => void;
  };
  job?: string[];
}

declare global {
  interface Window {
    dataLayer?: Array<{ event: string } & GtmEventData>;
    tarteaucitron?: Tarteaucitron;
    gtag?: (...args: unknown[]) => void;
  }
}

/** ID Google Ads (ex. AW-16975609254). Chargé via tarteaucitron, sous consentement. */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Action de conversion "lead" du compte Ads (send_to complet, ID + label).
 * Valeur publique (visible dans le tag cote navigateur) : volontairement en dur
 * plutot qu'en variable d'env, une variable absente en prod ferait disparaitre
 * la conversion en silence, exactement le bug qu'on corrige ici.
 */
export const ADS_LEAD_CONVERSION = "AW-16975609254/T_j8CLGw9rQaEKb7zJ4_";

/**
 * Déclenche une conversion Google Ads.
 * `sendTo` = "AW-XXXXXXXXXX/label" fourni par Google Ads pour chaque action.
 * Silencieux si gtag absent (consentement refusé, hors production).
 */
export const trackAdsConversion = (
  sendTo: string,
  params: GtmEventData = {},
): void => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: sendTo, ...params });
    }
  } catch {
    // Voir la note sur trackLeadConversion : la mesure ne casse jamais le parcours.
  }
};

export const pushGtmEvent = (event: string, data: GtmEventData = {}): void => {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: event,
        ...data,
      });
    }
  } catch {
    // Voir la note sur trackLeadConversion : la mesure ne casse jamais le parcours.
  }
};

/**
 * Conversions ameliorees. Desactive tant que le compte Ads n'est pas configure
 * (conditions Donnees Client acceptees + action de conversion basculee en
 * "conversions ameliorees"). Sans ces deux prerequis cote compte, Google ignore
 * le user_data : on ne l'envoie donc pas.
 */
const ENHANCED_CONVERSIONS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENHANCED_CONVERSIONS === "true";

/** Identite du lead, utilisee uniquement hachee, jamais transmise en clair. */
export interface LeadIdentity {
  email?: string;
  telephone?: string;
}

/**
 * Normalisation Google : minuscules, sans espaces autour. Pour gmail.com et
 * googlemail.com uniquement, Google retire aussi les points et le suffixe "+"
 * du local-part avant de hacher. Ne pas le faire ferait echouer le
 * rapprochement pour tous les leads en Gmail, qui sont nombreux chez les TPE.
 * Cette regle ne s'applique a aucun autre domaine.
 */
const GOOGLE_MAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

const normalizeEmail = (raw: string): string => {
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf("@");
  if (at < 1) return email;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!GOOGLE_MAIL_DOMAINS.has(domain)) return email;

  const withoutPlusSuffix = local.split("+")[0];
  return `${withoutPlusSuffix.replace(/\./g, "")}@${domain}`;
};

/**
 * Normalisation Google : E.164. Les formats acceptes par nos formulaires
 * ("06 12 34 56 78", "+33 6 12 34 56 78", "06.12.34.56.78") convergent tous
 * vers "+33612345678". Retourne null si le numero ne rentre pas dans le format,
 * un hash de numero mal forme ne matcherait jamais cote Google.
 */
const normalizePhoneFr = (raw: string): string | null => {
  const compact = raw.replace(/[\s.\-()]/g, "");
  if (/^\+33[1-9]\d{8}$/.test(compact)) return compact;
  if (/^33[1-9]\d{8}$/.test(compact)) return `+${compact}`;
  if (/^0[1-9]\d{8}$/.test(compact)) return `+33${compact.slice(1)}`;
  return null;
};

/** SHA-256 hex. Null si l'API n'est pas dispo (contexte non securise). */
export const sha256Hex = async (value: string): Promise<string | null> => {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;
  try {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
};

/** Construit le user_data hache attendu par les conversions ameliorees. */
export const buildHashedUserData = async (
  identity: LeadIdentity,
): Promise<Record<string, string> | null> => {
  const data: Record<string, string> = {};

  if (identity.email) {
    const hashed = await sha256Hex(normalizeEmail(identity.email));
    if (hashed) data.sha256_email_address = hashed;
  }

  if (identity.telephone) {
    const phone = normalizePhoneFr(identity.telephone);
    const hashed = phone ? await sha256Hex(phone) : null;
    if (hashed) data.sha256_phone_number = hashed;
  }

  return Object.keys(data).length > 0 ? data : null;
};

/**
 * Conversion "lead" : un formulaire de prise de contact a ete accepte par l'API.
 * A n'appeler qu'apres une reponse serveur OK, jamais au clic sur un CTA :
 * un clic n'est pas un lead et gonflerait la mesure d'envois echoues.
 *
 * `identity` alimente les conversions ameliorees (rattachement cross-device).
 * Le hachage se fait ici, dans le navigateur : Google ne recoit jamais l'email
 * ni le telephone en clair. A await avant toute navigation, le hachage est
 * asynchrone et un redirect immediat perdrait la conversion.
 */
export const trackLeadConversion = async (
  params: GtmEventData = {},
  identity?: LeadIdentity,
): Promise<void> => {
  // Ne rejette jamais. Les appelants attendent cette promesse au milieu de leur
  // parcours de succes : un rejet interromprait le handler avant l'affichage de
  // la confirmation, alors que le lead est deja enregistre cote serveur.
  // L'utilisateur croirait a un echec et resoumettrait, creant un doublon.
  // window.gtag est un objet tiers, remplacable par une extension ou un
  // bloqueur : on ne fait aucune hypothese sur son comportement.
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    if (ENHANCED_CONVERSIONS_ENABLED && identity) {
      try {
        const userData = await buildHashedUserData(identity);
        if (userData) window.gtag("set", "user_data", userData);
      } catch {
        // Un echec de hachage ne doit pas empecher la conversion de partir :
        // ce catch interne est distinct pour que l'evenement suive quand meme.
      }
    }

    window.gtag("event", "conversion", {
      send_to: ADS_LEAD_CONVERSION,
      ...params,
    });
  } catch {
    // Mesure perdue, parcours utilisateur preserve. C'est le bon arbitrage.
  }
};

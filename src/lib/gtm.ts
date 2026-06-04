type GtmEventData = Record<string, string | number | boolean | null | undefined>;

interface Tarteaucitron {
  init: (config: Record<string, string | boolean>) => void;
  user: {
    googletagmanagerId?: string;
  };
  job?: string[];
}

declare global {
  interface Window {
    dataLayer?: Array<{ event: string } & GtmEventData>;
    tarteaucitron?: Tarteaucitron;
  }
}

export const pushGtmEvent = (event: string, data: GtmEventData = {}): void => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...data,
    });
  }
};
const FALLBACK_DATA = {
    rating: 5.0,
    userRatingCount: 10,
    reviewsUri: "https://www.google.com/search?q=Trinexta+Evry#lrd=0x47e5e33055555555:0x5555555555555555,1"
};

export async function getGoogleRating() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId || apiKey === "ton_code_ici") {
        console.warn("Google Places API : Utilisation des données de secours (Clé manquante).");
        return FALLBACK_DATA;
    }

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "rating,userRatingCount,googleMapsLinks.reviewsUri",
                },
                next: {
                    revalidate: false
                },
            }
        );

        if (!response.ok) throw new Error("Erreur lors du fetch Google API");

        const data = await response.json();

        return {
            rating: data.rating || FALLBACK_DATA.rating,
            userRatingCount: data.userRatingCount || FALLBACK_DATA.userRatingCount,
            reviewsUri: data.googleMapsLinks?.reviewsUri || FALLBACK_DATA.reviewsUri,
        };
    } catch (error) {
        console.error("Erreur Google Places :", error);
        return FALLBACK_DATA;
    }
}
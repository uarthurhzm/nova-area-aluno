export const getCurrentLocation = (): { latitude: number; longitude: number } => {
    if (import.meta.env.VITE_ENV === 'development') {
        return { latitude: 0, longitude: 0 };
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                return {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                return { latitude: 0, longitude: 0 };
            }
        );
    } else {
        console.error("Geolocalização não é suportada pelo seu navegador.");
        return { latitude: 0, longitude: 0 };
    }

    return { latitude: 0, longitude: 0 };
}

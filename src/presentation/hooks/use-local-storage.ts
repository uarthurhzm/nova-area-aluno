export type LocalStorageKeys = "rememberMe" | "theme";

export const getLocalStorageItem = (key: LocalStorageKeys): string | null => {
    return localStorage.getItem(key);
}

export const setLocalStorageItem = (key: LocalStorageKeys, value: string): void => {
    localStorage.setItem(key, value);
}

export const removeLocalStorageItem = (key: LocalStorageKeys): void => {
    localStorage.removeItem(key);
}

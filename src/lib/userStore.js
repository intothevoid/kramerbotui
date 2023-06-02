import {writable} from "svelte/store";

// Create store
export const userStore = writable({
    isLoggedIn: false,
    showRegScreen: false,
    username: null,
    chatId: null
});

export async function loginFalse() {
    userStore.update((state) => ({
        ...state,
        showRegScreen: false,
        isLoggedIn: false,
    }));
}
export async function signup() {
    userStore.update((state) => ({
        ...state,
        showRegScreen: true,
        isLoggedIn: false,
    }));
}

export async function loginTrue() {
    userStore.update((state) => ({
        ...state,
        showRegScreen: false,
        isLoggedIn: true,
    }));
}

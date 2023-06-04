import { writable } from "svelte/store";

// Create store
export const userStore = writable({
    isLoggedIn: false,
    showRegScreen: false,
    username: "",
    chatId: ""
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

export async function resetUser() {
    userStore.update((state) => ({
        ...state,
        username: "",
        chatId: "",
    }));
}

export async function updateUser(username, chatId) {
    userStore.update((state) => ({
        ...state,
        username: username,
        chatId: chatId,
    }));
} 
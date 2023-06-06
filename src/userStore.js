import { writable } from "svelte/store";

// Check if there's a saved state in localStorage
let savedState = localStorage.getItem('userStore');

// If there is, use it to initialize the store. Otherwise, use the default state.
let initialState = savedState ? JSON.parse(savedState) : {
    isLoggedIn: false,
    showRegScreen: false,
    username: "",
    chatId: ""
};

// Create store
export const userStore = writable(initialState);

// Whenever the state changes, save it to localStorage.
userStore.subscribe(value => {
    localStorage.setItem('userStore', JSON.stringify(value));
});

export async function loginFalse() {
    userStore.update((state) => ({
        ...state,
        showRegScreen: false,
        isLoggedIn: false,
        username: "",
        chatId: ""
    }));
}
export async function signup() {
    userStore.update((state) => ({
        ...state,
        showRegScreen: true,
        isLoggedIn: false,
        username: "",
        chatId: ""
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

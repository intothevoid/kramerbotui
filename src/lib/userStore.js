import {writable} from "svelte/store";

// Create store
export const userStore = writable({
    isLoggedIn: false,
    showRegScreen: false,
    username: null
});
import {writable} from "svelte/store";

// Create store
export const userStore = writable({
    isLoggedIn: false,
    username: null
});
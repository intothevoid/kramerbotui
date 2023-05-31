<script>
    import { userStore } from "./userStore";

    let username = ""; // fetch username from API
    let watch = "";
    let watches = [];

    function addWatch() {
        watches = [...watches, watch];
        watch = "";
    }

    function logout() {
        userStore.update((state) => ({
            ...state,
            isLoggedIn: false,
            username: null,
        }));
    }
</script>

<div class="mx-auto px-4 bg-gray-100 rounded shadow-lg p-6 min-h-screen">
    <div class="flex items-center justify-between py-4">
        <h1 class="text-lg">Hello {username !== "" ? username : "User"}!</h1>
        <button
            class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            on:click={logout}>Logout</button
        >
    </div>

    <div class="flex justify-center">
        <input
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            bind:value={watch}
            placeholder="Enter keyword(s) to watch"
        />
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            on:click={addWatch}>Add Watch</button
        >
    </div>

    {#if watches.length > 0}
        <div class="mt-4">
            <h2 class="text-lg mb-2">Your watched words / phrases:</h2>
            <div class="flex flex-wrap gap-2">
                {#each watches as watch}
                    <span
                        class="bg-gray-400 rounded-full text-xs font-semibold text-white py-1 px-4"
                        >{watch}</span
                    >
                {/each}
            </div>
        </div>
    {/if}
</div>

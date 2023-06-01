<script>
    import { userStore } from "./userStore";

    let username = ""; // fetch username from API
    let watch = "";
    let watches = [];

    let ozbargainOptions = {
        goodDeals: false,
        awesomeDeals: false,
    };

    let amazonOptions = {
        dailyDeals: false,
        weeklyDeals: false,
    };

    function addWatch() {
        watches = [...watches, watch];
        watch = "";
    }

    function deleteWatch(index) {
        watches = watches.filter((_, i) => i !== index);
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
        <h1 class="text-4xl">Hello {username !== "" ? username : "User"}!</h1>
        <button
            class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            on:click={logout}>Logout</button
        >
    </div>

    <div class="flex justify-left">
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
            <h2 class="text-sm mt-4 mb-4">Your watched words / phrases:</h2>
            <div class="flex flex-wrap gap-2">
                {#each watches as watch, index}
                    <div
                        class="flex items-center bg-gray-400 rounded-full text-xs font-semibold text-white py-1 px-2 mr-2 mb-2"
                    >
                        <span>{watch}</span>
                        <button
                            class="ml-2 text-sm"
                            on:click={() => deleteWatch(index)}>✕</button
                        >
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <h2 class="text-sm mt-4 mb-4">
            Please add some keywords above. Example: 'Sennheiser' or 'iRobot
            Vacuum'.
        </h2>
    {/if}

    <!-- Ozbargain Panel -->
    <div class="mt-4 p-4 bg-white rounded shadow">
        <h2 class="text-lg mb-2 font-bold">Ozbargain</h2>
        <div>
            <label>
                <input
                    type="checkbox"
                    bind:checked={ozbargainOptions.goodDeals}
                />
                Watch good deals (25+ upvotes in an hour)
            </label>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    bind:checked={ozbargainOptions.awesomeDeals}
                />
                Watch awesome deals (100+ upvotes in 24 hours)
            </label>
        </div>
    </div>

    <!-- Amazon Panel -->
    <div class="mt-4 p-4 bg-white rounded shadow">
        <h2 class="text-lg font-bold mb-2">Amazon</h2>
        <div>
            <label>
                <input
                    type="checkbox"
                    bind:checked={amazonOptions.dailyDeals}
                />
                Watch top daily deals
            </label>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    bind:checked={amazonOptions.weeklyDeals}
                />
                Watch top weekly deals
            </label>
        </div>
    </div>

    <!-- Status Panel -->
    <div class="mt-4 p-4 bg-white rounded shadow">
        <h2 class="text-lg font-bold mb-10">Statistics</h2>
        <!-- Add status information here -->
    </div>

    <div class="footer mt-10">Made with ❤️ in Adelaide, SA</div>
</div>

<style>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
    }
</style>

<script>
    import { onMount } from "svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import { SERVER_URL } from "../config";
    import { loginFalse, userStore } from "../userStore";

    let username;
    let chatId;

    $: {
        username = $userStore.username;
        chatId = $userStore.chatId;
    }

    let watch = "";
    let watches = [];
    let ozbSent = 0;
    let amzSent = 0;

    let ozbargainOptions = {
        goodDeals: false,
        awesomeDeals: false,
    };

    let amazonOptions = {
        topDaily: false,
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
        loginFalse();
    }

    function resetUserData() {
        ozbargainOptions.goodDeals = false;
        ozbargainOptions.awesomeDeals = false;
        amazonOptions.topDaily = false;
        amazonOptions.topWeekly = false;
        ozbSent = 0;
        amzSent = 0;
    }

    async function loadUserData() {
        let errRsp = "Unknown error";
        try {
            const response = await fetch(`${SERVER_URL}/users/${chatId}`);
            const data = await response.json();
            if (data) {
                errRsp = data["result"];
            }
            if (!response.ok) {
                toast.push(`Unable to load user data! Error: ${errRsp}`);
                resetUserData();
                loginFalse();
            } else {
                const user = data["result"];
                watches = user.Keywords;
                ozbargainOptions.goodDeals = user.OzbGood;
                ozbargainOptions.awesomeDeals = user.OzbSuper;
                amazonOptions.topDaily = user.AmzDaily;
                amazonOptions.topWeekly = user.AmzWeekly;
                ozbSent = user.OzbSent.length; // assuming OzbSent is an array
                amzSent = user.AmzSent.length; // assuming AmzSent is an array
            }
        } catch (error) {
            toast.push(`Unable to load user data. Error: ${errRsp} ${error}`);
            resetUserData();
            loginFalse();
        }
    }

    // Load user data on component mount
    onMount(loadUserData);
</script>

<div class="mx-auto px-4 bg-gray-100 rounded shadow-lg p-6 min-h-screen">
    <div class="flex items-center justify-between py-4">
        <h1 class="text-4xl">
            Hello {username !== "" ? username : "User"}! 😎
        </h1>
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
        <h2 class="text-lg mb-2 font-bold">🟠 Ozbargain</h2>
        <div>
            <label>
                <input
                    type="checkbox"
                    bind:checked={ozbargainOptions.goodDeals}
                />
                Watch good deals (25+ upvotes within an hour)
            </label>
        </div>
        <div>
            <label>
                <input
                    type="checkbox"
                    bind:checked={ozbargainOptions.awesomeDeals}
                />
                Watch awesome deals (100+ upvotes within 24 hours)
            </label>
        </div>
    </div>

    <!-- Amazon Panel -->
    <div class="mt-4 p-4 bg-white rounded shadow">
        <h2 class="text-lg font-bold mb-2">🅰️ Amazon</h2>
        <div>
            <label>
                <input type="checkbox" bind:checked={amazonOptions.topDaily} />
                Watch top daily deals
            </label>
        </div>
        <div>
            <label>
                <input type="checkbox" bind:checked={amazonOptions.topWeekly} />
                Watch top weekly deals
            </label>
        </div>
    </div>

    <!-- Status Panel -->
    <div class="mt-4 p-4 bg-white rounded shadow">
        <h2 class="text-lg font-bold mb-2">📈 Statistics</h2>
        <ul>
            <li>
                No. of Ozbargain deals sent to you: {ozbSent}
            </li>
            <li>
                No. of Amazon deals sent to you: {amzSent}
            </li>
        </ul>
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

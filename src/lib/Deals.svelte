<script>
    import { SERVER_URL } from "../config";
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";

    let dealData = {
        AMZ: [],
        OZB: [],
    };

    const noOfDeals = "10";

    async function getDeals() {
        let errRsp = "Unknown error";
        try {
            // Get data from server
            const response = await fetch(`${SERVER_URL}/deals/${noOfDeals}`);
            const data = await response.json();
            if (data) {
                errRsp = data["result"];
            }
            if (!response.ok) {
                toast.push(
                    `Could not fetch deals from server. Error: ${errRsp}`
                );
            }

            // Update dealData with fetched data
            dealData = data["result"];
            console.log(dealData);
            console.log(dealData.AMZ);
            console.log(dealData.OZB);
        } catch (error) {
            toast.push(
                `Could not fetch deals from server. Error: ${errRsp} ${error}`
            );
        }
    }

    // Call getDeals on component mount
    onMount(getDeals);
</script>

<div>
    <!-- Deals Panel -->
    <div class="mt-4 p-4 bg-white rounded shadow">
        <h2 class="text-lg font-bold mb-2">🛍️ Latest Deals</h2>

        {#if dealData.AMZ.length === 0 && dealData.OZB.length === 0}
            <p>No deals available or unable to retrieve deals.</p>
        {:else}
            <div>
                <!-- Amazon Deals -->
                <h3 class="text-lg font-semibold mt-4">️️🅰️ Amazon Deals</h3>
                {#if dealData.AMZ.length === 0}
                    <p>No Amazon deals available.</p>
                {:else}
                    <!-- Amazon deals table... -->
                    <table class="table-auto w-full mt-2">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-justify">Title</th>
                                <th class="px-4 py-2 text-justify">Time</th>
                                <th class="px-4 py-2 text-justify">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each dealData.AMZ as deal}
                                <tr>
                                    <td class="text-sm border px-4 py-2"
                                        >{deal.title}</td
                                    >
                                    <td class="text-sm border px-4 py-2"
                                        >{deal.time}</td
                                    >
                                    <td class="text-sm border px-4 py-2"
                                        ><a href={deal.url}>Link</a></td
                                    >
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
                <!-- Ozbargain Deals -->
                <h3 class="text-lg font-semibold mt-4">🟠 Ozbargain Deals</h3>
                {#if dealData.OZB.length === 0}
                    <p>No Ozbargain deals available.</p>
                {:else}
                    <!-- Ozbargain deals table... -->
                    <table class="table-auto w-full mt-2">
                        <thead>
                            <tr>
                                <th class="px-4 py-2">Title</th>
                                <th class="px-4 py-2">Time</th>
                                <th class="px-4 py-2">Upvotes</th>
                                <th class="px-4 py-2">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each dealData.OZB as deal}
                                <tr>
                                    <td class="text-sm border px-4 py-2"
                                        >{deal.title}</td
                                    >
                                    <td class="text-sm border px-4 py-2"
                                        >{deal.time}</td
                                    >
                                    <td class="text-sm border px-4 py-2"
                                        >{deal.upvotes}</td
                                    >
                                    <td class="text-sm border px-4 py-2"
                                        ><a href={deal.url}>Link</a></td
                                    >
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
            </div>
        {/if}
    </div>
</div>

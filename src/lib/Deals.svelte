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
        <h2 class="text-md font-bold mb-2">🛍️ Latest Deals</h2>

        {#if dealData.AMZ.length === 0 && dealData.OZB.length === 0}
            <p>No deals available or unable to retrieve deals.</p>
        {:else}
            <div>
                <!-- Ozbargain Deals -->
                <h3 class="text-md font-semibold mt-4">🟠 Ozbargain Deals</h3>
                {#if dealData.OZB.length === 0}
                    <p>No Ozbargain deals available.</p>
                {:else}
                    <!-- Ozbargain deals table... -->
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Upvotes</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each dealData.OZB as deal}
                                <tr>
                                    <td>{deal.title}</td>
                                    <td>{deal.time}</td>
                                    <td class={deal.upvotes > 25 ? "hot" : ""}>
                                        {deal.upvotes > 25
                                            ? "🔥 "
                                            : ""}{deal.upvotes}
                                    </td>
                                    <td><a href={deal.url}>Link</a></td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}

                <!-- Amazon Deals -->
                <h3 class="text-md font-semibold mt-4">️️🅰️ Amazon Deals</h3>
                {#if dealData.AMZ.length === 0}
                    <p>No Amazon deals available.</p>
                {:else}
                    <!-- Amazon deals table... -->
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each dealData.AMZ as deal}
                                <tr>
                                    <td>{deal.title}</td>
                                    <td>{deal.time}</td>
                                    <td><a href={deal.url}>Link</a></td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    /* Customize your styles */
    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
    }
    th,
    td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        text-align: left;
        font-size: small;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    .hot {
        color: red;
        font-weight: bold;
    }
</style>

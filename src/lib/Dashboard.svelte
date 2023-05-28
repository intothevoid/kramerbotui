<script>
    let username = ""; // fetch username from API
    let keyword = "";
    let keywords = [];

    function addKeyword() {
        keywords = [...keywords, keyword];
        keyword = "";
    }
</script>

<div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
        <h1 class="text-lg">Hello, {username}</h1>
        <button class="btn btn-primary">Logout</button>
    </div>

    <div class="mb-4">
        <input type="checkbox" class="checkbox checkbox-primary" /> Checkbox 1
        <input type="checkbox" class="checkbox checkbox-primary" /> Checkbox 2
        <input type="checkbox" class="checkbox checkbox-primary" /> Checkbox 3
        <input type="checkbox" class="checkbox checkbox-primary" /> Checkbox 4
    </div>

    <div class="mb-4">
        <input
            class="input input-bordered"
            type="text"
            bind:value={keyword}
            placeholder="Add keyword"
        />
        <button class="btn btn-primary" on:click={addKeyword}>Add</button>
    </div>

    <div>
        <ul>
            {#each keywords as keyword}
                <li>{keyword}</li>
            {/each}
        </ul>
    </div>
</div>

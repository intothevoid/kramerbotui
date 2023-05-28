<script>
    let username = "";
    let password = "";
    let passwordRepeat = "";
    let chatId = "";

    async function verifyPass() {
        // check if password is same
    }

    async function signup() {
        // signup API call
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <h1 class="py-10 mb-10 text-5xl">Kramer's Deals.</h1>
    <h1 class="py-4 mb-4 text-md text-gray-600">Register your account</h1>
    <div class="p-4 bg-white rounded shadow">
        <div>
            <input
                class="mb-2 px-3 py-2 input input-bordered border border-slate-200 rounded-md shadow-sm"
                type="text"
                bind:value={chatId}
                placeholder="Chat ID"
            />
        </div>
        <div>
            <input
                class="mb-2 px-3 py-2 input input-bordered border border-slate-200 rounded-md shadow-sm"
                type="text"
                bind:value={username}
                placeholder="Username"
            />
        </div>

        <div>
            <input
                class="mb-2 px-3 py-2 input input-bordered border border-slate-200 rounded-md shadow-sm"
                type="text"
                bind:value={password}
                placeholder="Password"
            />
        </div>
        <div>
            <input
                class="mb-2 px-3 py-2 input input-bordered border border-slate-200 rounded-md shadow-sm"
                type="text"
                bind:value={passwordRepeat}
                placeholder="Re-type Password"
            />
        </div>
        <div class="mt-5">
            <button
                class="btn btn-primary bg-blue-400 px-2 py-2 text-white rounded-lg hover:bg-blue-600 w-full"
                on:click={signup}>Sign Up</button
            >
        </div>
    </div>
</div>

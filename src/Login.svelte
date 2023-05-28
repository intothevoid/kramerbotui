<script>
    import { onMount } from "svelte";
    let username = "";
    let password = "";

    async function login() {
        // login API call
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <h1 class="py-10 mb-10 text-5xl">Kramer's deals.</h1>
    <h1 class="py-4 mb-4 text-xl text-gray-600">
        Please login or register to continue.
    </h1>
    <div class="p-4 bg-white rounded shadow">
        <div>
            <input
                class="mb-2 py-2 input input-bordered"
                type="text"
                bind:value={username}
                placeholder="Username"
            />
        </div>
        <div>
            <input
                class="mb-2 py-2 input input-bordered"
                type="password"
                bind:value={password}
                placeholder="Password"
            />
        </div>
        <div class="mt-10">
            <button
                class="btn btn-primary bg-blue-400 px-8 py-2 text-white rounded-lg hover:bg-blue-600"
                on:click={login}>Login</button
            >
            <button
                class="btn btn-primary bg-green-400 ml-2 px-5 py-2 text-white rounded-lg hover:bg-green-600"
                on:click={login}>Register</button
            >
        </div>
    </div>
</div>

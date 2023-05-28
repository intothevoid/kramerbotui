<script>
    import { userStore } from "./userStore";
    let username = "";
    let password = "";

    async function login() {
        // login API call
        // TODO login check

        if (username === "admin" && password === "password") {
            userStore.update((state) => ({
                ...state,
                isLoggedIn: true,
                username: { username },
            }));
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <h1 class="py-10 mb-10 text-5xl">Kramer's Deals.</h1>
    <h1 class="py-4 mb-4 text-md text-gray-600">
        Please login or register to continue.
    </h1>
    <div class="p-4 bg-white rounded shadow">
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
                type="password"
                bind:value={password}
                placeholder="Password"
            />
        </div>
        <div class="mt-5">
            <button
                class="btn btn-primary mb-2 bg-blue-400 px-2 py-2 text-white rounded-lg hover:bg-blue-600 w-full"
                on:click={login}>Login</button
            >
            <button
                class="btn btn-primary bg-green-400 px-2 py-2 text-white rounded-lg hover:bg-green-600 w-full"
                on:click={login}>Sign Up</button
            >
        </div>
    </div>
</div>

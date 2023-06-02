<script>
    import { toast } from "@zerodevx/svelte-toast";
    import { userStore } from "./userStore";

    let username = "";
    let password = "";
    let passwordRepeat = "";
    let chatId = "";

    async function verifyPass() {
        // check if password is same
    }

    async function signup() {
        const response = await fetch("https://192.168.1.200:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatId: chatId,
                username: username,
                password: password,
            }),
        });

        if (response.ok) {
            userStore.update((state) => ({
                ...state,
                showRegScreen: false,
                username: { username },
            }));
        } else {
            toast.push("Error. Inccorect details entered.");
        }
    }

    async function goBack() {
        userStore.update((state) => ({
            ...state,
            showRegScreen: false,
        }));
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="py-2 mb-6 text-5xl title">Kramer's Deals</h1>
    <img
        class="rounded-full mb-4"
        src="/assets/kramer-drink.gif"
        alt="Kramer Gif"
    />
    <h2 class="py-2 mb-4 text-md text-gray-600">Register your account</h2>
    <div class="p-4 bg-white rounded shadow-lg">
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
                type="password"
                bind:value={password}
                placeholder="Password"
            />
        </div>
        <div>
            <input
                class="mb-2 px-3 py-2 input input-bordered border border-slate-200 rounded-md shadow-sm"
                type="password"
                bind:value={passwordRepeat}
                placeholder="Re-type Password"
            />
        </div>
        <div class="flex row-auto justify-between">
            <div class="mt-5">
                <button
                    class="btn btn-primary bg-green-400 px-10 py-2 mr-2 text-white rounded-lg hover:bg-green-600 w-full"
                    on:click={signup}>Sign Up</button
                >
            </div>
            <div class="mt-5">
                <button
                    class="btn btn-primary bg-blue-400 px-6 py-2 text-white rounded-lg hover:bg-blue-600 w-full"
                    on:click={goBack}>Back</button
                >
            </div>
        </div>
    </div>
    <div class="footer mt-10">Made with ❤️ in Adelaide, SA</div>
</div>

<style>
    .title {
        font-family: "Bebas Neue", cursive;
        color: #333;
    }

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
    }
</style>

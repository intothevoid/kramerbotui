<script>
    import { SERVER_URL } from "../config";
    import {
        loginFalse,
        loginTrue,
        resetUser,
        signup,
        updateUser,
    } from "../userStore";
    import { toast } from "@zerodevx/svelte-toast";
    import CryptoJS from "crypto-js";

    let username = "";
    let password = "";

    async function login() {
        try {
            // get bcrypt hash of password
            const passwordHash = CryptoJS.SHA512(password).toString(
                CryptoJS.enc.Hex
            );

            // login API call
            const response = await fetch(`${SERVER_URL}/authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.toLowerCase(),
                    password: passwordHash,
                }),
            });

            const data = await response.json();
            let chatId = null;
            if (data) {
                chatId = data["result"];
            }

            if (response.ok && chatId) {
                toast.push("Welcome! You signed in successfully!");
                updateUser(username, chatId);
                loginTrue();
            } else {
                toast.push(
                    `Incorrect username or password. Error: ${data["result"]}`
                );
                resetUser();
                loginFalse();
            }
        } catch (error) {
            toast.push(`Unknown authentication error. Error: ${error}`);
            resetUser();
            loginFalse();
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="py-2 mb-6 text-5xl title">Kramer's Deals 💰</h1>
    <img
        class="rounded-full mb-4"
        src="/assets/kramer-drink.gif"
        alt="Kramer Gif"
        width="300rem"
    />
    <h2 class="py-2 mb-4 text-md text-gray-600">Please login or sign up</h2>
    <div class="p-4 bg-white rounded shadow-lg">
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
        <div class="flex row-auto justify-evenly">
            <div class="mt-5">
                <button
                    class="btn btn-primary bg-green-400 px-4 py-2 text-white rounded-lg hover:bg-green-600 w-full"
                    on:click={login}>Login</button
                >
            </div>
            <div class="mt-5">
                <button
                    class="btn btn-primary bg-blue-400 px-auto px-4 py-2 text-white rounded-lg hover:bg-blue-600 w-full"
                    on:click={signup}>Sign Up</button
                >
            </div>
        </div>
    </div>
    <div class="footer mt-10">Made with ❤️ in Adelaide, SA</div>
</div>

<style>
    .title {
        font-family: "Bebas Neue", sans-serif;
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

<script>
    import { toast } from "@zerodevx/svelte-toast";
    import {
        loginFalse,
        loginTrue,
        resetUser,
        updateUser,
        userStore,
    } from "../userStore";
    import { SERVER_URL } from "../config.js";
    import MD5 from "crypto-js/md5";

    let username = "";
    let password = "";
    let passwordRepeat = "";
    let chatId = "";

    async function validateChatId() {
        try {
            // Get data from server
            const response = await fetch(`${SERVER_URL}/users/${chatId}`);

            if (!response.ok) {
                chatId = "";
                toast.push(
                    "Chat ID is invalid. Message @kramerbot on Telegram to get one."
                );
                return false;
            }

            // If we reach here, it means the chat ID is valid
            return true;
        } catch (error) {
            chatId = "";
            toast.push(
                "Chat ID is invalid. Message @kramerbot on Telegram to get one."
            );
            return false;
        }
    }

    const validateInputs = () => {
        // check for empty vals
        if (
            username === "" ||
            password === "" ||
            chatId === "" ||
            passwordRepeat === ""
        ) {
            toast.push("Please fill in all values!");
            return false;
        }

        // check if chatId is numeric
        if (!/^\d+$/.test(chatId)) {
            toast.push("Chat ID should only contain numbers!");
            chatId = "";
            return false;
        }

        // check if username is alphanumeric
        let alphanumeric = /^[a-z0-9]+$/i;
        if (!alphanumeric.test(username)) {
            toast.push("Username should only contain alphabets and numbers!");
            username = "";
            return false;
        }

        // check if password is valid
        let passwordRegex = /[\s\x00-\x1F\x7F\/\\|><&;]|[^ -~]/;
        if (passwordRegex.test(password)) {
            toast.push("Password contains invalid characters, try again");
            password = "";
            passwordRepeat = "";
            return false;
        }

        // check password length
        if (password.length < 5) {
            toast.push("Password should be atleast 5 characters long!");
            password = "";
            passwordRepeat = "";
            return false;
        }

        // check if password is same
        if (password !== passwordRepeat) {
            toast.push("Passwords do not match!");
            password = "";
            passwordRepeat = "";

            return false;
        }

        return true;
    };

    async function signup() {
        let errRsp = null;
        try {
            if (!validateInputs()) {
                return;
            }

            if (!(await validateChatId())) {
                return;
            }

            // get md5 hash of password
            const passwordMD5 = MD5(password).toString();

            const response = await fetch(`${SERVER_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatId: chatId,
                    username: username,
                    password: passwordMD5,
                }),
            });

            const data = await response.json();
            if (data) {
                errRsp = data["result"];
            }
            if (response.ok) {
                toast.push("Welcome! You signed in successfully!");
                updateUser(username, chatId);
                loginTrue();
            } else {
                toast.push(`Signup failed. Error: ${errRsp}`);
                resetUser();
                loginFalse();
            }
        } catch (error) {
            toast.push(`Signup failed. Error: ${errRsp} ${error}`);
            resetUser();
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="py-2 mb-6 text-5xl title">Kramer's Deals 💰</h1>
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
                    on:click={loginFalse}>Back</button
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

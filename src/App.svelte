<script>
  import Dashboard from "./lib/Dashboard.svelte";
  import Login from "./lib/Login.svelte";
  import Signup from "./lib/Signup.svelte";
  import { userStore } from "./lib/userStore";
  import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<main>
  <SvelteToast />
  {#if $userStore.isLoggedIn === false && $userStore.showRegScreen === false}
    <Login />
  {/if}
  {#if $userStore.showRegScreen === true && $userStore.isLoggedIn === false}
    <Signup />
  {/if}
  {#if $userStore.isLoggedIn === true}
    <Dashboard />
  {/if}
</main>

<style>
</style>

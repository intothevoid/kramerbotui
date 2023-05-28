<script>
  import Dashboard from "./lib/Dashboard.svelte";
  import Login from "./lib/Login.svelte";
  import { userStore } from "./lib/userStore";
</script>

<main>
  {#if $userStore.isLoggedIn === false}
    <Login />
  {:else}
    <Dashboard />
  {/if}
</main>

<style>
</style>

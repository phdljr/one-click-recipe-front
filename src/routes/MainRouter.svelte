<script>
  import { Router } from 'svelte-routing';
  import { isLogin } from '../store/user';
  import CommonRouter from './common/CommonRouter.svelte';
  import GuestRouter from './guest/GuestRouter.svelte';
  import LoginRouter from './login/LoginRouter.svelte';
</script>

<div class="container">
  <Router>
    <CommonRouter />
    {#if $isLogin}
      <LoginRouter />
    {:else}
      <GuestRouter />
    {/if}
  </Router>
</div>

<style>
  .container {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

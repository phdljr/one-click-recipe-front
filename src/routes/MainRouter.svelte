<script>
  import { Router } from 'svelte-routing';
  import { isLogin } from '../store/user';
  import CommonRouter from './common/CommonRouter.svelte';
  import GuestRouter from './guest/GuestRouter.svelte';
  import LoginRouter from './login/LoginRouter.svelte';
</script>

<Router>
  <CommonRouter />
  {#if $isLogin}
    <LoginRouter />
  {:else}
    <GuestRouter />
  {/if}
</Router>

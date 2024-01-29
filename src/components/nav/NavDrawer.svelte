<script>
  import Drawer, {
    Content,
    Header,
    Scrim,
    Subtitle,
    Title,
  } from '@smui/drawer';
  import IconButton from '@smui/icon-button';
  import { Separator } from '@smui/list';
  import { ADMIN } from '../../lib/const/user-rols';
  import { auth, isLogin } from '../../store/user';
  import AdminNavDrawerItemList from './item-list/AdminNavDrawerItemList.svelte';
  import GuestNavDrawerItemList from './item-list/GuestNavDrawerItemList.svelte';
  import LoginNavDrawerItemList from './item-list/LoginNavDrawerItemList.svelte';

  let open = false;
  const close = () => {
    open = false;
  };
</script>

<Drawer variant="modal" fixed={true} bind:open>
  <Header>
    <Title>딸깍! 레시피</Title>
    {#if $isLogin}
      <Subtitle>반갑습니다, {$auth.nickname}님!</Subtitle>
    {:else}
      <Subtitle>클릭 한 번의 묘미</Subtitle>
    {/if}
  </Header>
  <Separator />
  <Content>
    {#if $isLogin}
      <LoginNavDrawerItemList on:click={close} />
      {#if $auth.role === ADMIN}
        <AdminNavDrawerItemList on:click={close} />
      {/if}
    {:else}
      <GuestNavDrawerItemList on:click={close} />
    {/if}
  </Content>
</Drawer>

<Scrim />
<div class="drawer-btn">
  <IconButton class="material-icons" on:click={() => (open = !open)}
    >menu</IconButton
  >
</div>

<style>
  .drawer-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
  }
</style>

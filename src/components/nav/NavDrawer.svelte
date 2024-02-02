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
  import { deleteCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import { REFRESH_TOKEN } from '../../lib/const/jwt';
  import { ADMIN } from '../../lib/const/user-rols';
  import { auth, isLogin } from '../../store/user';
  import AdminNavDrawerItemList from './item-list/AdminNavDrawerItemList.svelte';
  import GuestNavDrawerItemList from './item-list/GuestNavDrawerItemList.svelte';
  import LoginNavDrawerItemList from './item-list/LoginNavDrawerItemList.svelte';

  let open = false;
  const close = () => {
    open = false;
  };

  const handleLogout = () => {
    deleteCookie(REFRESH_TOKEN);
    auth.clearAccessToken();
    alert('로그아웃 되었습니다.');
    navigate('/');
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
  <IconButton class="material-icons" on:click={() => navigate('/')}
    >home</IconButton
  >
</div>

<div class="top-bar">
  {#if $isLogin}
    <IconButton class="material-icons" on:click={() => navigate('/mypage')}
      >person</IconButton
    >
    <IconButton class="material-icons" on:click={handleLogout}
      >logout</IconButton
    >
  {:else}
    <IconButton class="material-icons" on:click={() => navigate('/login')}
      >login</IconButton
    >
    <IconButton class="material-icons" on:click={() => navigate('/signup')}
      >person_add</IconButton
    >
  {/if}
</div>

<style>
  .drawer-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    color: black;
  }
  .home-btn {
    position: absolute;
    top: 10px;
    left: 60px;
    color: black;
  }

  .top-bar {
    position: absolute;
    top: 10px;
    right: 10px;
    color: black;
  }
</style>

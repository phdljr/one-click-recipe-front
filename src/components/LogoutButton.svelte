<script>
  import Button from '@smui/button';
  import { deleteCookie } from 'svelte-cookie';
  import { isLoggedIn, userRole } from '../stores';

  isLoggedIn.set(true);
  userRole.set('user');

  const handleLogout = () => {
    isLoggedIn.set(false);
    userRole.set('guest');
    deleteCookie('Authorization');
    alert('로그아웃 되었습니다.');
  };
</script>

<Button color="primary" variant="raised" on:click={handleLogout}
  >로그아웃</Button
>

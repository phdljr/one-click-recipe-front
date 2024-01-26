<script>
  import Button from '@smui/button';
  import { deleteCookie } from 'svelte-cookie';
  import { REFRESH_TOKEN } from '../lib/const/jwt';
  import { auth } from '../store/user';

  const handleLogout = () => {
    deleteCookie(REFRESH_TOKEN);
    auth.clearAccessToken();
  };
</script>

<Button color="primary" variant="raised" on:click={handleLogout}
  >로그아웃</Button
>

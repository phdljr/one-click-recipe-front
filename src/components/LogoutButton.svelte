<script>
  import Button from '@smui/button';
  import { deleteCookie } from 'svelte-cookie';

  const handleLogout = () => {
    deleteCookie('Authorization');
  };
</script>

<Button color="primary" variant="raised" on:click={handleLogout}
  >로그아웃</Button
>

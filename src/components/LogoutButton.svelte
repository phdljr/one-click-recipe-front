<script>
  import { deleteCookie } from 'svelte-cookie';
  import { REFRESH_TOKEN } from '../lib/const/jwt';
  import { auth } from '../store/user';

  const handleLogout = () => {
    deleteCookie(REFRESH_TOKEN);
    auth.clearAccessToken();
  };
</script>

<button on:click={handleLogout}>로그아웃</button>

<style>
  button {
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
    font-size: large;
  }

  button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

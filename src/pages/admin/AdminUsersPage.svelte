<script>
  import { onMount } from 'svelte';
  import { userStore } from '../../stores/userStore';

  onMount(() => {
    userStore.fetchUsers();
  });
</script>

<main>
  <h1>유저 목록</h1>
  <ul>
    {#each $userStore as user}
      <li>{user.email} - {user.role}</li>
    {/each}
  </ul>
</main>

<style>
</style>

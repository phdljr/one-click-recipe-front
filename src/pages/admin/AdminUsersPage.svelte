<script>
  import { onMount } from 'svelte';
  import { userStore } from '../../stores/userStore';

  let selectedRole = {};

  onMount(() => {
    userStore.fetchUsers();
  });

  function changeUserRole(userId) {
    const newRole = selectedRole[userId];
    console.log(`유저 ${userId}의 역할을 ${newRole}로 변경합니다.`);
    userStore.updateUserRole(userId, newRole);
  }

  const roleOptions = ['ADMIN', 'USER'];

</script>

<main>
  <h1>유저 목록</h1>
  {#if $userStore.length === 0}
    <p>로딩 중이거나 유저가 없습니다.</p>
  {:else}
    <ul class="user-list">
      {#each $userStore as user (user.id)}
        <li class="user-item">
          <div class="user-email">{user.email}</div>
          <div class="user-role">
            <select bind:value={selectedRole[user.id]} on:change={() => {}}>
              {#each roleOptions as role}
                <option value={role} selected={role === user.role}
                  >{role}</option
                >
              {/each}
            </select>
          </div>
          <div class="user-action">
            <button on:click={() => changeUserRole(user.id)}>변경</button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .user-list {
    width: 1000px;
    list-style: none;
    padding: 0;
  }

  .user-item {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-email,
  .user-role,
  .user-action {
    flex-basis: 33%;
    text-align: left;
  }

  .user-email {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-role {
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.85em;
  }

  .user-role select {
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .user-action button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

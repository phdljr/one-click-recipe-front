<script>
  import Button from '@smui/button';
  import { Link } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { userStore } from '../../stores/userStore';

  let selectedRole = {};

  onMount(async () => {
    await userStore.fetchUsers();
    $userStore.forEach(user => {
      selectedRole[user.id] = user.role;
    });
  });

  async function changeUserRole(userId) {
    const newRole = selectedRole[userId];
    await userStore.changeUserRole(userId, newRole);
    await userStore.fetchUsers();
  }

  const roleOptions = ['ADMIN', 'USER'];
</script>

<main>
  <h1>유저 목록</h1>
  {#if $userStore.length === 0}
    <p>로딩 중이거나 유저가 없습니다.</p>
  {:else}
    <div class="user-table">
      {#each $userStore as user (user.id)}
        <div class="user-row">
          <div class="user-info">
            <span>{user.id}</span>
            <span>{user.email}</span>
            <span>{user.nickname}</span>
          </div>
          <div class="user-role">
            <select bind:value={selectedRole[user.id]}>
              {#each roleOptions as role}
                <option value={role} selected={role === selectedRole[user.id]}>{role}</option>
              {/each}
            </select>
          </div>
          <div class="user-actions">
            <Button variant="raised" on:click={() => changeUserRole(user.id)}
              >역할 변경</Button
            >
            <Link to={`/admin/orders/${user.id}`}>주문 목록</Link>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .user-table {
    display: flex;
    flex-direction: column;
  }

  .user-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }

  .user-info {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }

  .user-info span {
    flex-basis: 30%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .user-role {
    flex-basis: 8%;
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.85em;
  }

  .user-role select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  .user-actions {
    flex-basis: 20;
    display: flex;
    gap: 10px;
  }

  .user-role select {
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  @media (max-width: 600px) {
    .user-row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

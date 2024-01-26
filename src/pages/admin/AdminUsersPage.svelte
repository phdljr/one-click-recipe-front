<script>
  import { onMount } from 'svelte';
  import { userStore } from '../../stores/userStore';

  let selectedRole = {};
  let userOrders = [];
  let isOrderModalOpen = false;
  let selectedUserId;

  onMount(() => {
    userStore.fetchUsers();
  });

  function changeUserRole(userId) {
    const newRole = selectedRole[userId];
    userStore.updateUserRole(userId, newRole);
  }

  async function showUserOrders(userId) {
    userOrders = await userStore.getUserOrders(userId);
    selectedUserId = userId;
    isOrderModalOpen = true;
  }

  function showOrderDetails(orderId) {
    console.log(`주문 ${orderId}의 상세 정보를 보여줍니다.`);
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
          <div class="user-id">{user.id}</div>
          <div class="user-email">{user.email}</div>
          <div class="user-nickname">{user.nickname}</div>
          <div class="user-role">
            <select bind:value={selectedRole[user.id]}>
              {#each roleOptions as role}
                <option value={role} selected={role === user.role}
                  >{role}</option
                >
              {/each}
            </select>
          </div>
          <div class="user-action">
            <button on:click={() => changeUserRole(user.id)}>역할 변경</button>
            <button on:click={() => showUserOrders(user.id)}>주문 목록</button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}

  {#if isOrderModalOpen}
    <div class="order-modal">
      <h2>유저 {selectedUserId}의 주문 목록</h2>
      {#each userOrders as order}
        <div class="order-item">
          <p>주문 ID: {order.id}</p>
          <p>상태: {order.status}</p>
          <p>수령인: {order.receiverName}</p>
          <p>배송 주소: {order.address}</p>
          <p>총 가격: {order.totalPrice}</p>
          <button on:click={() => showOrderDetails(order.id)}>주문 상세</button>
        </div>
      {/each}
      <button on:click={() => (isOrderModalOpen = false)}>닫기</button>
    </div>
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

  .order-item {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }

  .order-item button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .user-id,
  .user-email,
  .user-nickname,
  .user-role,
  .user-action {
    flex-basis: 20%;
    text-align: left;
  }

  .user-id,
  .user-nickname {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .order-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { userStore } from '../../stores/userStore';

  export let userId;
  let orders = [];
  let selectedOrderDetails = null;

  onMount(async () => {
    orders = await userStore.getUserOrders(userId);
  });

  async function showOrderDetails(orderId) {
    selectedOrderDetails = await userStore.getUserOrder(userId, orderId);
  }

  function closeModal() {
    selectedOrderDetails = null;
  }
</script>

<main>
  <h1>유저 {userId}의 주문 목록</h1>
  {#each orders as order}
    <div class="order-item">
      <p>주문 ID: {order.id}</p>
      <p>상태: {order.status || '상태 정보 없음'}</p>
      <p>수령인: {order.receiverName}</p>
      <p>배송 주소: {order.address}</p>
      <p>총 가격: {order.totalPrice}</p>
      <button on:click={() => showOrderDetails(order.id)}>주문 상세</button>
    </div>
  {/each}

  {#if selectedOrderDetails}
    <div class="modal-overlay" on:click={closeModal}>
      <div class="order-details-modal" on:click|stopPropagation>
        <h2>주문 상세 정보</h2>
        <p>주문 ID: {selectedOrderDetails.id}</p>
        <p>상태: {selectedOrderDetails.orderStatus}</p>
        <p>수령인: {selectedOrderDetails.receiverName}</p>
        <p>
          배송 주소: {selectedOrderDetails.address}, {selectedOrderDetails.addressDetail}
        </p>
        <p>총 가격: {selectedOrderDetails.totalPrice}</p>
        <h3>주문 항목</h3>
        {#each selectedOrderDetails.orderDetails as detail}
          <div class="order-detail-item">
            <p>항목: {detail.name}</p>
            <p>수량: {detail.amount}</p>
            <p>단위: {detail.unit}</p>
            <p>가격: {detail.price}</p>
          </div>
        {/each}
        <button on:click={closeModal}>닫기</button>
      </div>
    </div>
  {/if}
</main>

<style>
  .order-item {
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .order-details-modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    z-index: 11;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }
</style>

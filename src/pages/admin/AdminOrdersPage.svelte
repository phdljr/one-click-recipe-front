<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { userStore } from '../../store/admin';

  export let userId;
  let orders = [];
  let displayedOrderDetails = null;

  onMount(async () => {
    orders = await userStore.fetchUserOrders(userId);
  });

  async function showOrderDetails(orderId) {
    displayedOrderDetails = await userStore.fetchUserOrderDetails(
      userId,
      orderId,
    );
  }

  function closeModal() {
    displayedOrderDetails = null;
  }
</script>

<main>
  <h1>유저 {userId}의 주문 목록</h1>
  {#if orders.length === 0}
    <p>주문 내역이 없습니다.</p>
  {:else}
    <table class="orders-table">
      <thead>
        <tr>
          <th>주문 ID</th>
          <th>상태</th>
          <th>수령인</th>
          <th>수령인 전화번호</th>
          <th>배송 주소</th>
          <th>상세 주소</th>
          <th>총 가격</th>
          <th>상세 보기</th>
        </tr>
      </thead>
      <tbody>
        {#each orders as order}
          <tr>
            <td>{order.id}</td>
            <td>{order.orderStatus}</td>
            <td>{order.receiverName}</td>
            <td>{order.receiverPhoneNumber}</td>
            <td>{order.address}</td>
            <td>{order.addressDetail}</td>
            <td>{order.totalPrice}</td>
            <td>
              <Button
                variant="raised"
                on:click={() => showOrderDetails(order.id)}>상세</Button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  {#if displayedOrderDetails}
    <div class="modal-overlay" on:click={closeModal}>
      <div class="order-details-modal" on:click|stopPropagation>
        <h2>주문 상세 정보</h2>
        <p>주문 ID: {displayedOrderDetails.id}</p>
        <p>상태: {displayedOrderDetails.orderStatus}</p>
        <p>수령인: {displayedOrderDetails.receiverName}</p>
        <p>
          배송 주소: {displayedOrderDetails.address}, {displayedOrderDetails.addressDetail}
        </p>
        <p>총 가격: {displayedOrderDetails.totalPrice}</p>
        <h3>주문 항목</h3>
        {#each displayedOrderDetails.orderDetails as detail}
          <div class="order-detail-item">
            <p>항목: {detail.name}</p>
            <p>수량: {detail.amount}</p>
            <p>단위: {detail.unit}</p>
            <p>가격: {detail.price}</p>
          </div>
        {/each}
        <Button variant="raised" on:click={closeModal}>닫기</Button>
      </div>
    </div>
  {/if}
</main>

<style>
  .orders-table {
    width: 100%;
    border-collapse: collapse;
  }

  .orders-table th,
  .orders-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .orders-table th {
    background-color: #f4f4f4;
  }

  .orders-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .orders-table tr:hover {
    background-color: #ddd;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .order-detail-item {
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 4px;
  }
</style>

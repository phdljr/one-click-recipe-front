<script>
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import HOST from '../../lib/host';

  export let orderId;

  let order = {
    orderDetails: [],
  };

  onMount(() => {
    fetch(HOST + `/api/v1/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: getCookie('Authorization'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        order = data;
      });
  });
</script>

<div class="order-detail">
  <h2>주문 상세</h2>
  <div class="order-info">
    <p>주문 번호: {order.id}</p>
    <p>받는 분: {order.receiverName}</p>
    <p>연락처: {order.receiverPhoneNumber}</p>
    <p>주소: {order.address}, {order.addressDetail}</p>
    <p>총 금액: {order.totalPrice}원</p>
    <p>주문 상태: {order.orderStatus}</p>
  </div>
  <div class="order-items">
    <h3>주문된 상품</h3>
    <ul>
      {#each order.orderDetails as orderDetail (orderDetail.id)}
        <li>
          {orderDetail.name} - 수량: {orderDetail.amount} - 가격: {orderDetail.price}원
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .order-detail {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }

  .order-info,
  .order-items {
    list-style-type: none;
    padding: 0;
  }

  .order-items li {
    margin-bottom: 10px;
  }
</style>

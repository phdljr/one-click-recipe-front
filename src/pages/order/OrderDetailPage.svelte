<script>
  import { onMount } from 'svelte';
  import { isLogin, auth } from '../../store/user';
  import HOST from '../../lib/host';

  export let orderId;

  let order = {
    orderDetails: [],
  };

  onMount(() => {
    fetch(HOST + `/api/v1/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `${$auth}`,
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
    color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 40px auto;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0.9;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  }

  .order-detail h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .order-info p,
  .order-items ul {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .order-items {
    margin-top: 20px;
  }

  .order-items h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .order-items ul {
    list-style-type: none;
    padding: 0;
  }

  .order-items li {
    margin-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 5px;
  }
</style>

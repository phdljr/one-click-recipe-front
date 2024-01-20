<script>
  let order = {
    id: 1,
    receiverName: '배규태',
    receiverPhoneNumber: '010-5555-5555',
    address: '서울특별시 강북구',
    addressDetail: '번동 789-12',
    totalPrice: 12000,
    orderStatus: 'WAITING',
    orderDetails: [
      {
        id: 1,
        name: '김치',
        amount: 2,
        price: 1500,
      },
      {
        id: 2,
        name: '두부',
        amount: 3,
        price: 2000,
      },
      {
        id: 3,
        name: '참치',
        amount: 1,
        price: 3000,
      },
    ],
  };
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
      {#each order.orderDetails as detail}
        <li>
          {detail.name} - 수량: {detail.amount} - 가격: {detail.price}원
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

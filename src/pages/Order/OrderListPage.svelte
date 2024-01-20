<script>
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import { Link } from 'svelte-routing';
  import HOST from '../../lib/host';

  let orders = [
    // {
    //   id: 1,
    //   receiverName: '홍길동',
    //   receiverPhoneNumber: '010-1234-5678',
    //   address: '서울특별시 강남구',
    //   addressDetail: '역삼동 123-45',
    //   totalPrice: 15000,
    //   orderStatus: 'WAITING',
    // },
    // {
    //   id: 2,
    //   receiverName: '김서방',
    //   receiverPhoneNumber: '010-9876-5432',
    //   address: '부산광역시 해운대구',
    //   addressDetail: '우동 987-65',
    //   totalPrice: 22000,
    //   orderStatus: 'WAITING',
    // },
  ];

  onMount(() => {
    fetch(HOST + '/api/v1/orders', {
      method: 'GET',
      headers: {
        Authorization: getCookie('Authorization'),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        orders = data;
      });
  });
</script>

<div class="content-wrapper">
  <div class="order-list">
    <h2>주문 목록</h2>
    {#each orders as order}
      <div class="order-item">
        <div class="order-id">주문 번호: {order.id}</div>
        <div class="receiver-name">받는 분: {order.receiverName}</div>
        <div class="receiver-phone">연락처: {order.receiverPhoneNumber}</div>
        <div class="address">주소: {order.address}, {order.addressDetail}</div>
        <div class="total-price">총 금액: {order.totalPrice}원</div>
        <div class="order-status">주문 상태: {order.orderStatus}</div>
        <Link to="/order-detail/{order.id}"><button>주문 상세</button></Link>
      </div>
    {/each}
  </div>
</div>

<style>
  .content-wrapper {
    width: 1000px;
    margin: auto; /* 좌우 중앙 정렬 */
    padding: 20px; /* 안쪽 여백 설정 */
    box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
  }

  .order-list {
    max-width: 800px;
    margin: auto;
  }

  .order-item {
    border-bottom: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 10px;
  }
</style>

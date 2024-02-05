<script>
  import { onMount } from 'svelte';
  import { setCookie } from 'svelte-cookie';
  import InfiniteScroll from 'svelte-infinite-scroll';
  import { Link } from 'svelte-routing';
  import { WAITING } from '../../lib/const/order-status';
  import { ORDER_SIZE } from '../../lib/const/pagination-const';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  let orders = [];
  let page = 0;
  let isLastPage = false;

  onMount(() => {
    getOrders();
  });

  const getOrders = () => {
    fetch(HOST + `/api/v1/orders?page=${page}`, {
      method: 'GET',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length < ORDER_SIZE) {
          isLastPage = true;
        }
        orders = [...orders, ...data];
      });
  };

  const readyPay = (orderId) => {
    fetch(HOST + `/api/v1/orders/${orderId}/payments/kakaopay/ready`, {
      method: 'POST',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        setCookie('tid', data.tid, 1, false);
        location.href = data.next_redirect_pc_url;
      })
      .catch((err) => {
        alert('결제 요청 실패');
      });
  };

  const handleDeleteOrder = (orderId) => {
    if (!confirm('해당 주문을 취소하시겠습니까?')) {
      return;
    }

    fetch(HOST + `/api/v1/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw res;
        }

        alert('주문을 정상적으로 취소하였습니다.');
        location.reload();
      })
      .catch(async (error) => {
        let data = await error.json();
        alert(data.message);
      });
  };
</script>

<div class="content-wrapper">
  <div class="order-list">
    <h2>주문 목록</h2>
    {#if orders.length !== 0}
      {#each orders as order}
        <div class="order-item">
          <div class="order-id">주문 번호: {order.id}</div>
          <div class="receiver-name">받는 분: {order.receiverName}</div>
          <div class="receiver-phone">연락처: {order.receiverPhoneNumber}</div>
          <div class="address">
            주소: {order.address}, {order.addressDetail}
          </div>
          <div class="total-price">
            <!-- 총 금액: {order.totalPrice.toLocaleString('ko-KR')}원 -->
          </div>
          <div class="order-status">주문 상태: {order.orderStatus}</div>
          <div>
            <Link to="/order-detail/{order.id}"><button>주문 상세</button></Link
            >
            {#if order.orderStatus === WAITING}
              <button on:click={() => readyPay(order.id)}>재결제</button>
              <button on:click={() => handleDeleteOrder(order.id)}
                >주문 취소</button
              >
            {/if}
          </div>
        </div>
      {/each}
      <InfiniteScroll
        window={true}
        hasMore={!isLastPage}
        on:loadMore={() => {
          page++;
          getOrders();
        }}
      />
    {:else}
      <h1>주문 내역이 없습니다.</h1>
    {/if}
  </div>
</div>

<style>
  .content-wrapper {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 1200px;
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0.9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
    margin: 30px auto;
  }

  .order-list {
    width: 1000px;
    margin: 20px auto;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .order-item {
    border-bottom: 1px solid #eaeaea;
    padding: 20px;
    margin-bottom: 15px;
    transition: all 0.3s ease-in-out;
  }

  .order-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }

  .order-item button {
    font-size: large;
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .order-item button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

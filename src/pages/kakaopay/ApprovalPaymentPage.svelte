<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { deleteCookie, getCookie } from 'svelte-cookie';
  import { Link } from 'svelte-routing';
  import HOST from '../../lib/host';
  import getParam from '../../lib/query-string';
  import { auth } from '../../store/user';

  export let orderId;

  let isSuccess = null;
  let totalPrice = null;
  let responseDto = null;

  onMount(() => {
    fetch(HOST + `/api/v1/orders/${orderId}/payments/kakaopay/approve`, {
      method: 'POST',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tid: getCookie('tid'),
        pg_token: getParam('pg_token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        responseDto = data;
        deleteCookie('tid');
        totalPrice = data.amount.total;
        isSuccess = true;
      })
      .catch((error) => {
        console.log(error);
        isSuccess = false;
      });
  });
</script>

<div class="container">
  {#if isSuccess === null}
    <h1>결제 승인 요청중...</h1>
  {:else if isSuccess === true}
    <h1>결제 완료</h1>
    <h3>결제 금액: {totalPrice}원</h3>
    <Link to="/"><Button variant="raised">메인 화면으로 돌아가기</Button></Link>
  {:else}
    <h1>결제 실패</h1>
    <h3>{responseDto.message}</h3>
    <Link to="/"><Button variant="raised">메인 화면으로 돌아가기</Button></Link>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    font-family: 'East Sea Dokdo', sans-serif !important;
  }

  h1 {
    font-size: 150px;
    color: #dce2f0;
    margin: 0;
  }

  h3 {
    font-size: 80px;
    color: #dce2f0;
    margin: 0;
  }
</style>

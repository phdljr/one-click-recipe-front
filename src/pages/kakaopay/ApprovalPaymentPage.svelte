<script>
  import { onMount } from 'svelte';
  import { deleteCookie, getCookie } from 'svelte-cookie';
  import HOST from '../../lib/host';
  import getParam from '../../lib/query-string';

  export let orderId;
  let isSuccess = null;
  let totalPrice = null;

  onMount(() => {
    fetch(HOST + `/api/v1/orders/${orderId}/payments/kakaopay/approve`, {
      method: 'POST',
      headers: {
        Authorization: getCookie('Authorization'),
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

{#if isSuccess === null}
  <h1>결제 승인 요청중...</h1>
{:else if isSuccess === true}
  <h1>결제 완료</h1>
  <h5>결제 금액: {totalPrice}원</h5>
{:else}
  <h1>결제 실패</h1>
{/if}

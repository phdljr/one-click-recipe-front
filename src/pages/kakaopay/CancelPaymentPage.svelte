<script>
  import Button from '@smui/button/src/Button.svelte';
  import { onMount } from 'svelte';
  import { Link } from 'svelte-routing';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  export let orderId;

  onMount(() => handleDeleteOrder(orderId));

  const handleDeleteOrder = (orderId) => {
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
      })
      .catch(async (error) => {
        let data = await error.json();
        alert(data.message);
      });
  };
</script>

<h1>결제 취소</h1>
<Link to="/mypage/order-list"
  ><Button variant="raised">주문 목록 화면으로 돌아가기</Button></Link
>

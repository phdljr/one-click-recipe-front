<script>
  import Button from '@smui/button/src/Button.svelte';
  import { setCookie } from 'svelte-cookie';
  import HOST from '../../lib/host';
  import {
    extractErrors,
    orderValidate,
  } from '../../lib/validates/order-validate';
  import { auth } from '../../store/user';

  export let requestDto;

  let orderId = null;

  const handlePayReady = async () => {
    try {
      await orderValidate.validate(requestDto, {
        abortEarly: false,
      });
    } catch (error) {
      let errors = extractErrors(error);
      let message = Object.values(errors).join('\n');
      alert(message);
      return;
    }

    // 주문 생성
    fetch(HOST + `/api/v1/orders`, {
      method: 'POST',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestDto),
    })
      .then((response) => response.json())
      .then((data) => {
        orderId = data.id;
        readyPay();
      });
  };

  const readyPay = () => {
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
</script>

<Button variant="raised" on:click={handlePayReady}>결제하기</Button>

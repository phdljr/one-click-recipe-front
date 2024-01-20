<script>
  import { getCookie, setCookie } from 'svelte-cookie';
  import HOST from '../lib/host';

  const getTest = () => {
    fetch(HOST + '/api/v1/orders/1/payments/kakaopay/ready', {
      method: 'POST',
      headers: {
        Authorization: getCookie('Authorization'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCookie('tid', data.tid, 1, false);
        location.href = data.next_redirect_pc_url;
      });
  };
</script>

<button on:click={getTest}> 결제하기 </button>

<script>
  import { onMount } from 'svelte';
  import { setCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import HOST from '../../lib/host';
  import getParam from '../../lib/query-string';

  onMount(() => {
    let code = getParam('code');
    fetch(HOST + `/api/v1/users/kakao/login/callback?code=${code}`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        console.log(response.headers.get('Authorization'));
        setCookie(
          'Authorization',
          response.headers.get('Authorization'),
          1,
          true,
        );
        navigate('/');
      })
      .catch((error) => {
        alert('카카오 로그인 실패');
        navigate('/');
      });
  });
</script>

<h1>로그인 시도중...</h1>

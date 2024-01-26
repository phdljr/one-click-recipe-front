<script>
  import { onMount } from 'svelte';
  import { setCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import {
    ACCESS_TOKEN,
    EXPIRATION_DAYS,
    REFRESH_TOKEN,
  } from '../../lib/const/jwt';
  import HOST from '../../lib/host';
  import getParam from '../../lib/query-string';
  import { auth } from '../../store/user';

  onMount(() => {
    let code = getParam('code');
    fetch(HOST + `/api/v1/users/kakao/login/callback?code=${code}`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      credentials: 'same-origin', // 쿠키를 받기 위해
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        console.log('Access-Token: ' + response.headers.get(ACCESS_TOKEN));
        console.log('Refresh-Token: ' + response.headers.get(REFRESH_TOKEN));
        let accessToken = response.headers.get(ACCESS_TOKEN);
        let refreshToken = response.headers.get(REFRESH_TOKEN);

        auth.setAccessToken(accessToken);
        setCookie(REFRESH_TOKEN, refreshToken, EXPIRATION_DAYS, false);
        navigate('/');
      })
      .catch((error) => {
        alert('카카오 로그인 실패');
        navigate('/');
      });
  });
</script>

<h1>로그인 시도중...</h1>

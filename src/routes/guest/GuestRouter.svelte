<!-- 비로그인 회원을 위한 라우터 -->

<script>
  import { Route } from 'svelte-routing';
  import KakaoLoginPage from '../../pages/user/KakaoLoginPage.svelte';
  import LoginPage from '../../pages/user/LoginPage.svelte';
  import SignUpPage from '../../pages/user/SignUpPage.svelte';
</script>

<Route path="/login" component={LoginPage} />
<Route path="/login/kakao" component={KakaoLoginPage} />
<Route path="/signup" component={SignUpPage} />

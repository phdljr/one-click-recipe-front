<script>
  import { Label } from '@smui/button';
  import Button from '@smui/button/src/Button.svelte';
  import Dialog, { Actions, Content, Title } from '@smui/dialog/src';
  import Textfield from '@smui/textfield';
  import { setCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import { client_id, redirect_uri } from './../../lib/kakao/kakao-login.js';

  let open = false;

  let requestDto = {
    email: '',
    password: '',
  };

  const handleLogin = () => {
    fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: requestDto.email,
        password: requestDto.password,
      }),
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
        open = true;
      });
  };

  const handleKakaoLogin = () => {
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
  };
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <Title id="simple-title">로그인 실패</Title>
  <Content id="simple-content">로그인에 실패하였습니다.</Content>
  <Actions>
    <Button>
      <Label>확인</Label>
    </Button>
  </Actions>
</Dialog>

<div class="container">
  <div class="wrapper">
    <Textfield
      variant="outlined"
      type="email"
      bind:value={requestDto.email}
      label="이메일"
    ></Textfield>
    <Textfield
      variant="outlined"
      type="password"
      bind:value={requestDto.password}
      label="비밀번호"
    ></Textfield>
    <Button variant="raised" on:click={handleLogin}>로그인</Button>
  </div>
  <hr class="hr-100" />
  <div class="reg-wrapper">
    <Button class="kakao-btn" on:click={handleKakaoLogin}>카카오 로그인</Button>
  </div>
</div>

<style>
  .hr-100 {
    width: 100%;
  }
  .reg-wrapper {
    display: flex;
    flex-direction: column;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 200px;
    justify-content: space-around;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 2px 5px 10px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  * :global(.kakao-btn) {
    color: black;
    background-color: #fee500;
  }
</style>

<script>
  import { Label } from '@smui/button';
  import Button from '@smui/button/src/Button.svelte';
  import Dialog, { Actions, Content, Title } from '@smui/dialog/src';
  import Textfield from '@smui/textfield';
  import { setCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import {
    ACCESS_TOKEN,
    EXPIRATION_DAYS,
    REFRESH_TOKEN,
  } from '../../lib/const/jwt.js';
  import HOST from '../../lib/host.js';
  import { auth } from '../../store/user.js';
  import { client_id, redirect_uri } from './../../lib/kakao/kakao-login.js';

  let open = false;

  let requestDto = {
    email: '',
    password: '',
  };

  const handleLogin = () => {
    fetch(HOST + '/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        email: requestDto.email,
        password: requestDto.password,
      }),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        let accessToken = response.headers.get(ACCESS_TOKEN);
        let refreshToken = response.headers.get(REFRESH_TOKEN);

        auth.setAccessToken(accessToken);
        setCookie(REFRESH_TOKEN, refreshToken, EXPIRATION_DAYS, false);
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
    <input
      class="custom-input"
      type="email"
      bind:value={requestDto.email}
      placeholder="이메일"
    />
    <input
      class="custom-input"
      type="password"
      bind:value={requestDto.password}
      placeholder="비밀번호"
    />
    <button class="login-btn" on:click={handleLogin}>로그인</button>
  </div>
  <hr class="hr-100" />
  <div class="reg-wrapper">
    <button class="kakao-btn" on:click={handleKakaoLogin}>카카오 로그인</button>
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
    width: 500px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    justify-content: space-around;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    margin: 30px auto;
  }

  .login-btn {
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

  .login-btn:hover {
    background-color: #3c3c3c;
    color: #fff;
  }

  .wrapper,
  .reg-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .hr-100 {
    border-top: 1px solid #f1c40f;
    margin: 20px 0;
    opacity: 0.75;
  }

  .custom-input {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
  }

  * :global(.kakao-btn) {
    font-size: large;
    color: black;
    background-color: #fee500;
    font-weight: bold;
    padding: 15px 20px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  * :global(.kakao-btn:hover) {
    background-color: #f7e600;
  }
</style>

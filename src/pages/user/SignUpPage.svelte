<script>
  import Button, { Label } from '@smui/button';
  import Dialog, { Actions, Content, Title } from '@smui/dialog';
  import { navigate } from 'svelte-routing';
  import HOST from '../../lib/host';
  import {
    extractErrors,
    signUpValidate,
  } from '../../lib/validates/signup-validate';

  let open = false;

  let requestDto = {
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  };

  const handleSignUp = async () => {
    try {
      await signUpValidate.validate(requestDto, {
        abortEarly: false,
      });
    } catch (error) {
      let errors = extractErrors(error);
      let message = Object.values(errors).join('\n');
      alert(message);
      return;
    }

    fetch(HOST + '/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...requestDto }),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('회원가입이 정상적으로 이뤄졌습니다.');
        navigate('/login');
      })
      .catch((error) => {
        open = true;
      });
  };
</script>

<h1>회원 가입</h1>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <Title id="simple-title">회원가입 실패</Title>
  <Content id="simple-content">회원가입에 실패하였습니다.</Content>
  <Actions>
    <Button>
      <Label>확인</Label>
    </Button>
  </Actions>
</Dialog>

<div class="container">
  <input
    class="custom-input"
    type="email"
    bind:value={requestDto.email}
    placeholder="이메일"
  />
  <input
    class="custom-input"
    type="text"
    bind:value={requestDto.nickname}
    placeholder="닉네임"
  />
  <input
    class="custom-input"
    type="password"
    bind:value={requestDto.password}
    placeholder="비밀번호"
  />
  <input
    class="custom-input"
    type="password"
    bind:value={requestDto.confirmPassword}
    placeholder="비밀번호 확인"
  />
  <button class="login-btn" on:click={handleSignUp}>회원가입</button>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');

  h1 {
    display: flex;
    color: #dce2f0;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 150px;
    font-family: 'East Sea Dokdo', sans-serif !important;
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

  .custom-input {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
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
</style>

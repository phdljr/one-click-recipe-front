<script>
  import Button, { Label } from '@smui/button';
  import Dialog, { Actions, Content, Title } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import { navigate } from 'svelte-routing';

  let open = false;

  let requestDto = {
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  };

  const handleSignUp = () => {
    fetch('http://localhost:8080/api/v1/users/signup', {
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
  <Textfield
    variant="outlined"
    type="email"
    bind:value={requestDto.email}
    label="이메일"
  ></Textfield>
  <Textfield
    variant="outlined"
    type="text"
    bind:value={requestDto.nickname}
    label="닉네임"
  ></Textfield>
  <Textfield
    variant="outlined"
    type="password"
    bind:value={requestDto.password}
    label="비밀번호"
  ></Textfield>
  <Textfield
    variant="outlined"
    type="password"
    bind:value={requestDto.confirmPassword}
    label="비밀번호 확인"
  ></Textfield>

  <Button variant="raised" on:click={handleSignUp}>회원가입</Button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    justify-content: space-around;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 2px 5px 10px;
  }
</style>

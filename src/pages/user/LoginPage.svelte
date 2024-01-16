<script>
  import { setCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  let email = null;
  let password = null;

  function clickHandler() {
    fetch('http://localhost:8080/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      console.log(res.headers.get('Authorization'));
      setCookie('Authorization', res.headers.get('Authorization'), 1, true);
      navigate('/');
    });
  }
</script>

<div class="margins">
  <input type="email" placeholder="이메일" bind:value={email} />
  <input type="password" placeholder="비밀번호" bind:value={password} />

  <button on:click={clickHandler}>로그인</button>
</div>

<script>
  import { onMount } from 'svelte';
  import Button from '@smui/button';
  import { Link } from 'svelte-routing';
  import LogoutButton from '../components/LogoutButton.svelte';

  let displayText = '';
  const fullText = 'One_Click_Recipe!';
  let i = 0;

  onMount(() => {
    const interval = setInterval(() => {
      if (i < fullText.length) {
        displayText += fullText[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200);
  });
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
  rel="stylesheet"
/>

<body>
  <div class="main-container">
    <div class="title-container">
      <h1 id="typing">{displayText}</h1>
    </div>
    <div>
      <Link to="/recipes"
        ><Button variant="raised">레시피 보러 가기</Button></Link
      >
      <Link to="/login"><Button variant="raised">로그인</Button></Link>
      <Link to="/signup"><Button variant="raised">회원가입</Button></Link>
      <Link to="/mypage"><Button variant="raised">마이페이지</Button></Link>
      <Link to="/admin"><Button variant="raised">관리자페이지</Button></Link>
      <LogoutButton />
    </div>
  </div>
</body>

<style>
  :global(body) {
    background-color: #000;
    min-height: 100vh;
    margin: 0;
    color: white;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .title-container {
    margin-bottom: 20px;
  }

  h1 {
    font-family: 'Dancing Script', cursive;
    color: white;
    font-size: 3em;
  }

  #typing {
    border-right: 2px solid white;
    white-space: nowrap;
    overflow: hidden;
    animation:
      typing 4s steps(14, end),
      blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: white;
    }
  }
</style>

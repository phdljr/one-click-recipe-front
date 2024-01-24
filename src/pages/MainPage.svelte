<script>
  import Button from '@smui/button';
  import { Link } from 'svelte-routing';
  import LogoutButton from '../components/LogoutButton.svelte';
  import { isLoggedIn, userRole } from '../stores';

  isLoggedIn.set(true);
  userRole.set('user');
</script>

<body>
  <div class="main-container">
    <div class="top-side">
      <h1>🖱️딸깍! 레시피🍽️</h1>
    </div>
    <div class="bottom-side">
      {#if $isLoggedIn}
        <Link to="/recipes"
          ><Button variant="raised">레시피 보러 가기</Button></Link
        >
        {#if $userRole === 'admin'}
          <Link to="/admin"><Button variant="raised">관리자페이지</Button></Link
          >
        {:else}
          <Link to="/mypage"><Button variant="raised">마이페이지</Button></Link>
        {/if}
        <LogoutButton />
      {:else}
        <Link to="/login"><Button variant="raised">로그인</Button></Link>
        <Link to="/signup"><Button variant="raised">회원가입</Button></Link>
        <Link to="/recipes"
          ><Button variant="raised">레시피 보러 가기</Button></Link
        >
      {/if}
    </div>

    <Link to="/admin"
      ><Button variant="raised">관리자페이지 임시 버튼</Button></Link
    >
  </div>
</body>

<style>
  :global(body) {
    background: linear-gradient(
      to bottom,
      rgb(172, 167, 167) 0%,
      rgba(0, 0, 0, 0) 100%
    );
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
    align-items: center;
    height: 100vh;
    padding: 0 10%;
    color: white;
  }

  .main-container h1 {
    font-family: 'Black Han Sans', sans-serif;
    font-size: 4em; 
    color: white;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h1 {
    color: white;
    font-size: 3em;
  }

  @media (max-width: 768px) {
    .main-container {
      padding: 0 5%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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

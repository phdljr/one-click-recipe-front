<script>
  import { Link } from 'svelte-routing';
</script>

<div class="header">
  <h1>딸깍! 레시피</h1>
</div>
<div class="navigation">
  <Link to="/recipes"><button>레시피 보러 가기</button></Link>
  <Link to="/login"><button>로그인</button></Link>
  <Link to="/signup"><button>회원가입</button></Link>
  <Link to="/mypage"><button>마이페이지</button></Link>
  <Link to="/admin"><button>관리자페이지</button></Link>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');

  .header h1 {
    display: flex;
    color: #dce2f0;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 150px;
    font-family: 'East Sea Dokdo', sans-serif !important;
  }

  :global(body) {
    background-image: url('/레시피 배경.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  button {
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
    font-size: large;
  }

  button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

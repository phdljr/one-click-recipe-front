<script>
  import Button from '@smui/button';
  import { Link } from 'svelte-routing';
</script>

<h1>딸깍! 레시피</h1>
<Link to="/recipes"><Button variant="raised">레시피 보러 가기</Button></Link>
<Link to="/login"><Button variant="raised">로그인</Button></Link>
<Link to="/signup"><Button variant="raised">회원가입</Button></Link>

<style>
  h1 {
    text-align: center;
  }
</style>

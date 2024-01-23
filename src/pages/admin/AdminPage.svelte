<script>
  import Button from '@smui/button';
  import { Link } from 'svelte-routing';
</script>

<h1>딸깍! 레시피</h1>
<Link to="/foods"><Button variant="raised">식재료</Button></Link>

<style>
  h1 {
    text-align: center;
  }
</style>

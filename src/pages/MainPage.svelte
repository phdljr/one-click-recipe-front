<script>
  import { navigate } from 'svelte-routing';
</script>

<div class="header">
  <h1>딸깍! 레시피</h1>
  <div class="container">
    <button class="login-btn" on:click={() => navigate('/recipes')}
      >레시피 조회</button
    >
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');

  *:global(.smui-btn) {
    width: 300px;
    height: 300px;
  }

  .container {
    display: flex;
    width: 600px;
    height: 400px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

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
    font-size: 30px;
    width: 300px;
    height: 100px;
  }

  button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

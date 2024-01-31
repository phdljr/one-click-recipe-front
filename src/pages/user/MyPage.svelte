<script>
  import { Link } from 'svelte-routing';
</script>

<div class="container">
  <h1>마이페이지</h1>
  <div class="button-container">
    <Link to="/mypage/order-list"
      ><button class="custom-button1">주문 목록</button></Link
    >
    <Link to="/mypage/like-list"
      ><button class="custom-button1">좋아요 목록</button></Link
    >
  </div>
</div>

<style>
  h1 {
    display: flex;
    color: #333;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 150px;
    font-family: 'East Sea Dokdo', sans-serif !important;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .custom-button1 {
    background-color: #331b3f;
    color: #dce2f0;
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

  .custom-button1:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

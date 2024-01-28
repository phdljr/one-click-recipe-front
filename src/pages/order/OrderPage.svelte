<script>
  import { onMount } from 'svelte';
  import { isLogin, auth } from '../../store/user';
  import PayButton from '../../components/pay/PayButton.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';

  let products = [];
  let totalProductPrice = 0;
  let requestDto = {
    senderName: '',
    senderPhoneNumber: '',
    senderEmail: '',
    receiverName: '',
    receiverPhoneNumber: '',
    address: '',
    addressDetail: '',
    requirement: '',
  };

  $: console.log(requestDto);

  onMount(() => {
    getCarts();
  });

  const getCarts = () => {
    fetch(HOST + '/api/v1/carts', {
      method: 'GET',
      headers: {
        Authorization: `${$auth}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        totalProductPrice = data.totalPrice;
        products = data.foods;
        products.map((product) => {
          product.unit = convert(product.unit);
        });
      });
  };
</script>

<link
  href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap"
  rel="stylesheet"
/>

<div class="content-wrapper">
  <div class="header">
    <h1 class="logo">딸깍! <span class="logo-recipe">레시피</span></h1>
  </div>

  <div class="order-header">
    <h2 class="order-title">주문/결제</h2>
  </div>

  <div class="sender-info">
    <h3>구매자 정보</h3>
    <div class="info-box">
      <div class="input-group">
        <label for="senderName">이름</label>
        <input
          type="text"
          id="senderName"
          placeholder="이름을 입력하세요"
          bind:value={requestDto.senderName}
        />
      </div>
      <div class="input-group">
        <label for="senderPhoneNumber">휴대폰 번호</label>
        <input
          type="tel"
          id="senderPhoneNumber"
          placeholder="휴대폰 번호를 입력하세요"
          bind:value={requestDto.senderPhoneNumber}
        />
      </div>
      <div class="input-group">
        <label for="email">이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력해주세요"
          bind:value={requestDto.senderEmail}
        />
      </div>
    </div>
  </div>

  <div class="receiver-info">
    <h3>받는 사람 정보</h3>
    <div class="info-box">
      <div class="input-group">
        <label for="receiverName">이름</label>
        <input
          type="text"
          id="receiverName"
          placeholder="이름을 입력하세요"
          bind:value={requestDto.receiverName}
        />
      </div>
      <div class="input-group">
        <label for="address">배송주소</label>
        <input
          type="text"
          id="address"
          placeholder="배송주소를 입력하세요"
          bind:value={requestDto.address}
        />
      </div>
      <div class="input-group">
        <label for="addressDetail">상세주소</label>
        <input
          type="text"
          id="addressDetail"
          placeholder="상세주소를 입력하세요"
          bind:value={requestDto.addressDetail}
        />
      </div>
      <div class="input-group">
        <label for="receiverPhoneNumber">연락처</label>
        <input
          type="tel"
          id="receiverPhoneNumber"
          placeholder="연락처를 입력하세요"
          bind:value={requestDto.receiverPhoneNumber}
        />
      </div>
      <div class="input-group">
        <label for="requirement">요청 사항</label>
        <input
          type="text"
          id="requirement"
          placeholder="요청 사항을 입력하세요"
          bind:value={requestDto.requirement}
        />
      </div>
    </div>
  </div>
</div>

<div class="shipping-info">
  <h3>배송 정보</h3>
  <div class="info-box">
    <ul>
      {#each products as product}
        <li>
          <span>{product.name}</span>
          <span>{product.quantity}{product.unit}</span>
          <span>{product.price.toLocaleString('ko-KR')}원</span>
        </li>
      {/each}
    </ul>
    <div class="total-price">
      총 가격: <span>{totalProductPrice.toLocaleString('ko-KR')}원</span>
    </div>
  </div>
</div>

<div class="payment-button">
  <PayButton {requestDto} />
</div>

<style>
  .content-wrapper {
    width: 1000px;
    margin: auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-bottom: 2px solid #bbb3b3;
  }

  .logo {
    font-family: 'Dancing Script', cursive;
    font-size: 2em;
    color: #fa591d;
    animation: logo-entry 0.5s ease-out forwards;
  }

  .logo-recipe {
    color: #555;
    animation: text-glow 2s infinite alternate;
  }

  .order-header {
    padding: 20px;
    background-color: #fff;
    border-bottom: 4px solid #4f4e4e;
  }

  .order-title {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }

  .sender-info {
    background-color: #f8f8f8;
    padding: 20px;
    margin-top: 20px;
  }

  .receiver-info {
    background-color: #f8f8f8;
    padding: 20px;
    margin-top: 20px;
  }

  .info-box {
    border: 1px solid #dcdcdc;
    padding: 15px;
    margin-top: 10px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .input-group label {
    flex: 0 0 100px;
    margin-right: 10px;
    white-space: nowrap;
    display: block;
    margin-bottom: 5px;
  }

  .input-group input {
    flex: 1;
    width: 100%;
    padding: 10px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
  }

  .shipping-info {
    background-color: #f8f8f8;
    padding: 20px;
    margin-top: 20px;
  }

  .info-box ul {
    list-style-type: none;
    padding: 0;
  }

  .info-box li {
    padding: 10px 0;
  }

  .total-price {
    margin-top: 10px;
    font-weight: bold;
  }

  .payment-button {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  @keyframes logo-entry {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes text-glow {
    from {
      text-shadow:
        0 0 10px #fa591d,
        0 0 20px #fa591d,
        0 0 30px #fa591d,
        0 0 40px #fa591d;
    }
    to {
      text-shadow:
        0 0 20px #fa591d,
        0 0 30px #fa591d,
        0 0 40px #fa591d,
        0 0 50px #fa591d;
    }
  }

  @media (max-width: 600px) {
    .content-wrapper {
      max-width: 100%;
      padding: 10px;
    }
  }
</style>

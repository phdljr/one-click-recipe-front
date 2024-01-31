<script>
  import { onMount } from 'svelte';
  import PayButton from '../../components/pay/PayButton.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  let products = [];
  let totalProductPrice = 0;
  let requestDto = {
    senderName: '',
    senderPhoneNumber: '',
    senderEmail: $auth.email,
    receiverName: '',
    receiverPhoneNumber: '',
    address: '',
    addressDetail: '',
    requirement: '',
  };

  onMount(() => {
    getCarts();
  });

  const getCarts = async () => {
    fetch(HOST + '/api/v1/carts', {
      method: 'GET',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        totalProductPrice = data.totalPrice;
        products = data.foods;
        products.map((product) => {
          product.unit = convert(product.unit);
        });
      });
  };

  const openAddressApi = () => {
    // @ts-ignore
    new daum.Postcode({
      oncomplete: (data) => {
        requestDto.address = data.address;
      },
    }).open();
  };
</script>

<svelte:head>
  <script
    src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  ></script>
</svelte:head>

<div class="content-wrapper">
  <div class="order-header">
    <h2 class="order-title">주문/결제</h2>
  </div>

  <div class="sender-info">
    <h3>구매자 정보</h3>
    <div class="info-box">
      <div class="input-group">
        <label for="senderName"
          ><span class="essential-star">* </span>이름</label
        >
        <input
          type="text"
          id="senderName"
          placeholder="이름을 입력하세요"
          bind:value={requestDto.senderName}
        />
      </div>
      <div class="input-group">
        <label for="senderPhoneNumber"
          ><span class="essential-star">* </span>휴대폰 번호</label
        >
        <input
          type="tel"
          id="senderPhoneNumber"
          placeholder="휴대폰 번호를 입력하세요"
          bind:value={requestDto.senderPhoneNumber}
        />
      </div>
      <div class="input-group">
        <label for="email"><span class="essential-star">* </span>이메일</label>
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
        <label for="receiverName"
          ><span class="essential-star">* </span>이름</label
        >
        <input
          type="text"
          id="receiverName"
          placeholder="이름을 입력하세요"
          bind:value={requestDto.receiverName}
        />
      </div>
      <div class="input-group">
        <label for="address"
          ><span class="essential-star">* </span>배송주소</label
        >
        <button on:click={openAddressApi}>주소 검색</button>
        <input
          disabled
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
        <label for="receiverPhoneNumber"
          ><span class="essential-star">* </span>연락처</label
        >
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
</div>

<div class="payment-button">
  <PayButton {requestDto} />
</div>

<style>
  .content-wrapper {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 1200px;
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0.9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
    margin: 30px auto;
  }

  .order-header,
  .sender-info,
  .receiver-info {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
  }

  .order-title,
  .order-header h2 {
    margin: 0;
    font-size: 1.5em;
    color: #fff;
  }

  .info-box {
    border: 1px solid #dcdcdc;
    padding: 15px;
    margin-top: 10px;
    background-color: transparent;
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
    color: #ffffff;
  }

  .input-group input {
    flex: 1;
    width: 100%;
    padding: 10px;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.2);
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
    color: #fff;
  }

  .payment-button {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .shipping-info {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
  }

  .shipping-info h3 {
    margin-bottom: 15px;
  }

  .shipping-info ul {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 20px;
  }

  .shipping-info li {
    padding: 5px 0;
    border-bottom: 1px solid #fff;
  }

  .total-price {
    font-weight: bold;
    font-size: 1.2em;
    color: #f1c40f;
  }

  .essential-star {
    color: red;
  }

  @media (max-width: 600px) {
    .content-wrapper {
      width: 100%;
      padding: 10px;
    }
  }
</style>

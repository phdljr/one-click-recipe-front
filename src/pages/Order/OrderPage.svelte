<script>
  let senderName = '';
  let senderPhoneNumber = '';
  let receiverName = '';
  let receiverPhoneNumber = '';
  let address = '';
  let addressDetail = '';
  let requirement = '';
  let totalProductPrice = 0; // 상품 가격 합산
  let products = [
    { name: '상품1', price: 10000 },
    { name: '상품2', price: 20000 },
    // 상품 데이터 구조에 따라 조정
  ];

  // 총 상품 가격 계산
  let totalPrice = products.reduce((sum, product) => sum + product.price, 0);
</script>

<h1>주문/결제</h1>

<div class="order-section">
  <h2>구매자 정보</h2>
  <div class="input-field">
    <label for="name">이름</label>
    <input type="text" id="name" bind:value={senderName} />
  </div>
  <div class="input-field">
    <label for="phone">휴대폰 번호</label>
    <input type="tel" id="phone" bind:value={senderPhoneNumber} />
  </div>
</div>

<div class="order-section">
  <h2>받는 사람 정보</h2>
  <div class="input-field">
    <label for="recipient-name">이름</label>
    <input type="text" id="recipient-name" bind:value={receiverName} />
  </div>
  <div class="input-field">
    <label for="recipient-phone">전화번호</label>
    <input type="tel" id="recipient-phone" bind:value={receiverPhoneNumber} />
  </div>
  <div class="input-field">
    <label for="address">주소</label>
    <input type="text" id="address" bind:value={address} />
  </div>
  <div class="input-field">
    <label for="detailed-address">상세 주소</label>
    <input type="text" id="detailed-address" bind:value={addressDetail} />
  </div>
  <div class="input-field">
    <label for="special-request">요청 사항</label>
    <input type="text" id="special-request" bind:value={requirement} />
  </div>
</div>

<div class="order-section">
  <h2>결제 정보</h2>
  <div class="product-list">
    <h3>상품 정보</h3>
    <ul>
      {#each products as product}
        <li>{product.name} - {product.price}원</li>
      {/each}
    </ul>
  </div>
  <div class="input-field">
    <label>총 상품 가격</label>
    <span>{totalPrice}원</span>
  </div>
  <div class="input-field">
    <label>결제 방법</label>
    <span>카카오페이</span>
  </div>
</div>

<button>결제하기</button>

<style>
  .order-section {
    margin-bottom: 20px;
  }

  button {
    /* 버튼 스타일을 여기에 적용하세요 */
  }
</style>

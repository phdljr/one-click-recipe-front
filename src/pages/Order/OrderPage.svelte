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
        <input type="text" id="senderName" placeholder="이름을 입력하세요" />
      </div>
      <div class="input-group">
        <label for="senderPhoneNumber">휴대폰 번호</label>
        <input
          type="tel"
          id="senderPhoneNumber"
          placeholder="휴대폰 번호를 입력하세요"
        />
      </div>
    </div>
  </div>

  <div class="receiver-info">
    <h3>받는 사람 정보</h3>
    <div class="info-box">
      <div class="input-group">
        <label for="receiverName">이름</label>
        <input type="text" id="receiverName" placeholder="이름을 입력하세요" />
      </div>
      <div class="input-group">
        <label for="address">배송주소</label>
        <input type="text" id="address" placeholder="배송주소를 입력하세요" />
      </div>
      <div class="input-group">
        <label for="addressDetail">상세주소</label>
        <input
          type="text"
          id="addressDetail"
          placeholder="상세주소를 입력하세요"
        />
      </div>
      <div class="input-group">
        <label for="receiverPhoneNumber">연락처</label>
        <input
          type="tel"
          id="receiverPhoneNumber"
          placeholder="연락처를 입력하세요"
        />
      </div>
      <div class="input-group">
        <label for="requirement">요청 사항</label>
        <input
          type="text"
          id="requirement"
          placeholder="요청 사항을 입력하세요"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .content-wrapper {
    width: 1000px;
    margin: auto; /* 좌우 중앙 정렬 */
    padding: 20px; /* 안쪽 여백 설정 */
    box-sizing: border-box; /* 패딩을 포함한 너비 계산 */
  }

  .header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-bottom: 2px solid #bbb3b3;
  }

  .logo {
    font-family: 'Dancing Script', cursive; /* 로고에 사용할 글꼴 */
    font-size: 2em; /* 로고 크기 */
    color: #fa591d; /* 로고 색상 */
    animation: logo-entry 0.5s ease-out forwards; /* 로고 등장 애니메이션 */
  }

  .logo-recipe {
    color: #555; /* '레시피' 부분의 색상 */
    animation: text-glow 2s infinite alternate; /* '레시피' 부분의 깜빡이는 애니메이션 */
  }

  .order-header {
    padding: 20px;
    background-color: #fff; /* 배경색을 흰색으로 설정 */
    border-bottom: 4px solid #4f4e4e; /* 하단에 경계선을 추가 */
  }

  .order-title {
    margin: 0; /* 기본 마진을 제거하여 정렬을 맞춥니다 */
    font-size: 1.5em; /* 텍스트 크기를 조정합니다 */
    color: #333; /* 텍스트 색상을 설정합니다 */
  }

  .sender-info {
    background-color: #f8f8f8; /* 배경색 설정 */
    padding: 20px; /* 패딩 설정 */
    margin-top: 20px; /* 상단 여백 설정 */
  }

  .receiver-info {
    background-color: #f8f8f8; /* 배경색 설정 */
    padding: 20px; /* 패딩 설정 */
    margin-top: 20px; /* 상단 여백 설정 */
  }

  .info-box {
    border: 1px solid #dcdcdc; /* 경계선 설정 */
    padding: 15px; /* 패딩 설정 */
    margin-top: 10px; /* 상단 여백 설정 */
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* 입력 그룹 간 하단 여백 설정 */
  }

  .input-group label {
    flex: 0 0 100px;
    margin-right: 10px;
    white-space: nowrap;
    display: block; /* 라벨을 블록 요소로 설정 */
    margin-bottom: 5px; /* 라벨 아래 여백 설정 */
  }

  .input-group input {
    flex: 1;
    width: 100%; /* 입력 필드 너비 설정 */
    padding: 10px; /* 입력 필드 내부 여백 설정 */
    border: 1px solid #dcdcdc; /* 입력 필드 경계선 설정 */
    box-sizing: border-box; /* 박스 크기 결정 방법 설정 */
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

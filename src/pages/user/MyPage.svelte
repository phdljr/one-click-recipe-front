<script>
  import { Link } from 'svelte-routing';
  import { writable } from 'svelte/store';
  import { auth } from '../../store/user';
  import HOST from '../../lib/host';

  const showModal = writable(false);

  let nickname = '';
  let nicknameError = '';
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let passwordError = '';
  let confirmPasswordError = '';

  function toggleModal() {
    showModal.update((n) => !n);
    nickname = '';
    nicknameError = '';
  }

  async function updateNickname() {
    if (nickname === $auth.nickname) {
      nicknameError = '같은 닉네임입니다.';
      return;
    }

    const response = await fetch(HOST + `/api/v1/users/nickname`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify({ nickname }),
    });

    if (response.ok) {
      nicknameError = '';
      alert('닉네임이 변경되었습니다.');
      toggleModal();
      window.location.reload();
    } else {
      const errorResponse = await response.json();
      if (errorResponse && errorResponse.message) {
        nicknameError = '이미 사용중인 닉네임입니다.';
      } else {
        nicknameError = '닉네임 (4~20자 사이)로 입력해주세요.';
      }
    }
  }

  async function updatePassword() {
    if (!currentPassword) {
      passwordError = '기존 비밀번호를 입력해주세요.';
      return;
    }

    if (!newPassword || !confirmPassword) {
      passwordError = '새 비밀번호와 확인 비밀번호를 모두 입력해주세요.';
      return;
    }

    if (newPassword.length < 8) {
      passwordError = '비밀번호는 최소 8자 이상이어야 합니다.';
      return;
    }

    if (currentPassword === newPassword) {
      passwordError = '새 비밀번호는 현재 비밀번호와 다르게 설정해주세요.';
      return;
    }

    if (newPassword !== confirmPassword) {
      confirmPasswordError = '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.';
      return;
    }

    const requestData = {
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    };

    const response = await fetch(HOST + `/api/v1/users/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      alert('비밀번호가 변경되었습니다.');
      toggleModal();
      window.location.reload();
    } else {
      const errorResponse = await response.json();
      if (errorResponse && errorResponse.message) {
        passwordError = errorResponse.message;
      } else {
        passwordError = '비밀번호 변경에 실패하였습니다.';
      }
    }
  }
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
    <button class="custom-button1" on:click={toggleModal}>계정 설정</button>
  </div>

  {#if $showModal}
    <div class="modal" on:click={toggleModal}>
      <div class="modal-content" on:click={(e) => e.stopPropagation()}>
        <span class="close" on:click={toggleModal}>&times;</span>
        <h2>계정 설정</h2>
        <div class="input-container">
          <div>
            <label for="nickname">새 닉네임</label>
            <input id="nickname" type="text" bind:value={nickname} />
            {#if nicknameError}
              <p class="error">{nicknameError}</p>
            {/if}
            <button on:click={updateNickname}>닉네임 변경</button>
          </div>
          <div>
            <label for="currentPassword">기존 비밀번호</label>
            <input
              id="currentPassword"
              type="password"
              bind:value={currentPassword}
              on:input={() => (passwordError = '')}
            />
            {#if passwordError}
              <p class="error">{passwordError}</p>
            {/if}
          </div>
          <div>
            <label for="newPassword">새 비밀번호</label>
            <input
              id="newPassword"
              type="password"
              bind:value={newPassword}
              on:input={() => (passwordError = '')}
            />
          </div>
          <div>
            <label for="confirmPassword">새 비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              bind:value={confirmPassword}
              on:input={() => (confirmPasswordError = '')}
            />
            {#if confirmPasswordError}
              <p class="error">{confirmPasswordError}</p>
            {/if}
          </div>
          <button on:click={updatePassword}>비밀번호 변경</button>
        </div>
      </div>
    </div>
  {/if}
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

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .modal-content h2 {
    text-align: center;
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-container div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
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

  button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

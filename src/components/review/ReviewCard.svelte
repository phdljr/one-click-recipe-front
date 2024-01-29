<script>
  import Textfield from '@smui/textfield';
  import Dialog, { Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import HOST from '../../lib/host';
  import { isLogin, auth } from '../../store/user';

  export let review;
  let open = false;

  let reviewUpdateDto = { ...review };
  const updateReview = () => {
    fetch(HOST + `/api/v1/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${$auth}`,
      },
      body: JSON.stringify(reviewUpdateDto),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        review = reviewUpdateDto;
        alert('업데이트 완료');
      })
      .catch((error) => {
        alert('업데이트 실패');
      });
  };
  const deleteReview = () => {
    fetch(HOST + `/api/v1/reviews/${review.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${$auth}`,
      },
    })
      .then((res) => location.reload())
      .catch((error) => {
        alert('삭제 실패');
      });
  };
  const handleCloseDialog = (e) => {
    switch (e.detail.action) {
      case 'save':
        updateReview();
        break;
      case 'delete':
        deleteReview();
        break;
      default:
        reviewUpdateDto = { ...review };
        break;
    }
  };
  function rate(rating) {
    reviewUpdateDto.star = rating;
  }
</script>

<div class={open ? 'modal open' : 'modal'}>
  <div class="modal-content">
    <textarea bind:value={reviewUpdateDto.content} placeholder="리뷰"
    ></textarea>
    <div class="rating">
      {#each [1, 2, 3, 4, 5] as n}
        <button
          on:click={() => rate(n)}
          class={`star ${reviewUpdateDto.star >= n ? 'filled' : ''}`}>★</button
        >
      {/each}
    </div>
    <div class="modal-actions">
      <button on:click={updateReview}>저장</button>
      <button on:click={deleteReview}>삭제</button>
      <button on:click={() => (open = false)}>취소</button>
    </div>
  </div>
</div>

<div class="review-card">
  <div on:click={() => (open = !open)}>
    <h2>{review.content}</h2>
    <h3>{review.writer}</h3>
    <h4>
      {#each [1, 2, 3, 4, 5] as _}
        {#if _ <= review.star}
          ★
        {/if}
      {/each}
    </h4>
  </div>
</div>

<style>
  .modal {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }

  .modal.open {
    display: flex;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal-actions button {
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .modal-actions button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }

  .rating .star {
    color: gold;
  }

  .rating .star.filled {
    color: red;
  }
</style>

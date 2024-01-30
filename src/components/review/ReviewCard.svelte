<script>
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  export let review;
  let open = false;

  let reviewUpdateDto = { ...review };

  const updateReview = () => {
    fetch(HOST + `/api/v1/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify(reviewUpdateDto),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        review = reviewUpdateDto;
        alert('리뷰가 성공적으로 업데이트되었습니다.');
        open = false;
      })
      .catch((error) => {
        alert('리뷰 업데이트에 실패했습니다.');
      });
  };

  const deleteReview = () => {
    fetch(HOST + `/api/v1/reviews/${review.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('리뷰가 성공적으로 삭제되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert('리뷰 삭제에 실패했습니다.');
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

  function handleCloseOverlay(event) {
    open = false;
  }

  function rate(rating) {
    reviewUpdateDto.star = rating;
  }

  const filledStarUrl =
    'https://cdn.builder.io/api/v1/image/assets/TEMP/fa1cd4f9506301825c57a5ad38044c67daaf262266c0fa452d477825685c479b?';
  const emptyStarUrl =
    'https://cdn.builder.io/api/v1/image/assets/TEMP/d7a5988b714f259a29e90b1d5c2adcfea494cab28373dc9e38f2ec8ba4d216a7?';
</script>

<div class={open ? 'modal open' : 'modal'} on:click={handleCloseOverlay}>
  <div class="modal-content" on:click|stopPropagation>
    <textarea bind:value={reviewUpdateDto.content} placeholder="리뷰"
    ></textarea>
    <div class="rating">
      {#each [1, 2, 3, 4, 5] as n}
        <img
          on:click={() => rate(n)}
          src={n <= reviewUpdateDto.star ? filledStarUrl : emptyStarUrl}
          class="img"
          alt="star"
        />
      {/each}
    </div>
    <div class="modal-actions">
      <button on:click={updateReview}>수정</button>
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
      {#each [1, 2, 3, 4, 5] as n}
        <img
          src={n <= review.star ? filledStarUrl : emptyStarUrl}
          class="review-star-img"
          alt="star"
        />
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
    background-color: rgba(255, 255, 255, 0.8);
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
    width: 90%;
    max-width: 500px;
  }

  .modal-actions button {
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition:
      background-color 0.3s,
      transform 0.2s;
    margin: 0 5px;
  }

  .modal-actions button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }

  .review-star-img {
    width: 24px;
    height: auto;
    margin-right: 5px;
  }
</style>

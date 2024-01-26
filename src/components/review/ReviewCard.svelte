<script>
  import Textfield from '@smui/textfield';
  import Dialog, { Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import HOST from '../../lib/host';
  import { getCookie } from 'svelte-cookie';

  export let review;
  let open = false;

  let reviewUpdateDto = { ...review };
  const updateReview = () => {
    fetch(HOST + `/api/v1/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('Authorization'),
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
        Authorization: getCookie('Authorization'),
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

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:SMUIDialog:closed={handleCloseDialog}
>
  <Content id="simple-content">
    <Textfield type="text" bind:value={reviewUpdateDto.content} label="리뷰"
    ></Textfield>
  </Content>
  <div class="rating">
    {#each [1, 2, 3, 4, 5] as n}
      <button
        on:click={() => rate(n)}
        class="star {reviewUpdateDto.star >= n ? 'filled' : ''}">★</button
      >
    {/each}
  </div>
  <Actions>
    <div class="btn-container">
      <Button action="delete">
        <Label><span class="text-red">삭제</span></Label>
      </Button>
      <span>
        <Button action="save">
          <Label>저장</Label>
        </Button>
        <Button action="cancel">
          <Label>취소</Label>
        </Button>
      </span>
    </div>
  </Actions>
</Dialog>

<div class="container">
  <Card>
    <PrimaryAction on:click={() => (open = !open)}>
      <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
          {review.content}
        </h2>
        <h3
          class="mdc-typography--subtitle2"
          style="margin: 0 0 10px; color: #888;"
        >
          {review.writer}
        </h3>
        <h4>
          {#each [1, 2, 3, 4, 5] as _}
            {#if _ <= review.star}
              ★
            {/if}
          {/each}
        </h4>
      </Content>
    </PrimaryAction>
  </Card>
</div>

<style>
</style>

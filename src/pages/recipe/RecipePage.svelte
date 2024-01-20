<script>
  import { onMount } from 'svelte';
  import HOST from '../../lib/host';

  export let recipeId;

  let recipe = {};
  let reviews = [];
  let recipeFoods = [];
  let recipeProcesses = [];

  onMount(() => {
    // getRecipe();
    // getRecipeFoods();
    // getRecipeProcesses();
    // getReviews();
  });

  const getRecipe = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        recipe = data;
      });
  };

  const getRecipeFoods = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}/recipe-foods`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        recipeFoods = data;
      });
  };

  const getRecipeProcesses = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}/recipe-processes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        recipeProcesses = data;
      });
  };

  const getReviews = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        reviews = data;
      });
  };
  ////////////////////////////////////////'//////'/////////////////////
  import Button from '@smui/button';
  let comments = [];
  let newComment = '';
  let newRating = 0;

  function submitComment() {
    if (newComment.trim() !== '' && newRating !== 0) {
      comments = [...comments, { text: newComment, rating: newRating }];
      newComment = '';
      newRating = 0;
    }
  }

  function rate(rating) {
    newRating = rating;
  }
</script>

<h1>{recipeId}</h1>

<div class="comment-box">
  <textarea bind:value={newComment} placeholder="댓글을 입력하세요..."
  ></textarea>
  <div class="rating">
    {#each [1, 2, 3, 4, 5] as n}
      <button
        on:click={() => rate(n)}
        class="star {newRating >= n ? 'filled' : ''}">★</button
      >
    {/each}
  </div>
  <Button on:click={submitComment} variant="raised">댓글 작성</Button>

  {#if comments.length > 0}
    <div class="comments">
      <h3>댓글:</h3>
      {#each comments as { text, rating }, index (index)}
        <div class="comment">{index + 1}: {text} ({rating} / 5)</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .star {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .star.filled {
    color: gold;
  }
</style>

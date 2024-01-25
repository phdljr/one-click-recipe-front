<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import RecipeFoods from '../../components/recipe/RecipeFoods.svelte';
  import RecipeProcesses from '../../components/recipe/RecipeProcesses.svelte';
  import RecipeReviews from '../../components/recipe/RecipeReviews.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';

  export let recipeId;

  let recipe = {};
  let reviews = [];
  let recipeFoods = [];
  let recipeProcesses = [];

  let totalPrice = 0;
  let selectedRecipeFoods = [];

  onMount(() => {
    getRecipe();
    getRecipeFoods();
    getRecipeProcesses();
    getReviews();
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
        recipeFoods = data;
        recipeFoods.map((recipeFood) => {
          selectedRecipeFoods.push(recipeFood);
          recipeFood.unit = convert(recipeFood.unit);
        });
        console.log(data);
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

  const handleBuyingRecipeFoods = async () => {
    const deleteResponse = await fetch(HOST + `/api/v1/carts`, {
      method: 'DELETE',
      headers: {
        Authorization: getCookie('Authorization'),
        'Content-Type': 'application/json',
      },
    });

    if (deleteResponse.status >= 400 && deleteResponse.status < 600) {
      alert('장바구니 비우기 실패');
      return;
    }

    const postResponse = await fetch(HOST + `/api/v1/carts`, {
      method: 'POST',
      headers: {
        Authorization: getCookie('Authorization'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeFoodIds: selectedRecipeFoods.map((recipeFood) => recipeFood.id),
      }),
    });

    if (postResponse.status >= 400 && deleteResponse.status < 600) {
      alert('장바구니 담기 실패');
      return;
    }

    navigate('/order');
  };

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

<div class="container-recipe">
  <h1 class="recipe-title">{recipe.title}</h1>
  <h3 class="recipe-intro">{recipe.intro}</h3>
  <hr class="hr-100" />
  <div class="container-flex">
    <RecipeFoods {recipeFoods} bind:totalPrice bind:selectedRecipeFoods />
    <br />
    <Button
      class="buy-button"
      variant="raised"
      on:click={handleBuyingRecipeFoods}>재료 구매</Button
    >
    <br />
    <hr class="hr-100" />
    <br />
    <h1>조리 과정</h1>
    <RecipeProcesses {recipeProcesses} />
    <br />
    <hr class="hr-100" />
    <br />
    <RecipeReviews {reviews} />
  </div>
</div>

<h1>{recipeId}</h1>
<div class="comment-box">
  <div class="rating">
    {#each [1, 2, 3, 4, 5] as n}
      <button
        on:click={() => rate(n)}
        class="star {newRating >= n ? 'filled' : ''}">★</button
      >
    {/each}
  </div>
  <div class="comment-input">
    <textarea bind:value={newComment} placeholder="댓글을 입력하세요..."
    ></textarea>
    <Button on:click={submitComment} variant="raised">댓글 작성</Button>
  </div>
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
  * :global(.span-bold-center) {
    text-align: center;
    font-weight: bold;
  }

  * :global(.buy-button) {
    width: 50%;
    height: 50px;
    font-size: large;
  }

  .recipe-title {
    text-align: center;
  }

  .recipe-intro {
    text-align: center;
  }

  .hr-100 {
    width: 100%;
  }

  .container-recipe {
    display: flex;
    flex-direction: column;
    width: 1200px;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 2px 5px 10px;
    margin: 30px 30px;
  }

  .container-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .star {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .star.filled {
    color: gold;
  }
  .comment-box {
    width: 80%;
    margin: 0 auto;
  }

  textarea {
    width: 100%;
    box-sizing: border-box;
  }

  .rating {
    margin-right: -4px;
    text-align: center;
  }

  .star {
    font-size: 24px;
    cursor: pointer;
    margin-right: -4px;
  }
  .comments {
    width: 100%;
  }

  .comment {
    margin-bottom: 10px;
  }
  .comment-input {
    display: flex;
    flex-direction: row;
  }

  .comment-input textarea {
    width: 100%; /* 전체 너비를 차지하도록 설정 */
    margin-bottom: 10px; /* 원하는 간격으로 조절하세요 */
  }
</style>

<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import RecipeFoods from '../../components/recipe/RecipeFoods.svelte';
  import RecipeProcesses from '../../components/recipe/RecipeProcesses.svelte';
  import ReviewCard from '../../components/review/ReviewCard.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import {
    extractErrors,
    reviewValidate,
  } from '../../lib/validates/review-validate';
  import { auth, isLogin } from '../../store/user';

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
        reviews = data;
      });
  };

  const handleBuyingRecipeFoods = async () => {
    const deleteResponse = await fetch(HOST + `/api/v1/carts`, {
      method: 'DELETE',
      headers: {
        Authorization: $auth.Authorization,
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
        Authorization: $auth.Authorization,
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
  let reviewDto = {
    content: '',
    star: 0,
  };

  function rate(rating) {
    reviewDto.star = rating;
  }
  const createReview = async () => {
    if (!$isLogin) {
      alert('로그인을 진행해주세요.');
      return;
    }

    try {
      await reviewValidate.validate(reviewDto, {
        abortEarly: false,
      });
    } catch (error) {
      let errors = extractErrors(error);
      let message = Object.values(errors).join('\n');
      alert(message);
      return;
    }

    fetch(HOST + `/api/v1/recipes/${recipeId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify(reviewDto),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        reviews = [...reviews, data];
      })
      .catch(async (error) => {
        let failData = await error.json();
        alert(failData.message);
      });
  };

  const filledStarUrl =
    'https://cdn.builder.io/api/v1/image/assets/TEMP/fa1cd4f9506301825c57a5ad38044c67daaf262266c0fa452d477825685c479b?';
  const emptyStarUrl =
    'https://cdn.builder.io/api/v1/image/assets/TEMP/d7a5988b714f259a29e90b1d5c2adcfea494cab28373dc9e38f2ec8ba4d216a7?';
</script>

<div class="container-recipe">
  <h1 class="recipe-title">{recipe.title}</h1>
  <h3 class="recipe-intro">{recipe.intro}</h3>
  <hr class="hr-100" />
  <div class="container-flex">
    <RecipeFoods {recipeFoods} bind:totalPrice bind:selectedRecipeFoods />
    <br />
    {#if $isLogin}
      <Button
        class="buy-button"
        variant="raised"
        on:click={handleBuyingRecipeFoods}>재료 구매</Button
      >
    {:else}
      <Button
        class="buy-button"
        variant="raised"
        on:click={() =>
          alert('재료 구매는 로그인한 사용자만 이용할 수 있습니다.')}
        >재료 구매</Button
      >
    {/if}
    <br />
    <hr class="hr-100" />
    <br />
    <h1>조리 과정</h1>
    <RecipeProcesses {recipeProcesses} />
    <br />
    <hr class="hr-100" />
    <br />
  </div>
  {#if comments.length > 0}
    <div class="comments">
      <h3>댓글:</h3>
      {#each comments as { text, rating }, index (index)}
        <div class="comment">{index + 1}: {text} ({rating} / 5)</div>
      {/each}
    </div>
  {/if}

  <div class="comment-section">
    <div class="comment-input-container">
      <textarea
        bind:value={reviewDto.content}
        placeholder="댓글을 입력하세요..."
      ></textarea>
    </div>
    <div class="comment-actions-container">
      <div class="rating">
        {#each [1, 2, 3, 4, 5] as n}
          <img
            src={n <= reviewDto.star ? filledStarUrl : emptyStarUrl}
            class="img"
            alt="star"
            on:click={() => rate(n)}
          />
        {/each}
      </div>
      <Button on:click={createReview} class="buy-button2" variant="raised"
        >댓글 작성</Button
      >
    </div>
  </div>

  {#if reviews.length !== 0}
    {#each reviews as review (review.id)}
      <div><ReviewCard {review} /></div>
    {/each}
  {:else}
    <h1>등록된 댓글이 없습니다.</h1>
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
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  :global(.buy-button:hover) {
    background-color: #3c3c3c;
    color: #fff;
  }

  * :global(.buy-button2) {
    font-size: large;
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  :global(.buy-button2:hover) {
    background-color: #3c3c3c;
    color: #fff;
  }

  .recipe-title {
    text-align: center;
  }

  .recipe-intro {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .hr-100 {
    border-top: 1px solid #f1c40f;
    width: 100%;
    margin-bottom: 20px;
    opacity: 0.75;
  }

  .container-recipe {
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

  .recipe-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .container-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  textarea {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    width: 95%;
    height: 100px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px;
    resize: none;
    font-size: 1rem;
    font-family: 'Open Sans', sans-serif;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .rating {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-bottom: 10px;
  }

  .img {
    aspect-ratio: 1.05;
    object-fit: contain;
    object-position: center;
    width: 24px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .img:hover {
    transform: scale(1.5);
  }

  .comment-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .comment-input-container {
    flex-grow: 2;
    margin-right: 20px;
  }

  .comments {
    background-color: #333;
    color: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-top: 20px;
  }

  .comment {
    border-bottom: 1px solid #474747;
    padding-bottom: 12px;
    margin-bottom: 12px;
    font-size: 0.9rem;
  }

  .comment:last-child {
    border-bottom: none;
  }
</style>

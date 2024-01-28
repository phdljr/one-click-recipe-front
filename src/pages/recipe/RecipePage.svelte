<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import RecipeFoods from '../../components/recipe/RecipeFoods.svelte';
  import RecipeProcesses from '../../components/recipe/RecipeProcesses.svelte';
  import ReviewCard from '../../components/review/ReviewCard.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

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
  let newComment = '';
  let newRating = 0;

  function rate(rating) {
    reviewDto.star = rating;
  }
  const createReview = () => {
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
        alert('리뷰가 등록되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert('리뷰 등록 실패');
        console.log(error);
      });
  };
  // const getAllReview = () => {
  //   fetch(HOST + `/api/v1/recipes/${recipeId}/reviews`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       reviews = data;
  //     });
  // };
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
  </div>
</div>
{#if reviews.length !== 0}
  {#each reviews as review (review.id)}
    <div><ReviewCard {review} /></div>
  {/each}
{:else}
  <h1>등록된 댓글이 없습니다.</h1>
{/if}
<h1>{recipeId}</h1>
<div class="comment-box">
  <div class="rating">
    {#each [1, 2, 3, 4, 5] as n}
      <button
        on:click={() => rate(n)}
        class="star {reviewDto.star >= n ? 'filled' : ''}">★</button
      >
    {/each}
  </div>
  <div class="mood">
    <textarea bind:value={reviewDto.content} placeholder="댓글을 입력하세요..."
    ></textarea>
    <Button class="best" on:click={createReview} variant="raised"
      >댓글 작성</Button
    >
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
  * :global(.mood) {
    display: flex;
  }
  * :global(.best) {
    width: 120px;
    height: 50px;
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
    margin-bottom: 10px;
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
</style>

<script>
  // @ts-nocheck

  import Button, { Label } from '@smui/button';

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
  import { Content } from '@smui/drawer';
  import { PrimaryAction } from '@smui/card';
  import Dialog, { Actions } from '@smui/dialog';
  import RecipeFoodAllPage from './RecipeFoodAllPage.svelte';

  export let recipeId;
  let open = false;
  let totalPrice;
  let recipe = {};
  let reviews = [];
  let recipeFoods = [];
  let recipeProcesses = [];

  let selectedRecipeFoods = [];
  let recipeUpdateRequestDto = {};
  let recipeUpdateImage = null;
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
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        recipe = data;
        console.log(recipe);
        // @ts-ignore
        recipeUpdateRequestDto = { ...recipe };
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
  async function toggleFollowed() {
    if (!$isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }
    const method = recipe.isFollowed ? 'DELETE' : 'POST';
    recipe.isFollowed = !recipe.isFollowed;
    try {
      const response = await fetch(
        `${HOST}/api/v1/follows/${recipe.writerId}`,
        {
          method: method,
          headers: {
            Authorization: $auth.Authorization,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
      recipe.isFollowed = !recipe.isFollowed;
      alert('본인은 구독할 수 없습니다!');
    }
  }
  const deleteRecipe = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
    })
      .then((res) => {
        alert('레시피가 성공적으로 삭제되었습니다.');
        navigate('/recipes');
      })
      .catch((error) => {
        alert('레시피 삭제에 실패했습니다.');
      });
  };
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleSelectRecipeImage = (e) => {
    const fileInput = e.target;
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해 주세요.');
      fileInput.value = '';
      return;
    }

    recipeUpdateImage = file;
  };

  const updateRecipe = () => {
    let formData = new FormData();
    formData.append(
      'recipeUpdateRequestDto',
      new Blob([JSON.stringify(recipeUpdateRequestDto)], {
        type: 'application/json',
      }),
    );
    if (recipeUpdateImage == null) {
      formData.append('recipeUpdateImage', new Blob());
    } else {
      let recipeUpdateImageType;
      if (recipeUpdateImage.type == 'image/png') {
        recipeUpdateImageType = 'image/png';
      } else {
        recipeUpdateImageType = 'image/jpeg';
      }
      formData.append(
        'recipeUpdateImage',
        new Blob([recipeUpdateImage], { type: recipeUpdateImageType }),
      );
    }
    fetch(HOST + `/api/v1/recipes/${recipeId}`, {
      method: 'PUT',
      headers: {
        Authorization: $auth.Authorization,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('레시피가 성공적으로 업데이트되었습니다.');
        recipe = { ...recipeUpdateRequestDto };
      })
      .catch((error) => {
        alert(recipeUpdateRequestDto.title);
      });
  };
  const handleCloseDialog = (e) => {
    switch (e.detail.action) {
      case 'save':
        updateRecipe();
        break;
    }
  };
</script>

<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

<div class="container-recipe">
  <div class="follow-delete-buttons">
    <button
      on:click={toggleFollowed}
      title="Add to follows"
      class="follow-button"
      style="color: yellow;"
    >
      {#if recipe.isFollowed}
        <span class="material-icons">bookmark</span>
      {:else}
        <span class="material-icons">bookmark_border</span>
      {/if}
    </button>

    {#if $isLogin}
      {#if $auth.nickname == recipe.writer}
        <button
          class="delete-button"
          style="color: black;"
          on:click={deleteRecipe}
        >
          <span class="material-icons">delete</span>
        </button>
      {/if}
    {:else}{/if}
  </div>
  {#if $isLogin}
    {#if $auth.nickname == recipe.writer}
      <PrimaryAction on:click={() => (open = !open)}>
        <h1 class="recipe-title">{recipe.title}</h1>
        <h3 class="recipe-intro">
          {recipe.intro}
        </h3>
        <span class="recipe-serving">
          {recipe.serving}인분
        </span>
        <hr class="hr-100" />
      </PrimaryAction>
      <Dialog
        class="custom-dialog"
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
        on:SMUIDialog:closed={handleCloseDialog}
      >
        <div class="recipe-form">
          <div class="form-group">
            <label for="recipe-title">레시피 제목</label>
            <input
              required
              type="text"
              id="recipe-title"
              bind:value={recipeUpdateRequestDto.title}
            />
          </div>
          <div class="form-group">
            <label for="recipe-title">레시피 대표 사진</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              on:change={(e) => handleSelectRecipeImage(e)}
            />
          </div>
          <div class="form-group">
            <label for="intro">레시피 소개</label>
            <textarea id="intro" bind:value={recipeUpdateRequestDto.intro}
            ></textarea>
          </div>

          <div class="form-group">
            <label for="serving">인원</label>
            <select id="serving" bind:value={recipeUpdateRequestDto.serving}>
              <option value="1">1인분</option>
              <option value="2">2인분</option>
              <option value="3">3인분</option>
              <option value="4">4인분</option>
              <option value="5">5인분</option>
              <option value="6">6인분 이상</option>
            </select>
          </div>
        </div>
        <Actions>
          <div class="btn-container">
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
    {:else}
      <h1 class="recipe-title">{recipe.title}</h1>
      <h3 class="recipe-intro">
        {recipe.intro}
      </h3>
      <span class="recipe-serving">
        {recipe.serving}인분
      </span>
      <hr class="hr-100" />
    {/if}
  {:else}
    <h1 class="recipe-title">{recipe.title}</h1>
    <h3 class="recipe-intro">
      {recipe.intro}
    </h3>
    <span class="recipe-serving">
      {recipe.serving}인분
    </span>
    <hr class="hr-100" />
  {/if}
  <div class="container-flex">
    <RecipeFoodAllPage {recipeId} bind:totalPrice bind:selectedRecipeFoods />
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
          <span
            class="material-icons img"
            style="color: yellow;"
            on:click={() => rate(n)}
          >
            {#if n <= reviewDto.star}
              star
            {:else}
              star_outline
            {/if}
          </span>
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

  .follow-button {
    margin-left: auto;
    background: transparent;
    border: none;
    padding: 10px 20px;
    width: fit-content;
    cursor: pointer;
    transition:
      color 0.3s,
      background-color 0.3s,
      transform 0.3s;
  }

  .follow-button:hover {
    color: #f1c40f;
    transform: scale(1.5);
  }

  .delete-button {
    background: transparent;
    border: none;
    padding: 10px 20px;
    width: fit-content;
    cursor: pointer;
    transition:
      color 0.3s,
      background-color 0.3s,
      transform 0.3s;
  }

  .delete-button:hover {
    transform: scale(1.5);
  }

  .material-icons {
    font-size: 50px;
  }

  .follow-delete-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .recipe-title {
    text-align: center;
  }

  .recipe-intro {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .recipe-serving {
    margin: 0 auto;
    color: #f1c40f;
    font-size: x-large;
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
    color: #333;
    width: 95%;
    height: 100px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px;
    font-size: 1rem;
    font-family: 'Open Sans', sans-serif;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    cursor: text;
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
    width: 25px;
    cursor: pointer;
    transition: transform 0.3s ease;
    font-size: 35px;
    margin-right: 5px;
    animation: sparkle 1s infinite alternate;
  }

  .img:hover {
    transform: scale(1.3);
  }

  @keyframes sparkle {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
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
  .recipe-form {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    margin: 0 auto;
    width: auto;
    height: auto;
    border-radius: 10px;
  }
  .custom-dialog {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    margin: 0 auto;
    width: auto;
    height: auto;
    border-radius: 10px;
  }
</style>

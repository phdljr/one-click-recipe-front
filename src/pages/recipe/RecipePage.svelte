<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import RecipeFoods from '../../components/recipe/RecipeFoods.svelte';
  import RecipeProcesses from '../../components/recipe/RecipeProcesses.svelte';
  import RecipeReviews from '../../components/recipe/RecipeReviews.svelte';
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
          switch (recipeFood.unit) {
            case 'COUNT':
              recipeFood.unit = '개';
              break;
            case 'G':
              recipeFood.unit = 'g';
              break;
            case 'ML':
              recipeFood.unit = 'ml';
              break;
          }
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
</style>

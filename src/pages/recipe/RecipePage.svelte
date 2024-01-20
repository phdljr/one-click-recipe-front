<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import RecipeFoodComponent from '../../components/recipe/RecipeFoodComponent.svelte';
  import RecipeProcessComponent from '../../components/recipe/RecipeProcessComponent.svelte';
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
</script>

<div class="container-recipe">
  <h1 class="recipe-title">{recipe.title}</h1>
  <h3 class="recipe-intro">{recipe.intro}</h3>
  <hr class="hr-100" />
  <div class="container-flex">
    <RecipeFoodComponent
      {recipeFoods}
      bind:totalPrice
      bind:selectedRecipeFoods
    />
    <br />
    <Button class="buy-button" variant="raised">재료 구매</Button>
    <br />
    <hr class="hr-100" />
    <br />
    <h1>조리 과정</h1>
    <RecipeProcessComponent {recipeProcesses} />
  </div>
</div>

<style>
  * :global(.span-bold-center) {
    text-align: center;
    font-weight: bold;
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
  * :global(.buy-button) {
    width: 50%;
    height: 50px;
    font-size: large;
  }
</style>

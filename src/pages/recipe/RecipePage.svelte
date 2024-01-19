<script>
  import Button from '@smui/button';
  import Checkbox from '@smui/checkbox';
  import { onMount } from 'svelte';
  import HOST from '../../lib/host';

  export let recipeId;

  let recipe = {};
  let reviews = [];
  let recipeFoods = [];
  let recipeProcesses = [];

  let totalPrice = 0;
  let selectedRecipeFoods = [];

  $: {
    totalPrice = 0;
    selectedRecipeFoods.forEach(
      (recipeFood) => (totalPrice += recipeFood.price),
    );
  }

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
  <h1>{recipe.title}</h1>
  <h3>{recipe.intro}</h3>
  <hr style="width: 100%" />
  <div class="container-flex">
    <div class="wrapper-recipe-food">
      <span style="text-align: center; font-weight: bold;">레시피 재료</span>
      <hr style="width: 100%" />
      {#each recipeFoods as recipeFood (recipeFood.id)}
        <div class="recipe-food">
          <span class="recipe-food-name">
            {recipeFood.name}
            {recipeFood.amount}{recipeFood.unit}
          </span>
          <span class="recipe-food-price"
            >{recipeFood.price.toLocaleString('ko-KR')}원</span
          >
          <Checkbox bind:group={selectedRecipeFoods} value={recipeFood} />
        </div>
      {/each}
      <hr style="width: 100%" />
      <span style="text-align: center; font-weight: bold;"
        >총 {totalPrice.toLocaleString('ko-KR')}원</span
      >
    </div>
    <br />
    <Button class="buy-button" variant="raised">재료 구매</Button>
    <br />
    <hr style="width: 100%" />
    <br />
    <h1>조리 과정</h1>
    <div class="wrapper-recipe-process">
      {#each recipeProcesses as recipeProcess (recipeProcess.id)}
        <div class="recipe-process-div">
          {recipeProcess.description}
        </div>
        <br />
      {/each}
    </div>
  </div>
</div>

<style>
  .wrapper-recipe-process {
    display: flex;
    flex-direction: column;
  }
  .recipe-process-div {
    width: 600px;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 2px 3px 5px;
  }
  .recipe-food-name {
    width: 100px;
  }
  .recipe-food-price {
    width: 100px;
    text-align: right;
  }
  .recipe-food {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container-recipe {
    display: flex;
    flex-direction: column;
    width: 1200px;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 2px 5px 10px;
  }
  .container-flex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .wrapper-recipe-food {
    display: flex;
    flex-direction: column;
    width: 30%;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 2px 5px 10px;
  }
  * :global(.buy-button) {
    width: 50%;
    height: 50px;
    font-size: large;
  }
</style>

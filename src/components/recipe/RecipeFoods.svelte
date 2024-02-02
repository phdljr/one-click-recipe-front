<script>
  // @ts-nocheck

  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';
  import { auth, isLogin } from '../../store/user';
  import PrimaryAction from '@smui/card/src/PrimaryAction.svelte';
  import Dialog from '@smui/dialog/src/Dialog.svelte';
  import Select from 'svelte-select';
  import { onMount } from 'svelte';
  import HOST from '../../lib/host';
  import convert from '../../lib/conv-unit';
  export let recipe;
  export let recipeFoods;
  export let totalPrice;
  export let selectedRecipeFoods;
  let open = false;
  let recipeFoodUpdateRequestDto = [
    { name: recipeFoods.name, amount: recipeFoods.amount },
  ];

  let foods = [{ id: '', name: '', price: 0, unit: '' }];
  onMount(() => {
    fetch(HOST + `/api/v1/foods`, {
      method: 'GET',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        foods = data;
        foods.map((food) => (food.unit = convert(food.unit)));
      });
  });
  const getUnit = (recipeFood) => {
    return foods.find((food) => food.name == recipeFood.foodName) != null
      ? foods.find((food) => food.name == recipeFood.foodName).unit
      : '단위';
  };
  $: {
    totalPrice = 0;
    selectedRecipeFoods.forEach(
      (recipeFood) => (totalPrice += recipeFood.price),
    );
  }
  const handleCloseDialog = (e) => {
    console.log(recipeFoodUpdateRequestDto);
  };
</script>

<div class="wrapper-recipe-food">
  <span class="span-bold-center">레시피 재료</span>
  <hr class="hr-100" />
  {#if $isLogin}
    {#if $auth.nickname == recipe.writer}
      <PrimaryAction on:click={() => (open = !open)}>
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
      </PrimaryAction>
      <Dialog
        class="custom-dialog"
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
        surface$style=" 
        height: 500px; width: 850px; max-width:
        color: rgba(0, 0, 0, 0.6);
        calc(100vw - 32px);"
        on:SMUIDialog:closed={handleCloseDialog}
      >
        {#each recipeFoodUpdateRequestDto as recipeFood (recipeFood.id)}
          <div class="ingredient-form-group">
            <Select
              class="svelte-select"
              items={foods.map((f) => f.name)}
              bind:value={recipeFoodUpdateRequestDto.foodName}
            >
              <div class="div-no-food" slot="empty">
                해당 식재료가 없습니다.
              </div>
            </Select>
            <input
              required
              type="number"
              bind:value={recipeFoodUpdateRequestDto.amount}
              min="0"
              max="32768"
            />
          </div>
        {/each}
      </Dialog>
    {:else}
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
    {/if}
  {:else}
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
  {/if}

  <hr class="hr-100" />
  <span class="span-bold-center">총 {totalPrice.toLocaleString('ko-KR')}원</span
  >
</div>

<style>
  .recipe-food-name {
    width: 100px;
    color: #333;
    font-weight: bold;
  }

  .recipe-food-price {
    width: 100px;
    text-align: right;
    color: #333;
  }

  .recipe-food {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  .wrapper-recipe-food {
    display: flex;
    flex-direction: column;
    width: 30%;
    border-radius: 30px;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.7);
    color: #ffffff;
  }

  .span-bold-center {
    font-size: 1.2rem;
    text-align: center;
    color: #f1c40f;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .hr-100 {
    border-top: 1px solid #f1c40f;
    width: 100%;
    margin-bottom: 20px;
    opacity: 0.75;
  }
  .ingredient-form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .ingredient-form-group input[type='text'],
  .ingredient-form-group input[type='number'] {
    flex-grow: 1;
    margin-right: 10px;
    color: #fff;
  }

  .ingredient-form-group select option {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
  .form-group label {
    display: block;
    margin-bottom: 10px;
    color: #fff;
    font-size: 1.2rem;
  }

  .form-group input[type='text'],
  .form-group input[type='file'],
  .form-group select,
  .form-group textarea {
    width: 95%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: large;
  }

  .form-group select option {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }

  .form-group textarea {
    height: 100px;
  }

  .ingredients-title {
    text-align: center;
    color: #333;
    font-size: 2rem;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .ingredients-form {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    margin: 0 auto;
    width: 1000px;
    border-radius: 10px;
  }

  .ingredient-form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .ingredient-form-group input[type='text'],
  .ingredient-form-group input[type='number'] {
    flex-grow: 1;
    margin-right: 10px;
    color: #fff;
  }

  .ingredient-form-group select option {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }

  .cooking-steps-title {
    text-align: center;
    color: #333;
    font-size: 2rem;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .cooking-steps-form {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    margin: 0 auto;
    width: 1000px;
    border-radius: 10px;
  }

  .cooking-step-form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .cooking-step-form-group .step-number {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 10px;
  }

  .ingredient-form-group input,
  .ingredient-form-group input[type='text'],
  .ingredient-form-group input[type='number'] {
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: large;
  }

  :global(.svelte-select) {
    margin-right: 10px !important;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1) !important;
    font-size: large !important;
  }

  .ingredient-form-group input[disabled] {
    color: #fff;
  }

  .ingredient-form-group button {
    padding: 10px 15px;
    border-radius: 4px;
  }
</style>

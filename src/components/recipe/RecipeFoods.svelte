<script>
  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';
  import { auth, isLogin } from '../../store/user';
  import PrimaryAction from '@smui/card/src/PrimaryAction.svelte';
  import Dialog from '@smui/dialog/src/Dialog.svelte';
  export let recipe;
  export let recipeFoods;
  export let totalPrice;
  export let selectedRecipeFoods;
  let open = false;
  let recipeFoodUpdateRequestDto = {};

  $: {
    totalPrice = 0;
    selectedRecipeFoods.forEach(
      (recipeFood) => (totalPrice += recipeFood.price),
    );
  }
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
      >
        {#each recipeFoods as recipeFood (recipeFood.id)}
          <div class="recipe-food">
            <span class="recipe-food-name">
              {recipeFood.name}
              {recipeFood.amount}{recipeFood.unit}
            </span>
            <span class="recipe-food-price"
              >{recipeFood.price.toLocaleString('ko-KR')}원</span
            >
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
</style>

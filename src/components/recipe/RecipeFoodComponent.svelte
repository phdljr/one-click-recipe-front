<script>
  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';

  export let recipeFoods;
  export let totalPrice;
  export let selectedRecipeFoods;

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
  <span class="span-bold-center">총 {totalPrice.toLocaleString('ko-KR')}원</span
  >
</div>

<style>
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
  .wrapper-recipe-food {
    display: flex;
    flex-direction: column;
    width: 30%;
    border-radius: 30px;
    padding: 30px;
    box-shadow: 2px 5px 10px;
  }
</style>

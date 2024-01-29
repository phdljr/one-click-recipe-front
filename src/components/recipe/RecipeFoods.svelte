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
  <hr class="hr-100" />
  <span class="span-bold-center">총 {totalPrice.toLocaleString('ko-KR')}원</span
  >
</div>

<style>
  .recipe-food-name {
    width: 100px;
    color: #ffffff;
    font-weight: bold;
  }

  .recipe-food-price {
    width: 100px;
    text-align: right;
    color: #ffffff;
  }

  .recipe-food {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
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

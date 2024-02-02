<script>
  import RecipeFoodCard from './RecipeFoodCard.svelte';

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

{#if recipeFoods.length !== 0}
  <div class="wrapper-recipe-food">
    <span class="recipe-food-sub">레시피 식재료</span>
    <hr class="hr-100" />
    {#each recipeFoods as recipeFood (recipeFood.id)}
      <RecipeFoodCard {recipeFood} bind:selectedRecipeFoods />
    {/each}
    <hr class="hr-100" />
    <span class="recipe-food-sub"
      >총 {totalPrice.toLocaleString('ko-KR')}원</span
    >
  </div>
{:else}
  <h1>등록된 레시피재료가 없습니다.</h1>
{/if}

<style>
  .recipe-food-sub {
    text-align: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #f1c40f;
  }

  .wrapper-recipe-food {
    display: flex;
    flex-direction: column;
    width: 30%;
    border-radius: 30px;
    padding: 30px;
    background-color: #000000b3;
    box-shadow: 2px 5px 10px #000000b3;
    align-items: center;
  }

  .hr-100 {
    border-top: 1px solid #f1c40f;
    width: 100%;
    margin-bottom: 20px;
    opacity: 0.75;
  }
</style>

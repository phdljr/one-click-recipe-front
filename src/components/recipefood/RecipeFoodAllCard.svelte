<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import RecipeFoodCard from './RecipeFoodCard.svelte';

  export let recipeId;
  export let totalPrice;
  export let selectedRecipeFoods;

  let recipeFoods = [];

  onMount(() => {
    getRecipeFoods();
  });

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
</script>

{#if recipeFoods.length !== 0}
  {#each recipeFoods as recipeFood (recipeFood.id)}
    <div class="container-recipe-food">
      <RecipeFoodCard {recipeFood} bind:selectedRecipeFoods />
    </div>
  {/each}
{:else}
  <h1>등록된 레시피재료가 없습니다.</h1>
{/if}

<style>
  .container-recipe-food {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    flex-direction: column;
  }
</style>

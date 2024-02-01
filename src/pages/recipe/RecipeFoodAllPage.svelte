<script>
  // @ts-nocheck

  import RecipeFoodCard from './../../components/recipefood/RecipeFoodCard.svelte';
  import Button from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import FoodCard from '../../components/food/FoodCard.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  export let recipeId;
  export let totalPrice;
  let recipeFoods = [];
  let selectedRecipeFoods = [];

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
  $: {
    totalPrice = 0;
    selectedRecipeFoods.forEach(
      (recipeFood) => (totalPrice += recipeFood.price),
    );
  }
</script>

{#if recipeFoods.length !== 0}
  <LayoutGrid fixedColumnWidth>
    {#each recipeFoods as recipeFood (recipeFood.id)}
      <Cell>
        <RecipeFoodCard {recipeFood} {selectedRecipeFoods} />
      </Cell>
    {/each}
  </LayoutGrid>
{:else}
  <h1>등록된 레시피재료가 없습니다.</h1>
{/if}

<style>
</style>

<script>
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { Link } from 'svelte-routing';
  import { onMount } from 'svelte';
  import RecipeCard from '../../components/recipe/RecipeCard.svelte';
  import HOST from '../../lib/host';

  let recipes = [];

  onMount(() => {
    getAllRecipe();
  });

  const getAllRecipe = () => {
    fetch(HOST + '/api/v1/recipes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        recipes = data;
      });
  };
</script>
<h1 class="recipe-heading">레시피 목록</h1>
<Link to="/recipe-create"><button>레시피 등록</button></Link>

{#if recipes.length !== 0}
<p class="recipe-count">총<span style="font-size: 24px; color: #FF0000">{recipes.length}</span>개의 레시피가 있습니다.</p>
  <LayoutGrid fixedColumnWidth>
    {#each recipes as recipe (recipe.id)}
      <Cell>
        <RecipeCard {recipe} />
      </Cell>
    {/each}
  </LayoutGrid>
{:else}
  <h1>등록된 레시피가 없습니다.</h1>
{/if}

<style>
  .recipe-heading {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    background-color: #ffffff;
    padding: 10px;
    border: 2px solid #000000;
    box-shadow: 2px 2px 5px #888888;
    text-align: center;
  }

  button {
    background-color: #6200ee;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #4938cf;
  }

  .recipe-count {
    font-size: 18px;
    color: #030007;
    font-weight: bold;
    text-align: left;
    margin: 10px 0;
  }
</style>
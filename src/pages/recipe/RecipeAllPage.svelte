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

<Link to="/recipe-create"><button>레시피 등록</button></Link>

{#if recipes.length !== 0}
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

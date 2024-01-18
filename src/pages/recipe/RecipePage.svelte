<script>
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import RecipeCard from '../../components/recips/RecipeCard.svelte';
  import HOST from '../../lib/host';

  let recipes = [
    {
      id: 1,
      title: 'test',
      intro: 'test intro',
      serving: 1,
    },
    {
      id: 2,
      title: 'test',
      intro: 'test intro',
      serving: 2,
    },
    {
      id: 3,
      title: 'test',
      intro: 'test intro',
      serving: 3,
    },
    {
      id: 4,
      title: 'test',
      intro: 'test intro',
      serving: 4,
    },
  ];

  onMount(() => {
    // getAllRecipe();
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
        recipes = data.body;
      });
  };
</script>

<LayoutGrid fixedColumnWidth>
  {#each recipes as recipe (recipe.id)}
    <Cell>
      <RecipeCard {recipe} />
    </Cell>
  {/each}
</LayoutGrid>

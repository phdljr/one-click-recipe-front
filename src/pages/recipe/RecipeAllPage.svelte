<script>
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import RecipeCard from '../../components/recipe/RecipeCard.svelte';
  import HOST from '../../lib/host';

  let recipes = [
    {
      id: 1,
      title: 'test',
      intro: 'test intro',
      serving: 1,
      writer: 'test1',
      imagePath:
        'https://sitem.ssgcdn.com/56/19/99/item/1000069991956_i1_750.jpg',
    },
    {
      id: 2,
      title: 'test',
      intro: 'test intro',
      serving: 2,
      writer: 'test2',
      imagePath:
        'https://sitem.ssgcdn.com/56/19/99/item/1000069991956_i1_750.jpg',
    },
    {
      id: 3,
      title: 'test',
      intro: 'test intro',
      serving: 3,
      writer: 'test3',
      imagePath:
        'https://sitem.ssgcdn.com/56/19/99/item/1000069991956_i1_750.jpg',
    },
    {
      id: 4,
      title: 'test',
      intro: 'test intro',
      serving: 4,
      writer: 'test4',
      imagePath:
        'https://sitem.ssgcdn.com/56/19/99/item/1000069991956_i1_750.jpg',
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
        console.log(data);
        recipes = data;
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

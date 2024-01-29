<script>
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import RecipeCard from '../../components/recipe/RecipeCard.svelte';
  import HOST from '../../lib/host';
  import { auth, isLogin } from '../../store/user';

  let recipes = [];

  onMount(() => {
    getAllRecipe();
  });

  const getAllRecipe = async () => {
    try {
      const response = await fetch(`${HOST}/api/v1/recipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        let data = await response.json();

        if ($isLogin) {
          data = await Promise.all(
            data.map(async (recipe) => {
              const likeResponse = await fetch(
                `${HOST}/api/v1/recipes/${recipe.id}/likes/status`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: $auth.Authorization,
                  },
                },
              );
              if (likeResponse.ok) {
                const likeStatus = await likeResponse.json();
                return { ...recipe, liked: likeStatus };
              } else {
                return { ...recipe, liked: false };
              }
            }),
          );
        }

        recipes = data;
      } else {
        console.error('Failed to fetch recipes:', response.status);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
</script>

<h1>레시피 목록</h1>

{#if recipes.length !== 0}
  <LayoutGrid fixedColumnWidth>
    {#each recipes as recipe (recipe.id)}
      <Cell>
        <RecipeCard {recipe} liked={recipe.liked} />
      </Cell>
    {/each}
  </LayoutGrid>
{:else}
  <h1>등록된 레시피가 없습니다.</h1>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');

  h1 {
    display: flex;
    color: #dce2f0;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 150px;
    font-family: 'East Sea Dokdo', sans-serif !important;
  }

  button {
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }
</style>

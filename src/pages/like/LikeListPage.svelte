<script>
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import RecipeCard from '../../components/recipe/RecipeCard.svelte';
  import HOST from '../../lib/host';
  import { auth, isLogin } from '../../store/user';

  let likedRecipes = [];

  onMount(() => {
    if ($isLogin) {
      fetchLikedRecipes();
    }
  });

  async function fetchLikedRecipes() {
    try {
      const response = await fetch(`${HOST}/api/v1/recipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: $auth.Authorization,
        },
      });

      if (response.ok) {
        const recipes = await response.json();

        likedRecipes = await Promise.all(
          recipes.map(async (recipe) => {
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
              return likeStatus ? { ...recipe, liked: true } : null;
            }

            return null;
          }),
        );

        likedRecipes = likedRecipes.filter((recipe) => recipe !== null);
      } else {
        console.error('Failed to fetch recipes:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<h1>좋아요 누른 레시피 목록</h1>

{#if likedRecipes.length > 0}
  <LayoutGrid fixedColumnWidth>
    {#each likedRecipes as recipe (recipe.id)}
      <Cell>
        <RecipeCard {recipe} liked={recipe.liked} />
      </Cell>
    {/each}
  </LayoutGrid>
{:else}
  <p>좋아요 누른 레시피가 없습니다.</p>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');

  h1 {
    display: flex;
    color: #333;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 150px;
    font-family: 'East Sea Dokdo', sans-serif !important;
  }
</style>
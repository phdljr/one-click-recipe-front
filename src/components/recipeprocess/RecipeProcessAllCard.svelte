<script>
  import RecipeProcessCard from './RecipeProcessCard.svelte';

  export let writerId;
  export let recipeProcesses;
</script>

{#if recipeProcesses.length !== 0}
  {#each recipeProcesses as recipeProcess, index (recipeProcess.id)}
    <RecipeProcessCard {writerId} {recipeProcess} {index} />
  {/each}
{:else}
  <h1>등록된 조리과정이 없습니다.</h1>
{/if}

<style>
</style>

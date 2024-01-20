<script>
  export let recipeProcesses;
</script>

<div class="wrapper-recipe-process">
  {#each recipeProcesses as recipeProcess (recipeProcess.id)}
    <div class="recipe-process-div">
      <span>{recipeProcess.sequence}. {recipeProcess.description}</span>
      <img src={recipeProcess.imageUrl} alt="" />
    </div>
    <br />
  {/each}
</div>

<style>
  .wrapper-recipe-process {
    display: flex;
    flex-direction: column;
  }
  .recipe-process-div {
    width: 600px;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 2px 3px 5px;
  }
</style>

<script>
  export let recipeProcesses;
</script>

<div class="wrapper-recipe-process">
  {#each recipeProcesses as recipeProcess, index (recipeProcess.id)}
    <div class="recipe-process-div">
      <span>{index + 1}. {recipeProcess.description}</span>
      <a href={recipeProcess.imageUrl} target="_blank"
        ><img
          src={encodeURI(recipeProcess.imageUrl)}
          alt=""
          width="200"
          height="100%"
        />
      </a>
    </div>
    <br />
  {/each}
</div>

<style>
  .wrapper-recipe-process {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 20px;
  }

  .recipe-process-div {
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    width: 600px;
    height: 150px;
    color: #ffffff;
    padding: 30px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.7);
  }

  .recipe-process-div span {
    font-size: 1.5rem;
    margin-right: 20px;
    font-weight: bold;
    flex: 1;
  }

  .recipe-process-div img {
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 200px;
    height: auto;
  }
</style>

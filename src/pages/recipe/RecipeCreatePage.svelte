<script>
  let title = '';
  let intro = '';
  let serving = '';
  let videoUrl = '';

  let ingredients = [{ name: '', unit: 'COUNT' }];
  let unitOptions = ['COUNT', 'G', 'ML'];

  function addIngredient() {
    ingredients = [...ingredients, { name: '', unit: 'COUNT' }];
  }

  function removeIngredient(index) {
    ingredients = ingredients.filter((_, i) => i !== index);
  }
</script>

<h2 class="recipe-title">레시피 등록</h2>

<div class="recipe-form">
  <div class="form-group">
    <label for="recipe-title">레시피 제목</label>
    <input
      type="text"
      id="recipe-title"
      bind:value={title}
      placeholder="레시피 제목을 입력하세요"
    />
  </div>

  <div class="form-group">
    <label for="intro">레시피 소개</label>
    <textarea id="intro" bind:value={intro} placeholder="레시피에 대한 소개"
    ></textarea>
  </div>

  <div class="form-group">
    <label for="serving">인원</label>
    <select id="serving" bind:value={serving}>
      <option value="1인분">1인분</option>
      <option value="2인분">2인분</option>
      <option value="3인분">3인분</option>
      <option value="4인분">4인분</option>
      <option value="5인분">5인분</option>
      <option value="6인분 이상">6인분 이상</option>
    </select>
  </div>

  <div class="form-group">
    <label for="videoUrl">비디오 URL</label>
    <input
      type="text"
      id="videoUrl"
      bind:value={videoUrl}
      placeholder="비디오 URL"
    />
  </div>
</div>

<div class="ingredients-form">
  <h3>재료 등록</h3>
  {#each ingredients as ingredient, index (ingredient)}
    <div class="ingredient-form-group">
      <input type="text" placeholder="재료 이름" bind:value={ingredient.name} />
      <input
        type="number"
        placeholder="수량"
        bind:value={ingredient.amount}
        min="0"
      />
      <select bind:value={ingredient.unit}>
        {#each unitOptions as unit}
          <option value={unit}>{unit === 'COUNT' ? '개' : unit}</option>
        {/each}
      </select>
      <button on:click={() => removeIngredient(index)}>제거</button>
    </div>
  {/each}
  <button on:click={addIngredient}>재료 추가</button>
</div>

<style>
  .recipe-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .recipe-form {
    width: 1000px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-group input[type='text'],
  .form-group textarea {
    width: 98%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .form-group textarea {
    height: 100px; /* 조절 가능 */
  }

  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }

  .ingredients-form {
    margin-bottom: 20px;
  }

  .ingredient-form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .ingredient-form-group input,
  .ingredient-form-group select {
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .ingredient-form-group button {
    padding: 10px 15px;
    border-radius: 4px;
  }
</style>

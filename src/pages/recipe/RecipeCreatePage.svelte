<script>
  let title = '';
  let intro = '';
  let serving = '';
  let videoUrl = '';

  let ingredients = [{ name: '', unit: 'COUNT' }];
  let unitOptions = ['COUNT', 'G', 'ML'];

  let steps = [{ description: '', image: null }];

  function addIngredient() {
    ingredients = [...ingredients, { name: '', unit: 'COUNT' }];
  }

  function removeIngredient(index) {
    ingredients = ingredients.filter((_, i) => i !== index);
  }

  function addStep() {
    steps = [...steps, { description: '', image: null }];
  }

  function removeStep(index) {
    steps = steps.filter((_, i) => i !== index);
  }

  function handleImageChange(event, index) {
    const file = event.target.files[0];
    if (file) {
      steps[index].image = URL.createObjectURL(file);
    }
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

<h3 class="ingredients-title">재료 등록</h3>

<div class="ingredients-form">
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

<h3 class="cooking-steps-title">조리 순서</h3>

<div class="cooking-steps-form">
  {#each steps as step, index (step)}
    <div class="cooking-step-form-group">
      <div class="step-number">{index + 1}</div>
      <textarea
        class="step-description"
        placeholder="조리 과정 설명"
        bind:value={step.description}
      ></textarea>
      <div class="step-image-upload">
        <input
          type="file"
          on:change={(event) => handleImageChange(event, index)}
        />
        {#if step.image}
          <img
            src={step.image}
            alt={`조리 과정 ${index + 1}`}
            class="preview-image"
          />
        {/if}
      </div>

      <button on:click={() => removeStep(index)} class="remove-step-button"
        >제거</button
      >
    </div>
  {/each}
  <button on:click={addStep} class="add-step-button">조리 단계 추가</button>
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

  .ingredients-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .ingredients-form {
    width: 1000px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .ingredient-form-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .ingredient-form-group input[type='text'],
  .ingredient-form-group input[type='number'],
  .ingredient-form-group select {
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
  }

  .ingredient-form-group button {
    padding: 10px 15px;
    border-radius: 4px;
  }

  .cooking-steps-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .cooking-steps-form {
    width: 1000px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .cooking-step-form-group {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .step-number {
    font-size: 1.5em;
    margin-right: 20px;
  }

  .step-description {
    flex: 1;
    margin-right: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 100px;
  }

  .step-image-upload {
    display: flex;
    flex-direction: column;
  }

  .step-image-upload input {
    margin-bottom: 10px;
  }

  .preview-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .remove-step-button,
  .add-step-button {
    padding: 10px 15px;
    border-radius: 4px;
    margin-left: 20px;
  }

  .cooking-step-form-group textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 100px;
  }

  .cooking-step-form-group .preview-image {
    width: 200px;
    margin-bottom: 10px;
  }

  .add-step-button {
    padding: 10px 15px;
    border-radius: 4px;
  }
</style>

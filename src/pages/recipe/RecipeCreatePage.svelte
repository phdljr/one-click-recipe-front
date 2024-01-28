<script>
  import Button from '@smui/button';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import {
    extractErrors,
    recipeFoodValidate,
    recipeProcessValidate,
    recipeValidate,
  } from '../../lib/validates/recipe-validate';
  import { auth } from '../../store/user';

  let recipeCreateRequestDto = {
    title: '',
    intro: '',
    serving: 0,
    videoUrl: '',
  };
  let recipeCreateImage = null;

  let recipeFoodNextId = 2;
  let recipeFoodCreateRequestDto = [
    {
      id: 1,
      foodName: '',
      amount: 0,
    },
  ];

  let recipeProcessNextSequence = 2;
  let recipeProcessCreateRequestDto = [{ sequence: 1, description: '' }];
  let recipeProcessCreateImage = [null];

  let foods = [{ id: '', name: '', price: 0, unit: '' }];

  onMount(() => {
    fetch(HOST + `/api/v1/foods`, {
      method: 'GET',
      headers: {
        Authorization: $auth.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        foods = data;
        foods.map((food) => (food.unit = convert(food.unit)));
      });
  });

  const addRecipeFood = () => {
    recipeFoodCreateRequestDto = [
      ...recipeFoodCreateRequestDto,
      {
        id: recipeFoodNextId,
        foodName: '',
        amount: 0,
      },
    ];
    recipeFoodNextId++;
  };

  const removeRecipeFood = (index) => {
    if (index == 0) {
      alert('최소한 1개 이상의 재료를 입력해 주세요.');
      return;
    }
    recipeFoodCreateRequestDto = recipeFoodCreateRequestDto.filter(
      (_, i) => i !== index,
    );
    recipeFoodNextId--;
  };

  const addRecipeProcess = () => {
    recipeProcessCreateRequestDto = [
      ...recipeProcessCreateRequestDto,
      { sequence: recipeProcessNextSequence++, description: '' },
    ];
    recipeProcessCreateImage = [...recipeProcessCreateImage, null];
  };

  const removeRecipeProcess = (index) => {
    if (index == 0) {
      alert('최소한 1개 이상의 조리 과정을 입력해 주세요.');
      return;
    }
    recipeProcessCreateRequestDto = recipeProcessCreateRequestDto.filter(
      (_, i) => i !== index,
    );
  };

  const handleSelectRecipeProcessImage = (event, index) => {
    recipeProcessCreateImage[index] = event.target.files[0];
  };

  const handleSelectRecipeImage = (e) => {
    recipeCreateImage = e.target.files[0];
  };

  const getUnit = (recipeFood) => {
    return foods.find((food) => food.name == recipeFood.foodName) != null
      ? foods.find((food) => food.name == recipeFood.foodName).unit
      : '단위';
  };

  const createRecipeAll = async () => {
    try {
      await recipeValidate.validate(recipeCreateRequestDto, {
        abortEarly: false,
      });
      await recipeFoodValidate.validate(recipeFoodCreateRequestDto, {
        abortEarly: false,
      });
      await recipeProcessValidate.validate(recipeProcessCreateRequestDto, {
        abortEarly: false,
      });
    } catch (error) {
      let errors = extractErrors(error);
      let message = Object.values(errors).join('\n');
      alert(message);
      return;
    }

    let formData = new FormData();
    formData.append(
      'recipeCreateRequestDto',
      new Blob([JSON.stringify(recipeCreateRequestDto)], {
        type: 'application/json',
      }),
    );
    if (recipeCreateImage == null) {
      formData.append('recipeCreateImage', new Blob());
    } else {
      let recipeCreateImageType;
      if (recipeCreateImage.type == 'image/png') {
        recipeCreateImageType = 'image/png';
      } else {
        recipeCreateImageType = 'image/jpeg';
      }
      formData.append(
        'recipeCreateImage',
        new Blob([recipeCreateImage], { type: recipeCreateImageType }),
      );
    }

    formData.append(
      'recipeFoodCreateRequestDto',
      new Blob([JSON.stringify(recipeFoodCreateRequestDto)], {
        type: 'application/json',
      }),
    );

    formData.append(
      'recipeProcessCreateRequestDto',
      new Blob([JSON.stringify(recipeProcessCreateRequestDto)], {
        type: 'application/json',
      }),
    );

    recipeProcessCreateImage.forEach((image) => {
      if (image == null) {
        formData.append('recipeProcessCreateImage', new Blob());
      } else {
        let imageType;
        if (image.type == 'image/png') {
          imageType = 'image/png';
        } else {
          imageType = 'image/jpeg';
        }
        formData.append(
          'recipeProcessCreateImage',
          new Blob([image], { type: imageType }),
        );
      }
    });

    fetch(HOST + `/api/v1/recipes`, {
      method: 'POST',
      headers: {
        Authorization: $auth.Authorization,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('레시피 등록이 완료됐습니다.');
        navigate('/recipes');
      })
      .catch((error) => {
        alert('레시피 등록에 실패했습니다.');
      });
  };
</script>

<h2 class="recipe-title">레시피 등록</h2>

<div class="recipe-form">
  <div class="form-group">
    <label for="recipe-title">레시피 제목</label>
    <input
      required
      type="text"
      id="recipe-title"
      bind:value={recipeCreateRequestDto.title}
      placeholder="레시피 제목을 입력하세요"
    />
  </div>

  <div class="form-group">
    <label for="recipe-title">레시피 대표 사진</label>
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => handleSelectRecipeImage(e)}
    />
  </div>

  <div class="form-group">
    <label for="intro">레시피 소개</label>
    <textarea
      id="intro"
      bind:value={recipeCreateRequestDto.intro}
      placeholder="레시피에 대한 소개"
    ></textarea>
  </div>

  <div class="form-group">
    <label for="serving">인원</label>
    <select id="serving" bind:value={recipeCreateRequestDto.serving}>
      <option value="1">1인분</option>
      <option value="2">2인분</option>
      <option value="3">3인분</option>
      <option value="4">4인분</option>
      <option value="5">5인분</option>
      <option value="6">6인분 이상</option>
    </select>
  </div>

  <div class="form-group">
    <label for="videoUrl">비디오 URL</label>
    <input
      type="text"
      id="videoUrl"
      bind:value={recipeCreateRequestDto.videoUrl}
      placeholder="비디오 URL"
    />
  </div>
</div>

<h3 class="ingredients-title">재료 등록</h3>

<div class="ingredients-form">
  {#each recipeFoodCreateRequestDto as recipeFood, index (recipeFood)}
    <div class="ingredient-form-group">
      <select id="food" bind:value={recipeFood.foodName} required>
        {#each foods as food (food.id)}
          <option value={food.name}>{food.name}</option>
        {/each}
      </select>
      <input
        required
        type="number"
        placeholder="수량"
        bind:value={recipeFood.amount}
        min="0"
        max="32768"
      />
      <input
        disabled
        type="text"
        placeholder="단위"
        value={getUnit(recipeFood)}
      />
      {#if recipeFoodCreateRequestDto.length == index + 1}
        <button on:click={() => removeRecipeFood(index)}>제거</button>
      {:else}
        <button disabled>제거</button>
      {/if}
    </div>
  {/each}
  <button on:click={addRecipeFood}>재료 추가</button>
</div>

<h3 class="cooking-steps-title">조리 순서</h3>

<div class="cooking-steps-form">
  {#each recipeProcessCreateRequestDto as recipeProcess, index (recipeProcess)}
    <div class="cooking-step-form-group">
      <div class="step-number">{index + 1}</div>
      <textarea
        class="step-description"
        placeholder="조리 과정 설명"
        bind:value={recipeProcess.description}
      ></textarea>
      <div class="step-image-upload">
        <input
          type="file"
          on:change={(event) => handleSelectRecipeProcessImage(event, index)}
        />
        {#if recipeProcess.image}
          <img
            src={recipeProcess.image}
            alt={`조리 과정 ${index + 1}`}
            class="preview-image"
          />
        {/if}
      </div>

      {#if recipeProcessCreateRequestDto.length == index + 1}
        <button
          on:click={() => removeRecipeProcess(index)}
          class="remove-step-button">제거</button
        >
      {:else}
        <button disabled class="remove-step-button">제거</button>
      {/if}
    </div>
  {/each}
  <button on:click={addRecipeProcess} class="add-step-button"
    >조리 단계 추가</button
  >
</div>

<div class="button-container">
  <Button variant="raised" on:click={createRecipeAll}>등록 완료</Button>
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

  .button-container {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
</style>

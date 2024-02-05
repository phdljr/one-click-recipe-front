<script>
  import Button, { Label } from '@smui/button';
  import { PrimaryAction } from '@smui/card';
  import Checkbox from '@smui/checkbox';
  import Dialog, { Actions } from '@smui/dialog';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  export let recipeId;
  export let recipe;

  let open = false;

  let recipeUpdateRequestDto = { ...recipe };
  let imageChange = false;

  let recipeUpdateImage = null;
  $: console.log(recipeUpdateImage);

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const updateRecipe = () => {
    let formData = new FormData();

    recipeUpdateRequestDto = {
      ...recipeUpdateRequestDto,
      imageChange: imageChange,
    };

    if (recipeUpdateImage == null) {
      formData.append('recipeUpdateImage', new Blob());
    } else {
      formData.append(
        'recipeUpdateImage',
        new Blob([recipeUpdateImage], { type: recipeUpdateImage.type }),
      );
    }

    formData.append(
      'recipeUpdateRequestDto',
      new Blob([JSON.stringify(recipeUpdateRequestDto)], {
        type: 'application/json',
      }),
    );

    fetch(HOST + `/api/v1/recipes/${recipeId}`, {
      method: 'PUT',
      headers: {
        Authorization: $auth.Authorization,
      },
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('레시피가 성공적으로 업데이트되었습니다.');
        recipe = { ...recipeUpdateRequestDto };
      })
      .catch((error) => {
        alert(recipeUpdateRequestDto.title);
      });
  };

  const handleCloseDialog = (e) => {
    switch (e.detail.action) {
      case 'save':
        updateRecipe();
        break;
    }
  };

  const handleSelectRecipeImage = (e) => {
    const fileInput = e.target;
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해 주세요.');
      fileInput.value = '';
      recipeUpdateImage = null;
      return;
    }

    recipeUpdateImage = file;
  };
</script>

<PrimaryAction on:click={() => (open = !open)}>
  <h1 class="recipe-title">{recipe.title}</h1>
  <h3 class="recipe-intro">
    {recipe.intro}
  </h3>
  <span class="recipe-serving">
    {recipe.serving}인분
  </span>
</PrimaryAction>
<Dialog
  class="custom-dialog"
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:SMUIDialog:closed={handleCloseDialog}
>
  <div class="recipe-form">
    <div class="form-group">
      <label for="recipe-title">레시피 제목</label>
      <input
        required
        type="text"
        id="recipe-title"
        bind:value={recipeUpdateRequestDto.title}
      />
    </div>
    <div class="form-group">
      <label for="recipe-title">레시피 대표 사진</label>
      <input
        disabled={!imageChange}
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => handleSelectRecipeImage(e)}
      />
      <Checkbox bind:checked={imageChange}></Checkbox>
    </div>
    <div>
      <label for="intro">레시피 소개</label>
      <textarea id="intro" bind:value={recipeUpdateRequestDto.intro}></textarea>
    </div>

    <div class="form-group">
      <label for="serving">인분</label>
      <select id="serving" bind:value={recipeUpdateRequestDto.serving}>
        <option value="1">1인분</option>
        <option value="2">2인분</option>
        <option value="3">3인분</option>
        <option value="4">4인분</option>
        <option value="5">5인분</option>
        <option value="6">6인분 이상</option>
      </select>
    </div>
  </div>
  <Actions>
    <div class="btn-container">
      <span>
        <Button action="save">
          <Label>저장</Label>
        </Button>
        <Button action="cancel">
          <Label>취소</Label>
        </Button>
      </span>
    </div>
  </Actions>
</Dialog>

<style>
  .form-group {
    display: flex;
    align-items: center;
  }
  .recipe-title {
    text-align: center;
  }

  .recipe-intro {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .recipe-serving {
    margin: 0 auto;
    color: #f1c40f;
    font-size: x-large;
  }

  textarea {
    color: #333;
    width: 95%;
    height: 100px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 12px;
    font-size: 1rem;
    font-family: 'Open Sans', sans-serif;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    cursor: text;
  }

  .recipe-form {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    margin: 0 auto;
    width: auto;
    height: auto;
    border-radius: 10px;
  }
</style>

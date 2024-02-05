<script>
  import Button, { Label } from '@smui/button';
  import { Content, PrimaryAction } from '@smui/card';
  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';
  import Dialog, { Actions } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import HOST from '../../lib/host';
  import { auth, isLogin } from '../../store/user';

  export let writerId;
  export let recipeProcess;
  export let index;

  let imageChange = false;

  let recipeProcessUpdateRequestDto = {
    description: recipeProcess.description,
    sequence: recipeProcess.sequence,
    imageChange: imageChange,
  };
  let open = false;
  let recipeProcessUpdateImage;

  const updateRecipeProcess = () => {
    let formData = new FormData();

    recipeProcessUpdateRequestDto = {
      ...recipeProcessUpdateRequestDto,
      imageChange: imageChange,
    };

    if (recipeProcessUpdateImage == null) {
      formData.append('recipeProcessUpdateImage', new Blob());
    } else {
      formData.append(
        'recipeProcessUpdateImage',
        new Blob([recipeProcessUpdateImage], {
          type: recipeProcessUpdateImage.type,
        }),
      );
    }

    formData.append(
      'recipeProcessUpdateRequestDto',
      new Blob([JSON.stringify(recipeProcessUpdateRequestDto)], {
        type: 'application/json',
      }),
    );

    fetch(HOST + `/api/v1/recipe-processes/${recipeProcess.id}`, {
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
        alert('레시피 조리과정이 성공적으로 업데이트되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert('레시피 조리과정이 업데이트에 실패했습니다.');
      });
  };

  const deleteRecipeProcess = () => {
    fetch(HOST + `/api/v1/recipe-processes/${recipeProcess.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
    })
      .then((res) => {
        alert('식재료가 성공적으로 삭제되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert('식재료 삭제에 실패했습니다.');
      });
  };

  const handleCloseDialog = (e) => {
    switch (e.detail.action) {
      case 'save':
        updateRecipeProcess();
        break;
      case 'delete':
        deleteRecipeProcess();
        break;
      default:
        recipeProcessUpdateRequestDto = {
          ...recipeProcess,
        };
        break;
    }
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const handleSelectRecipeImage = (e) => {
    const fileInput = e.target;
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      alert('파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해 주세요.');
      fileInput.value = '';
      recipeProcessUpdateImage = null;
      return;
    }

    recipeProcessUpdateImage = file;
  };
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:SMUIDialog:closed={handleCloseDialog}
>
  <Content id="simple-content">
    <div>
      <Textfield
        style="width: 100%;"
        textarea
        bind:value={recipeProcessUpdateRequestDto.description}
        label="설명"
      ></Textfield>
      <div class="div-flex">
        <input
          disabled={!imageChange}
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => handleSelectRecipeImage(e)}
        />
        <Checkbox bind:checked={imageChange}></Checkbox>
      </div>
    </div>
  </Content>
  <Actions>
    <div class="btn-container">
      <Button action="delete">
        <Label><span class="text-red">삭제</span></Label>
      </Button>
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
<div class="wrapper-recipe-process">
  {#if $isLogin && $auth.id === writerId}
    <PrimaryAction on:click={() => (open = !open)}>
      <div class="recipe-process-div">
        <span>{index + 1}. {recipeProcess.description}</span>
        <a href={recipeProcess.imageUrl} target="_blank"
          ><img src={recipeProcess.imageUrl} alt="" width="200" />
        </a>
      </div>
    </PrimaryAction>
  {:else}
    <div class="recipe-process-div">
      <span>{index + 1}. {recipeProcess.description}</span>
      <a href={recipeProcess.imageUrl} target="_blank"
        ><img src={recipeProcess.imageUrl} alt="" width="200" />
      </a>
    </div>
  {/if}
</div>

<style>
  .div-flex {
    display: flex;
    align-items: center;
    color: black;
  }

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
    min-height: 150px;
    /* color: #ffffff; */
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

  .btn-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .text-red {
    color: red;
  }
</style>

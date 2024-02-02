<script>
  // @ts-nocheck

  import Button, { Label } from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import Dialog, { Actions } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';
  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';

  export let recipeProcess;
  export let index;
  let imageChange = false;

  let controllerRequestDto = {
    description: recipeProcess.description,
    sequence: recipeProcess.sequence,
    imageChange: imageChange,
  };
  let open = false;
  let recipeProcessUpdateImage;
  const updateRecipeProcess = () => {
    let formData = new FormData();
    formData.append(
      'controllerRequestDto',
      new Blob([JSON.stringify(controllerRequestDto)], {
        type: 'application/json',
      }),
    );
    if (recipeProcessUpdateImage == null) {
      formData.append('recipeProcessUpdateImage', new Blob());
    } else {
      let recipeProcessUpdateImageType;
      if (recipeProcessUpdateImage.type == 'image/png') {
        recipeProcessUpdateImageType = 'image/png';
      } else {
        recipeProcessUpdateImageType = 'image/jpeg';
      }
      formData.append(
        'multipartFile',
        new Blob([recipeProcessUpdateImage], {
          type: recipeProcessUpdateImageType,
        }),
      );
    }
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
        controllerRequestDto = { descrption: recipeProcess.description };
        break;
    }
  };
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:SMUIDialog:closed={handleCloseDialog}
>
  <Content id="simple-content">
    <Textfield
      type="text"
      bind:value={controllerRequestDto.description}
      label="설명"
    ></Textfield>
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
  <PrimaryAction on:click={() => (open = !open)}>
    <div class="recipe-process-div">
      <span>{index + 1}. {recipeProcess.description}</span>
      <a href={recipeProcess.imageUrl} target="_blank"
        ><img src={recipeProcess.imageUrl} alt="" width="200" height="100%" />
      </a>
    </div>
  </PrimaryAction>
  <Checkbox bind:checked={controllerRequestDto.imageChange} />
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

<script>
  import Button, { Label } from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import Dialog, { Actions } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  export let recipeProcess;
  export let index;

  let recipeProcessUpdateDto = { ...recipeProcess };
  let units = ['COUNT', 'G', 'ML'];
  let open = false;

  const updateRecipeFood = () => {
    fetch(HOST + `/api/v1/recipe-foods/${recipeProcess.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify(recipeProcessUpdateDto),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        recipeProcess = recipeProcessUpdateDto;
        alert('식재료가 성공적으로 업데이트되었습니다.');
      })
      .catch((error) => {
        alert('식재료 업데이트에 실패했습니다.');
      });
  };

  const deleteRecipefood = () => {
    fetch(HOST + `/api/v1/recipe-foods/${recipeProcess.id}`, {
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
        updateRecipeFood();
        break;
      case 'delete':
        deleteRecipefood();
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
      bind:value={recipeProcessUpdateDto.foodName}
      label="이름"
    ></Textfield>
  </Content>
  <Content id="simple-content">
    <Textfield
      type="text"
      bind:value={recipeProcessUpdateDto.amount}
      label="단위"
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
      <a href={recipeProcess.imageUrl}
        ><img src={recipeProcess.imageUrl} alt="" width="200" height="100%" />
      </a>
    </div>
  </PrimaryAction>
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

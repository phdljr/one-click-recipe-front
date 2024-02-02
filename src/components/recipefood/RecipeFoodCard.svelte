<script>
  import Button, { Label } from '@smui/button';
  import { Content, PrimaryAction } from '@smui/card';
  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';
  import Dialog, { Actions } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';

  export let recipeFood;
  export let selectedRecipeFoods;

  let recipeFoodUpdateDto = {
    foodName: recipeFood.name,
    amount: recipeFood.amount,
  };
  let open = false;

  const updateRecipeFood = () => {
    fetch(HOST + `/api/v1/recipe-foods/${recipeFood.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify(recipeFoodUpdateDto),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('식재료가 성공적으로 업데이트되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert('식재료 업데이트에 실패했습니다.');
      });
  };

  const deleteRecipefood = () => {
    fetch(HOST + `/api/v1/recipe-foods/${recipeFood.id}`, {
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
      default:
        recipeFoodUpdateDto = {
          foodName: recipeFood.name,
          amount: recipeFood.amount,
        };
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
      bind:value={recipeFoodUpdateDto.foodName}
      label="이름"
    ></Textfield>
  </Content>
  <Content id="simple-content">
    <Textfield
      type="text"
      bind:value={recipeFoodUpdateDto.amount}
      label="수량({recipeFood.unit})"
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

<div class="container-recipe-food">
  <div class="recipe-food">
    <PrimaryAction class="recipe-food-action" on:click={() => (open = !open)}>
      <span class="recipe-food-name">
        {recipeFood.name}
        {recipeFood.amount}{recipeFood.unit}
      </span>
      <span class="recipe-food-price"
        >{recipeFood.price.toLocaleString('ko-KR')}원</span
      >
    </PrimaryAction>
    <Checkbox bind:group={selectedRecipeFoods} bind:value={recipeFood} />
  </div>
</div>

<style>
  :global(.recipe-food-action) {
    display: flex;
    justify-content: center;
    width: 80%;
  }

  .btn-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .text-red {
    color: red;
  }

  .recipe-food-name {
    color: #333;
    font-weight: bold;
    width: 100px;
  }

  .recipe-food-price {
    color: #333;
    font-weight: bold;
    width: 100px;
    font-size: medium;
  }

  :global(.svelte-select) {
    margin-right: 10px !important;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1) !important;
    font-size: large !important;
  }

  .recipe-food {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .container-recipe-food {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    flex-direction: column;
  }
</style>

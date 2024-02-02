<script>
  import Button, { Label } from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import Dialog, { Actions } from '@smui/dialog';
  import List, { Graphic, Item } from '@smui/list';
  import Radio from '@smui/radio';
  import Textfield from '@smui/textfield';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import { auth } from '../../store/user';
  import Checkbox from '@smui/checkbox/src/Checkbox.svelte';

  export let recipeFood;
  export let selectedRecipeFoods;
  export let totalPrice;

  let recipeFoodUpdateDto = { ...recipeFood };
  let units = ['COUNT', 'G', 'ML'];
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
        recipeFood = recipeFoodUpdateDto;
        alert('식재료가 성공적으로 업데이트되었습니다.');
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
        console.log(recipeFood.id);
        deleteRecipefood();
        break;
      default:
        recipeFoodUpdateDto = { ...recipeFood };
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
    <Textfield type="text" bind:value={recipeFoodUpdateDto.amount} label="단위"
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
<hr class="hr-100" />
<div class="recipe-food">
  <PrimaryAction on:click={() => (open = !open)}>
    <span class="recipe-food-name">
      {recipeFood.foodName}
      {recipeFood.amount}
      {recipeFood.unit}
    </span>
  </PrimaryAction>
  <Checkbox bind:group={selectedRecipeFoods} value={recipeFood} />
</div>

<style>
  .btn-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .text-red {
    color: red;
  }
  .recipe-food-name {
    width: 100%;
    color: #333;
    font-weight: bold;
  }

  .recipe-food {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  .hr-100 {
    border-top: 1px solid #f1c40f;
    width: 100%;
    margin-bottom: 20px;
    opacity: 0.75;
  }

  :global(.svelte-select) {
    margin-right: 10px !important;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.1) !important;
    font-size: large !important;
  }
</style>

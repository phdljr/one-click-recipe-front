<script>
  // @ts-nocheck

  import Button, { Label } from '@smui/button';
  import { Content, PrimaryAction } from '@smui/card';
  import Dialog, { Actions } from '@smui/dialog';
  import Textfield from '@smui/textfield';
  import { onMount } from 'svelte';
  import Select from 'svelte-select';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import { auth, isLogin } from '../../store/user';
  import RecipeFoodCard from './RecipeFoodCard.svelte';

  export let writerId;
  export let recipeFoods;
  export let totalPrice;
  export let selectedRecipeFoods;
  export let recipeId;
  let open = false;

  $: {
    totalPrice = 0;
    selectedRecipeFoods.forEach(
      (recipeFood) => (totalPrice += recipeFood.price),
    );
  }
  let foods = [{ id: '', name: '', price: 0, unit: '' }];

  let recipeFoodCreateRequestDto = {
    foodName: '',
    amount: 0,
  };
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
        foods = data;
        foods.map((food) => (food.unit = convert(food.unit)));
      });
  });
  const createRecipeFood = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}/recipe-foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.Authorization,
      },
      body: JSON.stringify(recipeFoodCreateRequestDto),
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
  const handleCloseDialog = (e) => {
    switch (e.detail.action) {
      case 'save':
        createRecipeFood();
        break;
      default:
        recipeFoodCreateRequestDto = {
          foodName: '',
          amount: 0,
        };
        break;
    }
  };
  const getUnit = (recipeFoodCreateRequestDto) => {
    return foods.find(
      (food) => food.name == recipeFoodCreateRequestDto.foodName,
    ) != null
      ? foods.find((food) => food.name == recipeFoodCreateRequestDto.foodName)
          .unit
      : '단위';
  };
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:SMUIDialog:closed={handleCloseDialog}
>
  <div class="wrapper-select">
    <Select
      class="svelte-select"
      placeholder="식재료 검색"
      items={foods.map((f) => f.name)}
      bind:justValue={recipeFoodCreateRequestDto.foodName}
    >
      <div class="div-no-food" slot="empty">해당 식재료가 없습니다.</div>
    </Select>
  </div>
  <Content id="simple-content">
    <Textfield
      type="text"
      bind:value={recipeFoodCreateRequestDto.amount}
      label="수량"
    ></Textfield>
  </Content>
  <Content id="simple-content">
    <Textfield
      type="text"
      value={getUnit(recipeFoodCreateRequestDto)}
      label="수량"
    ></Textfield>
  </Content>
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

{#if recipeFoods.length !== 0}
  <div class="wrapper-recipe-food">
    <span class="recipe-food-sub">레시피 식재료</span>
    {#if $isLogin && $auth.id === writerId}
      <PrimaryAction class="recipe-food-action" on:click={() => (open = !open)}>
        <button class="custom-button">재료 추가</button>
      </PrimaryAction>
    {/if}
    <hr class="hr-100" />
    {#each recipeFoods as recipeFood (recipeFood.id)}
      <RecipeFoodCard {writerId} {recipeFood} bind:selectedRecipeFoods />
    {/each}
    <hr class="hr-100" />
    <span class="recipe-food-sub"
      >총 {totalPrice.toLocaleString('ko-KR')}원</span
    >
  </div>
{:else}
  <h1>등록된 레시피재료가 없습니다.</h1>
{/if}

<style>
  .recipe-food-sub {
    text-align: center;
    font-weight: 700;
    font-size: 1.2rem;
    color: #f1c40f;
  }

  .wrapper-recipe-food {
    display: flex;
    flex-direction: column;
    width: 30%;
    border-radius: 30px;
    padding: 30px;
    background-color: #000000b3;
    box-shadow: 2px 5px 10px #000000b3;
    align-items: center;
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
    color: black !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
    font-size: large !important;
  }

  .custom-button {
    background-color: #dce2f0;
    color: #331b3f;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .custom-button:hover {
    background-color: #3c3c3c;
    color: #fff;
  }

  :global(.div-no-food) {
    padding: 10px;
    text-align: center;
  }

  .wrapper-select {
    width: 80%;
    margin: 10px;
  }
</style>

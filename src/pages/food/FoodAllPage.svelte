<script>
  import Button from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import FoodCard from '../../components/food/FoodCard.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';

  let ingredients = [{ name: '', unit: 'COUNT' }];
  let unitOptions = ['COUNT', 'G', 'ML'];
  let foods = [];
  let FoodrequestDto = {
    foodname: '',
    price: '',
    unit: 'COUNT',
  };
  onMount(() => {
    const page = 0;
    const size = 10;
    getAllFood();
  });

  const getAllFood = () => {
    fetch(HOST + '/api/v1/foods', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('Authorization'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        foods = data;
      });
  };
  const createFood = () => {
    fetch(HOST + '/api/v1/admin/foods/create-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('Authorization'),
      },
      body: JSON.stringify({
        name: FoodrequestDto.foodname,
        price: FoodrequestDto.price,
        unit: FoodrequestDto.unit,
      }),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        alert('재료가 등록되었습니다.');
        location.reload();
      })
      .catch((error) => {
        alert('재료 등록 실패');
        console.log(error);
      });
  };
</script>

{#if foods.length !== 0}
  <LayoutGrid fixedColumnWidth>
    {#each foods as food (food.id)}
      <Cell>
        <FoodCard {food} />
      </Cell>
    {/each}
  </LayoutGrid>
{:else}
  <h1>등록된 레시피가 없습니다.</h1>
{/if}

<h3 class="ingredients-title">식재료 등록</h3>
<div class="ingredients-form">
  {#each ingredients as ingredient, index (ingredient)}
    <div class="ingredient-form-group">
      <input
        type="text"
        placeholder="재료 이름"
        bind:value={FoodrequestDto.foodname}
      />
      <input
        type="number"
        placeholder="금액"
        bind:value={FoodrequestDto.price}
        min="0"
      />
      <select bind:value={FoodrequestDto.unit}>
        {#each unitOptions as unit}
          <option value={unit}>{convert(unit)}</option>
        {/each}
      </select>
    </div>
  {/each}
  <Button variant="raised" on:click={createFood}>재료 추가</Button>
</div>

<style>
  .ingredients-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .ingredients-form {
    display: flex;
    flex-direction: column;
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
</style>

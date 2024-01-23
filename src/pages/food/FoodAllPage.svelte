<script>
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import { getCookie } from 'svelte-cookie';
  import FoodCard from '../../components/food/FoodCard.svelte';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import Button from '@smui/button/src/Button.svelte';

  let open = false;
  let ingredients = [{ name: '', unit: 'COUNT' }];
  let unitOptions = ['COUNT', 'G', 'ML'];
  let foods = [];
  let FoodrequestDto = {
    foodname: '',
    price: '',
    unit: 'COUNT',
  };
  onMount(() => {
    getAllFood();
  });

  const getAllFood = () => {
    fetch(HOST + '/api/v1/admin/foods', {
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
        open = true;
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
  <Button on:click={createFood}>재료 추가</Button>
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
</style>

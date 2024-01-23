<script>
  import { getCookie } from 'svelte-cookie';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import HOST from '../../lib/host';
  import FoodCard from '../../components/food/FoodCard.svelte';
  import convert from '../../lib/conv-unit';

  let open = false;
  let ingredients = [{ name: '', unit: 'COUNT' }];
  let unitOptions = ['COUNT', 'G', 'ML'];
  let foods = [];
  let FoodrequestDto = {
    foodname: '',
    price: '',
    unit: '',
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
  <button on:click={createFood}>재료 추가</button>
</div>

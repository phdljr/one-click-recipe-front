<script>
  import Button, { Label } from '@smui/button';
  import Card, { Content, PrimaryAction } from '@smui/card';
  import Dialog, { Actions } from '@smui/dialog';
  import List, { Graphic, Item } from '@smui/list';
  import Radio from '@smui/radio';
  import Textfield from '@smui/textfield';
  import convert from '../../lib/conv-unit';
  import HOST from '../../lib/host';
  import { auth, isLogin } from '../../store/user';

  export let food;

  let foodUpdateDto = { ...food };
  let units = ['COUNT', 'G', 'ML'];
  let open = false;

  const updateFood = () => {
    fetch(HOST + `/api/v1/admin/foods/${food.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${$auth}`,
      },
      body: JSON.stringify(foodUpdateDto),
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw response;
        }
        food = foodUpdateDto;
      })
      .catch((error) => {
        alert('업데이트 실패');
      });
  };

  const deleteFood = () => {
    fetch(HOST + `/api/v1/admin/foods/${food.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${$auth}`,
      },
    }).then((res) => location.reload());
  };

  const handleCloseDialog = (e) => {
    switch (e.detail.action) {
      case 'save':
        updateFood();
        break;
      case 'delete':
        deleteFood();
        break;
      default:
        foodUpdateDto = { ...food };
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
    <Textfield type="text" bind:value={foodUpdateDto.name} label="이름"
    ></Textfield>
  </Content>
  <Content id="simple-content">
    <Textfield
      type="number"
      suffix="원"
      bind:value={foodUpdateDto.price}
      label="가격"
    ></Textfield>
  </Content>
  <Content id="simple-content">
    단위
    <List radioList>
      {#each units as unit}
        <Item>
          <Graphic>
            <Radio bind:group={foodUpdateDto.unit} value={unit} />
          </Graphic>
          <Label>{convert(unit)}</Label>
        </Item>
      {/each}
    </List>
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

<div class="container">
  <Card>
    <PrimaryAction on:click={() => (open = !open)}>
      <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
          {food.name}
        </h2>
        <h3
          class="mdc-typography--subtitle2"
          style="margin: 0 0 10px; color: #888;"
        >
          {food.price}원
        </h3>
        {food.unit}
      </Content>
    </PrimaryAction>
  </Card>
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
</style>

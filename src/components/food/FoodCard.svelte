<script>
  import Card, { Content, PrimaryAction } from '@smui/card';
  import { navigate } from 'svelte-routing';

  export let food;
</script>

<div class="container">
  <Card>
    <PrimaryAction on:click={() => navigate(`/foods/${food.id}`)}>
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
</style>

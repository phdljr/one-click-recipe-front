<script>
  import List, { Graphic, Item, Separator, Subheader, Text } from '@smui/list';
  import { navigate } from 'svelte-routing';
</script>

<List>
  <Separator />
  <Subheader tag="h6">관리자</Subheader>
  <Item on:click on:click={() => navigate('/admin/foods')}>
    <Graphic class="material-icons" aria-hidden="true">food_bank</Graphic>
    <Text>식재료 관리</Text>
  </Item>
  <Item on:click on:click={() => navigate('/admin/users')}>
    <Graphic class="material-icons" aria-hidden="true">people</Graphic>
    <Text>회원 관리</Text>
  </Item>
</List>

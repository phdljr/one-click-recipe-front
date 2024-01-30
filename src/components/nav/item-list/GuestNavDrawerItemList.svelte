<script>
  import List, { Graphic, Item, Separator, Subheader, Text } from '@smui/list';
  import { navigate } from 'svelte-routing';
</script>

<List>
  <Subheader tag="h6">레시피</Subheader>
  <Item on:click on:click={() => navigate('/recipes')}>
    <Graphic class="material-icons" aria-hidden="true">menu_book</Graphic>
    <Text>레시피 조회</Text>
  </Item>
  <Separator />
  <Subheader tag="h6">사용자</Subheader>
  <Item on:click on:click={() => navigate('/login')}>
    <Graphic class="material-icons" aria-hidden="true">login</Graphic>
    <Text>로그인</Text>
  </Item>
  <Item on:click on:click={() => navigate('/signup')}>
    <Graphic class="material-icons" aria-hidden="true">person_add</Graphic>
    <Text>회원가입</Text>
  </Item>
</List>

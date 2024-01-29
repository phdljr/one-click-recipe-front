<script>
  import List, { Graphic, Item, Separator, Subheader, Text } from '@smui/list';
  import { deleteCookie } from 'svelte-cookie';
  import { navigate } from 'svelte-routing';
  import { auth } from '../../../store/user';
  import { REFRESH_TOKEN } from './../../../lib/const/jwt.js';

  const handleLogout = () => {
    deleteCookie(REFRESH_TOKEN);
    auth.clearAccessToken();
    navigate('/');
  };
</script>

<List>
  <Subheader tag="h6">사용자</Subheader>
  <Item on:click on:click={handleLogout}>
    <Graphic class="material-icons" aria-hidden="true">logout</Graphic>
    <Text>로그아웃</Text>
  </Item>
  <Item on:click on:click={() => navigate('/mypage')}>
    <Graphic class="material-icons" aria-hidden="true">person</Graphic>
    <Text>마이페이지</Text>
  </Item>
  <Item on:click on:click={() => navigate('/mypage/order-list')}>
    <Graphic class="material-icons" aria-hidden="true">fact_check</Graphic>
    <Text>주문 목록 조회</Text>
  </Item>
  <Item on:click on:click={() => navigate('/mypage/like-list')}>
    <Graphic class="material-icons" aria-hidden="true">favorite</Graphic>
    <Text>좋아요 목록 조회</Text>
  </Item>
  <Item on:click>
    <Graphic class="material-icons" aria-hidden="true">follow_the_signs</Graphic
    >
    <Text>팔로우 조회</Text>
  </Item>

  <Separator />
  <Subheader tag="h6">레시피</Subheader>
  <Item on:click on:click={() => navigate('/recipes')}>
    <Graphic class="material-icons" aria-hidden="true">menu_book</Graphic>
    <Text>레시피 조회</Text>
  </Item>
  <Item on:click on:click={() => navigate('/recipe-create')}>
    <Graphic class="material-icons" aria-hidden="true">edit_document</Graphic>
    <Text>레시피 생성</Text>
  </Item>
</List>

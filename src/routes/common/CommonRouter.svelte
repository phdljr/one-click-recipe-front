<!-- 로그인/비로그인 모든 회원을 위한 라우터 -->

<script>
  import { Route } from 'svelte-routing';

  import MainPage from '../../pages/MainPage.svelte';
  import NotFoundPage from '../../pages/error/NotFoundPage.svelte';
  import RecipeAllPage from '../../pages/recipe/RecipeAllPage.svelte';
  import RecipePage from '../../pages/recipe/RecipePage.svelte';
  import KakaoLoginPage from '../../pages/user/KakaoLoginPage.svelte';
</script>

<Route path="/" component={MainPage} />
<Route path="/recipes" component={RecipeAllPage} />
<Route path="/recipes/:recipeId" component={RecipePage} />
<Route path="/login/kakao" component={KakaoLoginPage} />
<Route component={NotFoundPage} />

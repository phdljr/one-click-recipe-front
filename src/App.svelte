<script>
  import { Route, Router } from 'svelte-routing';
  import MainPage from './pages/MainPage.svelte';
  import NotFoundPage from './pages/error/NotFoundPage.svelte';
  import ApprovalPaymentPage from './pages/kakaopay/ApprovalPaymentPage.svelte';
  import CancelPaymentPage from './pages/kakaopay/CancelPaymentPage.svelte';
  import FailPaymentPage from './pages/kakaopay/FailPaymentPage.svelte';
  import OrderDetailPage from './pages/order/OrderDetailPage.svelte';
  import OrderListPage from './pages/order/OrderListPage.svelte';
  import OrderPage from './pages/order/OrderPage.svelte';
  import RecipeAllPage from './pages/recipe/RecipeAllPage.svelte';
  import RecipeCreatePage from './pages/recipe/RecipeCreatePage.svelte';
  import RecipePage from './pages/recipe/RecipePage.svelte';
  import LoginPage from './pages/user/LoginPage.svelte';
  import MyPage from './pages/user/MyPage.svelte';
  import SignUpPage from './pages/user/SignUpPage.svelte';
</script>

<Router>
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/signup" component={SignUpPage} />
  <Route path="/recipes" component={RecipeAllPage} />
  <Route path="/recipes/:recipeId" component={RecipePage} />
  <Route path="/order" component={OrderPage} />
  <Route path="/order-list" component={OrderListPage} />
  <Route path="/order-detail/:orderId" component={OrderDetailPage} />
  <Route path="/mypage" component={MyPage} />
  <Route path="/recipe-create" component={RecipeCreatePage} />
  <Route
    path="/orders/:orderId/payment/kakao/approve"
    component={ApprovalPaymentPage}
  />
  <Route path="/payment/kakao/cancel" component={CancelPaymentPage} />
  <Route path="/payment/kakao/fail" component={FailPaymentPage} />
  <Route component={NotFoundPage} />
</Router>

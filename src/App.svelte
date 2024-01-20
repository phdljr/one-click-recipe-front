<script>
  import { Route, Router } from 'svelte-routing';
  import MainPage from './pages/MainPage.svelte';
  import NotFoundPage from './pages/error/NotFoundPage.svelte';
  import ApprovalPaymentPage from './pages/kakaopay/ApprovalPaymentPage.svelte';
  import RecipeAllPage from './pages/recipe/RecipeAllPage.svelte';
  import RecipePage from './pages/recipe/RecipePage.svelte';
  import LoginPage from './pages/user/LoginPage.svelte';
  import SignUpPage from './pages/user/SignUpPage.svelte';
  import OrderPage from './pages/order/OrderPage.svelte';
  import OrderListPage from './pages/order/OrderListPage.svelte';
</script>

<Router>
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/signup" component={SignUpPage} />
  <Route path="/recipes" component={RecipeAllPage} />
  <Route path="/recipes/:recipeId" component={RecipePage} />
  <Route path="/order" component={OrderPage} />
  <Route path="/orderList" component={OrderListPage} />
  <Route
    path="/orders/:orderId/payment/kakao/approve"
    component={ApprovalPaymentPage}
  />
  <Route component={NotFoundPage} />
</Router>

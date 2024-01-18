<script>
  import { Route, Router } from 'svelte-routing';
  import MainPage from './pages/MainPage.svelte';
  import ApprovalPaymentPage from './pages/kakaopay/ApprovalPaymentPage.svelte';
  import NotFoundPage from './pages/notfound/NotFoundPage.svelte';
  import RecipePage from './pages/recipe/RecipePage.svelte';
  import LoginPage from './pages/user/LoginPage.svelte';
  import SignUpPage from './pages/user/SignUpPage.svelte';
</script>

<Router>
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/signup" component={SignUpPage} />
  <Route path="/recipes" component={RecipePage} />
  <Route
    path="/orders/:orderId/payment/kakao/approve"
    component={ApprovalPaymentPage}
  />
  <Route component={NotFoundPage} />
</Router>

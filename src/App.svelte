<script>
  import { Route, Router } from 'svelte-routing';
  import MainPage from './pages/MainPage.svelte';
  import ApprovalPaymentPage from './pages/kakaopay/ApprovalPaymentPage.svelte';
  import MountPage from './pages/test/MountPage.svelte';
  import TestPage from './pages/test/TestPage.svelte';
  import LoginPage from './pages/user/LoginPage.svelte';
</script>

<Router>
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
  <Route
    path="/orders/:orderId/payment/kakao/approve"
    component={ApprovalPaymentPage}
  />
  <!-- ////////////////////////////////// -->
  <Route path="/mount" component={MountPage} />
  <Route path="/order/:orderId/test" component={TestPage} />
</Router>

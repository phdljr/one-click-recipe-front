<!-- 일반 유저를 위한 라우터 -->
<script>
  import { Route } from 'svelte-routing';
  import ApprovalPaymentPage from '../../pages/kakaopay/ApprovalPaymentPage.svelte';
  import CancelPaymentPage from '../../pages/kakaopay/CancelPaymentPage.svelte';
  import FailPaymentPage from '../../pages/kakaopay/FailPaymentPage.svelte';
  import LikeListPage from '../../pages/like/LikeListPage.svelte';
  import OrderDetailPage from '../../pages/order/OrderDetailPage.svelte';
  import OrderListPage from '../../pages/order/OrderListPage.svelte';
  import OrderPage from '../../pages/order/OrderPage.svelte';
  import RecipeCreatePage from '../../pages/recipe/RecipeCreatePage.svelte';
  import MyPage from '../../pages/user/MyPage.svelte';
</script>

<Route path="/recipe-create" component={RecipeCreatePage} />
<Route path="/order" component={OrderPage} />
<Route path="/order-detail/:orderId" component={OrderDetailPage} />
<Route path="/mypage" component={MyPage} />
<Route path="/mypage/order-list" component={OrderListPage} />
<Route path="/mypage/like-list" component={LikeListPage} />
<Route
  path="/orders/:orderId/payment/kakao/approve"
  component={ApprovalPaymentPage}
/>
<Route path="/payment/kakao/cancel" component={CancelPaymentPage} />
<Route path="/payment/kakao/fail" component={FailPaymentPage} />

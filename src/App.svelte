<script>
  import { onMount } from 'svelte';
  import { REFRESH_TIME } from './lib/const/jwt';

  import MainRouter from './routes/MainRouter.svelte';
  import { auth, isRefresh } from './store/user';
  // refresh 요청 반복적으로 보내는 작업
  // 해당 컴포넌트가 mount되기 전에 실행되는 함수
  onMount(() => {
    const onRefresh = setInterval(() => {
      if ($isRefresh) {
        auth.refresh();
      } else {
        clearInterval(onRefresh);
      }
    }, REFRESH_TIME);
  });
</script>

<!-- 
  라우터
  주소창에 URL을 입력 시, 정해진 컴포넌트에 접근할 수 있게 해주는 역할(필터같은 역할).
  사용자의 역할과 로그인/비로그인 상태에 따라 화면을 달리 보여줄 필요가 있음
  해당 서비스는 로그인과 비로그인으로 나뉘며, 로그인에서는 일반 유저와 관리자로 나뉨
 -->
<MainRouter />

<!-- <Router>
  <Route path="/" component={MainPage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/login/kakao" component={KakaoLoginPage} />
  <Route path="/signup" component={SignUpPage} />
  <Route path="/recipes" component={RecipeAllPage} />
  <Route path="/recipes/:recipeId" component={RecipePage} />
  <Route path="/order" component={OrderPage} />
  <Route path="/order-list" component={OrderListPage} />
  <Route path="/order-detail/:orderId" component={OrderDetailPage} />
  <Route path="/mypage" component={MyPage} />
  <Route path="/recipe-create" component={RecipeCreatePage} />
  <Route path="/admin" component={AdminPage} />
  <Route path="/foods" component={FoodAllPage} />
  <Route path="/admin/users" component={AdminUsersPage} />
  <Route path="/admin/orders/:userId" component={AdminOrdersPage} />
  <Route path="/mypage/like-list" component={LikeListPage} />
  <Route
    path="/orders/:orderId/payment/kakao/approve"
    component={ApprovalPaymentPage}
  />
  <Route path="/payment/kakao/cancel" component={CancelPaymentPage} />
  <Route path="/payment/kakao/fail" component={FailPaymentPage} />
  <Route component={NotFoundPage} />
</Router> -->

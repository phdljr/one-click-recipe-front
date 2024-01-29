<!-- 관리자를 위한 라우터 -->

<script>
  import { Route } from 'svelte-routing';
  import AdminOrdersPage from '../../pages/admin/AdminOrdersPage.svelte';
  import AdminPage from '../../pages/admin/AdminPage.svelte';
  import AdminUsersPage from '../../pages/admin/AdminUsersPage.svelte';
  import FoodAllPage from '../../pages/food/FoodAllPage.svelte';
</script>

<Route path="/admin" component={AdminPage} />
<Route path="/admin/foods" component={FoodAllPage} />
<Route path="/admin/users" component={AdminUsersPage} />
<Route path="/admin/orders/:userId" component={AdminOrdersPage} />

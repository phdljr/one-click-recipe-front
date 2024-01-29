<!-- 로그인된 회원을 위한 라우터 -->

<script>
  import { ADMIN } from '../../lib/const/user-rols';
  import { auth } from '../../store/user';
  import AdminRouter from './AdminRouter.svelte';

  import UserRouter from './UserRouter.svelte';
</script>

<UserRouter />
{#if $auth.role === ADMIN}
  <AdminRouter />
{/if}

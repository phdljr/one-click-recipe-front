<script>
  import Card, {
    ActionIcons,
    Actions,
    Content,
    Media,
    PrimaryAction,
  } from '@smui/card';
  import { navigate } from 'svelte-routing';
  import HOST from '../../lib/host';
  import { auth, isLogin } from '../../store/user';

  export let recipe;
  export let liked = false;

  async function toggleLike() {
    if (!$isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }

    const method = liked ? 'DELETE' : 'POST';
    liked = !liked;

    try {
      const response = await fetch(
        `${HOST}/api/v1/recipes/${recipe.id}/likes`,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: $auth.Authorization,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      recipe.likeCount += liked ? 1 : -1;
    } catch (error) {
      console.error('Error updating like status:', error);
      liked = !liked;

      alert('좋아요 상태를 변경하는 데 실패했습니다.');
    }
  }
</script>

<div class="container">
  <Card>
    <PrimaryAction on:click={() => navigate(`/recipes/${recipe.id}`)}>
      <Media
        class="card-media-16x9"
        aspectRatio="16x9"
        style="background-image: url({recipe.imageUrl})"
      />
      <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
          {recipe.title}
        </h2>
        <h3
          class="mdc-typography--subtitle2"
          style="margin: 0 0 10px; color: #888;"
        >
          {recipe.serving}인분
        </h3>
        {recipe.intro}
      </Content>
    </PrimaryAction>
    <Actions>
      <span class="writer">
        {recipe.writer}
      </span>
      <ActionIcons>
        <span class="like_count">
          {recipe.likeCount}
        </span>
        <button
          on:click={toggleLike}
          aria-label="Add to favorites"
          title="Add to favorites"
        >
          {#if liked}
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d9f7600f50823d72baaf50d03574a80c82377d898f89bc9faa5a053366b95c0?"
              class="like-img"
              alt=""
            />
          {:else}
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ff117ff108af49770015cb69ac2d18bf764d4ea8da4cbfd81705a20ed6664f1?"
              class="like-img"
              alt=""
            />
          {/if}
        </button>
      </ActionIcons>
    </Actions>
  </Card>
</div>

<style>
  .writer {
    color: rgb(0, 0, 0);
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  .like-img {
    aspect-ratio: 1.11;
    object-fit: contain;
    object-position: center;
    width: 20px;
  }
</style>

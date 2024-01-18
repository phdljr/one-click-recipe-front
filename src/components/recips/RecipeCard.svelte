<script>
  import Card, {
    ActionIcons,
    Actions,
    Content,
    Media,
    PrimaryAction,
  } from '@smui/card';
  import IconButton, { Icon } from '@smui/icon-button';

  export let recipe;

  let clicked = 0;
</script>

<div class="container">
  <Card>
    <PrimaryAction on:click={() => clicked++}>
      <Media class="card-media-16x9" aspectRatio="16x9" />
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
      <span>
        {recipe.serving}인분
      </span>
      <ActionIcons>
        <IconButton
          on:click={() => clicked++}
          toggle
          aria-label="Add to favorites"
          title="Add to favorites"
        >
          <Icon class="material-icons" on>favorite</Icon>
          <Icon class="material-icons">favorite_border</Icon>
        </IconButton>
      </ActionIcons>
    </Actions>
  </Card>
</div>

<style>
</style>

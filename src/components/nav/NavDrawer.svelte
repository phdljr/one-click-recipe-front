<script>
  import Drawer, {
    Content,
    Header,
    Scrim,
    Subtitle,
    Title,
  } from '@smui/drawer';
  import IconButton from '@smui/icon-button';
  import List, { Graphic, Item, Separator, Subheader, Text } from '@smui/list';

  let open = false;
  let active = 'Inbox';

  function setActive(value) {
    active = value;
    open = false;
  }
</script>

<Drawer variant="modal" fixed={true} bind:open>
  <Header>
    <Title>딸깍! 레시피</Title>
    <Subtitle>클릭 한 번의 묘미</Subtitle>
  </Header>
  <Separator />
  <Content>
    <List>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Inbox')}
        activated={active === 'Inbox'}
      >
        <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
        <Text>Inbox</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Star')}
        activated={active === 'Star'}
      >
        <Graphic class="material-icons" aria-hidden="true">star</Graphic>
        <Text>Star</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Sent Mail')}
        activated={active === 'Sent Mail'}
      >
        <Graphic class="material-icons" aria-hidden="true">send</Graphic>
        <Text>Sent Mail</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Drafts')}
        activated={active === 'Drafts'}
      >
        <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
        <Text>Drafts</Text>
      </Item>

      <Separator />
      <Subheader tag="h6">Labels</Subheader>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Family')}
        activated={active === 'Family'}
      >
        <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
        <Text>Family</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Friends')}
        activated={active === 'Friends'}
      >
        <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
        <Text>Friends</Text>
      </Item>
      <Item
        href="javascript:void(0)"
        on:click={() => setActive('Work')}
        activated={active === 'Work'}
      >
        <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
        <Text>Work</Text>
      </Item>
    </List>
  </Content>
</Drawer>

<Scrim />
<div class="drawer-btn">
  <IconButton class="material-icons" on:click={() => (open = !open)}
    >menu</IconButton
  >
</div>

<style>
  .drawer-btn {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>

<script>
  import Button, { Label } from '@smui/button';
  import Drawer, {
    AppContent,
    Content,
    Header,
    Scrim,
    Subtitle,
    Title,
  } from '@smui/drawer';
  import List, { Graphic, Item, Separator, Subheader, Text } from '@smui/list';

  let open = false;
  let active = 'Inbox';

  function setActive(value) {
    active = value;
    open = false;
  }
</script>

<h1>테스트</h1>

<Drawer variant="modal" fixed={false} bind:open>
  <Header>
    <Title>Super Mail</Title>
    <Subtitle>It's the best fake mail app drawer.</Subtitle>
  </Header>
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

<!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
<Scrim fixed={false} />
<AppContent class="app-content">
  <main class="main-content">
    <Button on:click={() => (open = !open)}>
      <Label>Toggle Drawer</Label>
    </Button>
    <br />
    <pre class="status">Active: {active}</pre>
    <div style="height: 700px;">&nbsp;</div>
    And some stuff at the bottom.
  </main>
</AppContent>

<style>
  /* These classes are only needed because the
    drawer is in a container on the page. */

  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
</style>

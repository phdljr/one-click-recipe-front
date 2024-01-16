<script>
  import Accordion, { Content, Header, Panel } from '@smui-extra/accordion';
  import { Link } from 'svelte-routing';
  import PayButton from '../components/PayButton.svelte';
</script>

<h1>딸깍! 레시피</h1>
<PayButton />
<Link to="/login"><button>로그인</button></Link>
<Link to="/mount"><button>onMount 테스트</button></Link>
<Link to="/order/1/test"><button>path variable 테스트</button></Link>
<Accordion>
  <Panel>
    <Header>Panel 1</Header>
    <Content>
      The content for panel 1.

      <ul>
        <li>Some</li>
        <li>List</li>
        <li>Items</li>
      </ul>
    </Content>
  </Panel>
  <Panel>
    <Header>Panel 2</Header>
    <Content>The content for panel 2.</Content>
  </Panel>
  <Panel>
    <Header>Panel 3</Header>
    <Content>
      The content for panel 3.

      <ul>
        <li>Some</li>
        <li>More</li>
        <li>List</li>
        <li>Items</li>
        <li>To</li>
        <li>Show</li>
        <li>Big</li>
        <li>Height</li>
      </ul>
    </Content>
  </Panel>
  <Panel>
    <Header>Panel 4</Header>
    <Content>
      If you like this component, you can thank <a
        href="https://github.com/NickantX"
        target="_blank">nick</a
      > who pushed me to make it. He was right, accordions are awesome! :D
    </Content>
  </Panel>
</Accordion>

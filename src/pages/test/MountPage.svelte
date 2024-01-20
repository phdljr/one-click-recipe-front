<script>
  import { onMount } from 'svelte';

  let isSuccess = null;

  onMount(() =>
    setTimeout(() => {
      isSuccess = true;
    }, 3000),
  );

  const handleTest = () => {
    isSuccess = false;
  };
</script>

<button on:click={handleTest}>false로 만들기</button>

{#if isSuccess === null}
  <h1>로딩중...</h1>
{:else if isSuccess === true}
  <h1>로딩 성공</h1>
{:else}
  <h1>로딩 실패</h1>
{/if}

<script>
  let count = 0
  const increment = () => {
    count += 3
  }
</script>

<button on:click={increment}>
  count is {count}
</button>

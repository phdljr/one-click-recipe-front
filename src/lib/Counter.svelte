<script>
  let test = null;
  const getTest = () => {
    fetch("http://localhost:8080/api/v1/test/1")
    .then(res => res.json())
    .then(data => test = data)
  }
</script>

<button on:click={getTest}>
  {test}
</button>

<script>
  let test = {};
  const getTest = () => {
    fetch('http://localhost:8080/api/v1/tests/1', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        test = data;
      });
  };
</script>

<button on:click={getTest}>
  {test.name}
  {test.age}
</button>

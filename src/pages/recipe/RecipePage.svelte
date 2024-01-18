<script>
  import { onMount } from 'svelte';
  import HOST from '../../lib/host';

  export let recipeId;

  let recipe = {};
  let reviews = [];
  let recipeFoods = [];
  let recipeProcesses = [];

  onMount(() => {
    // getRecipe();
    getReviews();
  });

  const getRecipe = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        recipe = data;
      });
  };

  const getReviews = () => {
    fetch(HOST + `/api/v1/recipes/${recipeId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        reviews = data;
      });
  };
</script>

<h1>{recipeId}</h1>

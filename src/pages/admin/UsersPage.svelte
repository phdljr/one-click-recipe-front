<script>
  let allUsers = [
    { id: 1, name: '배규태', role: 'USER' },
    { id: 2, name: '고도윤', role: 'ADMIN' },
    { id: 3, name: '이종렬', role: 'USER' },
    { id: 4, name: '박창선', role: 'USER' },
  ];

  function changeUserRole(userId, newRole) {
    console.log(`Changing role of user ${userId} to ${newRole}`);
    alert(`'${userId}' 사용자의 역할이 '${newRole}'(으)로 변경되었습니다!`);
  }
</script>

<body>
  <div class="container">
    <ul>
      {#each allUsers as user}
        <li>
          <div class="user-info">
            <span class="user-role">{user.role}</span>
            {user.name}
          </div>
          <div>
            <select bind:value={user.newRole}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button on:click={() => changeUserRole(user.id, user.newRole)}
              >변경</button
            >
          </div>
        </li>
      {/each}
    </ul>
  </div>
</body>

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 20px;
  }

  .container {
    width: 100%;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background-color: #6200ee;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    background-color: #7638cf;
  }

  select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .user-info {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .user-role {
    width: 80px;
    margin-right: 10px;
    text-align: center;
  }

  select,
  button {
    margin-left: 10px;
  }
</style>

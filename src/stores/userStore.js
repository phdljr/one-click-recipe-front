import { writable } from 'svelte/store';
import { getCookie } from 'svelte-cookie';
const HOST = 'http://localhost:8080';

function createUserStore() {
  const { subscribe, set } = writable([]);

  async function fetchUsers() {
    try {
      const response = await fetch(HOST + '/api/v1/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('Authorization'),
        },
      });

      if (!response.ok) {
        console.error(
          '유저 목록을 가져오는 데 실패했습니다: ',
          response.status,
          response.statusText,
        );
        return;
      }

      const data = await response.json();
      set(data);
    } catch (error) {
      console.error('유저 목록을 가져오는 중 오류가 발생했습니다: ', error);
    }
  }

  return {
    subscribe,
    fetchUsers,
  };
}

export const userStore = createUserStore();

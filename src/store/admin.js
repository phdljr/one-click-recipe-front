import { get, writable } from 'svelte/store';
import HOST from '../lib/host';
import { auth } from './user';

function createUserStore() {
  const { subscribe, set, update } = writable([]);

  async function fetchUsers() {
    try {
      const response = await fetch(HOST + '/api/v1/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: get(auth).Authorization,
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

  async function changeUserRole(userId, newRole) {
    try {
      const response = await fetch(
        `${HOST}/api/v1/admin/users/${userId}/role`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: get(auth).Authorization,
          },
          body: JSON.stringify({ role: newRole }),
        },
      );

      if (response.ok) {
        update((users) => {
          return users.map((user) => {
            if (user.id === userId) {
              return { ...user, role: newRole };
            }
            return user;
          });
        });
        alert('역할이 변경되었습니다.');
      } else {
        alert('역할 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('역할 변경 중 오류가 발생했습니다: ', error);
    }
  }

  async function fetchUserOrders(userId) {
    try {
      const response = await fetch(
        `${HOST}/api/v1/admin/users/${userId}/orders`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: get(auth).Authorization,
          },
        },
      );

      if (!response.ok) {
        console.error(
          '주문 목록을 가져오는 데 실패했습니다:',
          response.status,
          response.statusText,
        );
        return [];
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('주문 목록을 가져오는 중 오류가 발생했습니다:', error);
      return [];
    }
  }

  async function fetchUserOrderDetails(userId, orderId) {
    try {
      const response = await fetch(
        `${HOST}/api/v1/admin/users/${userId}/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: get(auth).Authorization,
          },
        },
      );

      if (!response.ok) {
        console.error(
          '주문 상세 정보를 가져오는 데 실패했습니다: ',
          response.status,
          response.statusText,
        );
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(
        '주문 상세 정보를 가져오는 중 오류가 발생했습니다: ',
        error,
      );
      return null;
    }
  }

  return {
    subscribe,
    fetchUsers,
    changeUserRole,
    fetchUserOrders,
    fetchUserOrderDetails,
  };
}

export const userStore = createUserStore();

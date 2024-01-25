import { writable } from 'svelte/store';
import { jwtDecode } from 'jwt-decode';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

function isAdminUser() {
  const token = getCookie('Authorization');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === 'ADMIN';
  } catch (error) {
    console.error('JWT 디코딩 중 오류 발생: ', error);
    return false;
  }
}

function createUserStore() {
  const { subscribe, set } = writable([]);

  async function fetchUsers() {
    if (!isAdminUser()) {
      console.error('권한 없음: ADMIN 역할이 필요합니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('Authorization')}`,
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

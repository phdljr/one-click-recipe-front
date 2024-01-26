import { deleteCookie, getCookie } from "svelte-cookie";
import { derived, writable } from "svelte/store";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/const/jwt";
import HOST from "../lib/host";

const setAuth = () => {
  let Authorization = null;

  const { subscribe, set, update } = writable("");

  const setAccessToken = (accessToken) => {
    set(accessToken);
    isRefresh.set(true);
  }

  const clearAccessToken = () => {
    set('');
    isRefresh.set(false);
  }

  const refresh = async () => {
    if (getCookie(REFRESH_TOKEN) == '') {
      return;
    }
    console.log("엑세스 토큰 재요청");
    try {
      const response =
        await fetch(HOST + "/api/v1/users/refresh", {
          method: 'POST',
          headers: {
            Authorization: getCookie(REFRESH_TOKEN),
          },
          credentials: 'same-origin'
        });
      if (response.status >= 400 && response.status < 600) {
        throw response;
      }
      set(response.headers.get(ACCESS_TOKEN));
      isRefresh.set(true);
    } catch (error) {
      console.log("리프레시 토큰 비정상")
      auth.resetUserInfo();
      // 리프레시 토큰이 비정상 -> 더 이상 refresh 호출 x
      isRefresh.set(false);
      deleteCookie(REFRESH_TOKEN);
    }
  }

  const resetUserInfo = () => set('');

  return {
    subscribe,
    setAccessToken,
    clearAccessToken,
    refresh,
    resetUserInfo
  }
}

const setIsLogin = () => {
  const checkLogin = derived(auth, $auth => $auth != '' ? true : false);
  return checkLogin;
}

export const auth = setAuth();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);
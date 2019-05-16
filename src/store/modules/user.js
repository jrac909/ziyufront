import { login } from '@/api/login';
import * as SessionStorageUtil from '@/utils/auth';
import * as WebsocketUtil from '@/utils/websocketutil';

const user = {
  state: {
    token: SessionStorageUtil.getToken(),
    id: SessionStorageUtil.getUserId(),
    username: SessionStorageUtil.getUsername(),
    photo: SessionStorageUtil.getUserPhoto(),
    nickname: SessionStorageUtil.getUserNickname(),
    role: SessionStorageUtil.getUserRole(),
    websocket: {}
  },

  mutations: {
  	SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_Websocket: (state, websocket) => {
      state.websocket = websocket
    }
  },

  actions: {
  	// 登录
    Login({ commit, state }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          /* 验证账号密码这里只返回一个 token 值 */
          const user = response.data;
          /* 把 Token 值存进 Cookies */
          SessionStorageUtil.setToken(user.userToken);
          SessionStorageUtil.setUsername(user.userAccount);
          SessionStorageUtil.setUserId(user.userId);
          SessionStorageUtil.setUserPhoto(user.userPhoto);
          SessionStorageUtil.setUserNickname(user.userNickname);
          SessionStorageUtil.setUserRole(user.userRole);
          /* 现在 store 的 state 也把 token 存下来了 */
          commit('SET_ID', user.userId);
          commit('SET_TOKEN', user.userToken);
          commit('SET_NAME', username);
          commit('SET_PHOTO', user.userPhoto);
          commit('SET_NICKNAME', user.userNickname);
          commit('SET_ROLE', user.userRole);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出登录，将sessionstorage中的token移除
    Checkout({ commit, state}){
      return new Promise((resolve, reject) => {
        SessionStorageUtil.removeToken();
        resolve();
      });
    },
    InitWebsocket({commit, state}, id){
      return new Promise((resolve, reject) => {
            /*WebsocketUtil.initWebSocket(id);*/
            commit('SET_Websocket', WebsocketUtil.initWebSocket(id));
            resolve();
          });
    }
  }

}

export default user
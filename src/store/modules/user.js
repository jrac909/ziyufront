import { login } from '@/api/login';
import { getToken, setToken, getUserId, setUserId, getUsername, setUsername, getUserPhoto, setUserPhoto, getUserNickname, setUserNickname, getUserRole, setUserRole} from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    id: getUserId(),
    username: getUsername(),
    photo: getUserPhoto(),
    nickname: getUserNickname(),
    role: getUserRole()
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
          setToken(user.userToken);
          setUsername(user.userAccount);
          setUserId(user.userId);
          setUserPhoto(user.userPhoto);
          setUserNickname(user.userNickname);
          setUserRole(user.userRole);
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
    }
  }

}

export default user
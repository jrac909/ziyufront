const getters = {
  token: state => state.user.token,
  id: state => state.user.id,
  username: state => state.user.username,
  photo: state => state.user.photo,
  nickname: state => state.user.nickname,
  role: state => state.user.role
}
export default getters
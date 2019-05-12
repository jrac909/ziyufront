import Cookies from 'js-cookie'

const TokenKey = 'ziyu_token';
const UserIdKey = 'ziyu_user_id';
const UserNameKey = 'ziyu_user_name';
const UserPhotoKey = 'ziyu_user_photo';
const UserNicknameKey = 'ziyu_user_nickname';
const UserRoleKey = 'ziyu_user_role';

export function getToken() {
	return JSON.parse(sessionStorage.getItem(TokenKey));
}

export function setToken(token) {
  
  return sessionStorage.setItem(TokenKey, JSON.stringify(token));
}

export function getUserId() {
	return JSON.parse(sessionStorage.getItem(UserIdKey));
}

export function setUserId(id) {
  
  return sessionStorage.setItem(UserIdKey, JSON.stringify(id));
}
export function getUsername() {
	return JSON.parse(sessionStorage.getItem(UserNameKey));
}

export function setUsername(username) {
  
  return sessionStorage.setItem(UserNameKey, JSON.stringify(username));
}

export function getUserPhoto() {
	return JSON.parse(sessionStorage.getItem(UserPhotoKey));
}

export function setUserPhoto(photo) {
  
  return sessionStorage.setItem(UserPhotoKey, JSON.stringify(photo));
}

export function getUserNickname() {
	return JSON.parse(sessionStorage.getItem(UserNicknameKey));
}

export function setUserNickname(nickname) {
  
  return sessionStorage.setItem(UserNicknameKey, JSON.stringify(nickname));
}

export function getUserRole() {
	return JSON.parse(sessionStorage.getItem(UserRoleKey));
}

export function setUserRole(role) {
  
  return sessionStorage.setItem(UserRoleKey, JSON.stringify(role));
}
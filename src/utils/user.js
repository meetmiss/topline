const USER_KEY = 'user'
export const saveUser = data => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}

const getItem = (key) => {
  return localStorage.getItem(key)
}

const setItem = (key, val) => {
  return localStorage.setItem(key, val)
}

const removeItem = (key) => {
  return localStorage.removeItem(key)
}

const clear = () => {
  return localStorage.clear()
}

export const StorageService = {
  getItem,
  setItem,
  removeItem,
  clear
}

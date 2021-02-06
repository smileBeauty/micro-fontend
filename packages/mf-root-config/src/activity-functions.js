export function platform (location) {
  // The platform is always active
  return true
}

export function mfApplicationUser (location) {
  return location.href.includes('user')
}
export function mfApplicationCustomer (location) {
  return location.href.includes('customer')
}

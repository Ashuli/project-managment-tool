
import Color from 'color'
import { userInfoService } from './services/storageService'

export function partition(array, n) {
  const copy = array.slice()
  return copy.length ? [copy.splice(0, n)].concat(partition(copy, n)) : []
}
export function capitilize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

export function getUserRole() {
  const user = userInfoService.getUser()
  return user ? user.role : ''
}

export const tuneColor = {
  /* eslint-disable implicit-arrow-linebreak */
  darken: (colorValue, amount) =>
    Color(colorValue)
      .darken(amount)
      .string(),
  lighten: (colorValue, amount) =>
    Color(colorValue)
      .lighten(amount)
      .string(),
}

export const buttonVariants = {
  primary: '#db4733', //  
  success: '#0B875B', //  
  danger: '#E13C3C',
  warning: '#F89C1C',
  info: '#0fb9b1',
  secondary: '#F4F5F7', //  1b1f3c
  brand: '#1b1f3c', //  
}

export function responseFields(attributes) {
  let attrs = ''
  if (attributes.length) {
    attributes.forEach(attr => {
      attrs += `${attr.id},`
    });
  }
  return attrs
}

export function isValidEmail(value) {
  return /.+@.+\..+/.test(value)
}

export function isRequired(value) {
  return ['', null, undefined].indexOf(value) === -1
}

export function strongPassword(value) {
  return (/[a-z]/.test(value) //MARK: checks for a-z
        && /[0-9]/.test(value) //MARK: checks for 0-9
        && /\W|_/.test(value) //MARK: checks for special char
        && /[A-Z]/.test(value) //MARK: checks for capital letterd
        && value.length >= 8)
}
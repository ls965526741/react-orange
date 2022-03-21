import { CHANGE, ADMINCHANGE } from '../content'
export const change = (data) => {
  return { type: CHANGE, data }
}
export const adminChange = (data) => {
  return { type: ADMINCHANGE, data }
}

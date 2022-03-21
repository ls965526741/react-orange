import { INITUSERINFO } from "../content"
const userInfo = localStorage.getItem('userInfo') === null
  ? {} : JSON.parse(localStorage.getItem('userInfo'))
const db = {
  userInfo
}
export default function user(prevState, action) {
  switch (action.type) {
    case INITUSERINFO:
      prevState.userInfo = action.data
      return { ...prevState }
    default:
      return db
  }
}

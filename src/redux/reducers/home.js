import { CHANGE, ADMINCHANGE } from '../content'
const path = window.location.pathname
let menuCurrent = []
let adminMenuCurrent = []
switch (path) {
  case "/divisional/ProjectList/1":
    menuCurrent = [path, '/divisional/ProjectList']
    break
  case "/divisional/ProjectList/2":
    menuCurrent = [path, '/divisional/ProjectList']
    break
  case "/divisional/ProjectList/3":
    menuCurrent = [path, '/divisional/ProjectList']
    break
  case "/divisional/ProjectList/4":
    menuCurrent = [path, '/divisional/ProjectList']
    break
  case "/divisional/ProjectTemplate":
    menuCurrent = [path, path]
    break
  case "/divisional/Message/1":
    menuCurrent = [path, '/divisional/Message']
    break
  case "/divisional/Message/2":
    menuCurrent = [path, '/divisional/Message']
    break
  case "/divisional/Message/3":
    menuCurrent = [path, '/divisional/Message']
    break
  default:
    menuCurrent = ['/divisional/ProjectList/1', '/divisional/ProjectList']
    break
}
switch (path) {
  case "/admin/UserManagement":
    adminMenuCurrent = [path]
    break
  case "/admin/roleManagement":
    adminMenuCurrent = [path]
    break
  case "/admin/menuManagement":
    adminMenuCurrent = [path]
    break
  case "/admin/permissionManagement":
    adminMenuCurrent = [path]
    break
  case "/admin/operationLogManagement":
    adminMenuCurrent = [path]
    break
  default:
    adminMenuCurrent = ['/admin/UserManagement']
    break
}
const db = { menuCurrent, adminMenuCurrent }
export default function home(prev, action) {
  const { type, data } = action
  switch (type) {
    case CHANGE:
      prev.menuCurrent = data
      return { ...prev }
    case ADMINCHANGE:
      prev.adminMenuCurrent = data
      return { ...prev }
    default:
      return db
  }
}
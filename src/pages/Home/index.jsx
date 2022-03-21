import React, { useState, useEffect } from 'react'
import './index.less'
import { Redirect, Route, useHistory, Link, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Dropdown, Button } from 'antd'
import {
  UserOutlined,
  PieChartOutlined,
  FileOutlined,
  DesktopOutlined,
  ContainerOutlined,
  TeamOutlined,
  SettingOutlined,
  GithubOutlined,
  BellOutlined,
  BorderInnerOutlined,
  UnorderedListOutlined,
  NodeExpandOutlined,
  ClockCircleOutlined,
  PoweroffOutlined
} from '@ant-design/icons'
import Workbench from '../Workbench'
import ProjectList from '../ProjectList'
import ProjectTemplate from '../ProjectTemplate'
import Message from '../Message'
import ProjectMgt from '../ProjectMgt'
import UserManagement from '../UserManagement'
import RoleManagement from '../RoleManagement'
import MenuManagement from '../MenuManagement'
import PermissionManagement from '../PermissionManagement'
import OperationLogManagement from '../OperationLogManagement'
import NotFound from '../NotFound'
import { connect } from 'react-redux'
import { change, adminChange } from '../../redux/actions/home'
import { initUserInfo } from '../../redux/actions/user'
import { getInfo } from '../../api/user'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu
const divisionalList = [
  {
    id: '/divisional/ProjectList',
    title: '项目列表',
    icon: <PieChartOutlined />,
    children: [
      { id: '/divisional/ProjectList/1', title: '全部列表', icon: <UserOutlined /> },
      { id: '/divisional/ProjectList/2', title: '我的收藏', icon: <UserOutlined /> },
      { id: '/divisional/ProjectList/3', title: '已归档项目', icon: <UserOutlined /> },
      { id: '/divisional/ProjectList/4', title: '回收站', icon: <UserOutlined /> }
    ]
  },
  { id: '/divisional/ProjectTemplate', title: '项目模板', icon: <FileOutlined /> },
  {
    id: '/divisional/Message',
    title: '消息提醒',
    icon: <UserOutlined />,
    children: [
      { id: '/divisional/Message/1', title: '@我', icon: <UserOutlined /> },
      { id: '/divisional/Message/2', title: '通知', icon: <UserOutlined /> },
      { id: '/divisional/Message/3', title: '私信', icon: <UserOutlined /> }
    ]
  }
]
const adminList = [
  { id: '/admin/UserManagement', title: '用户管理', icon: <UserOutlined /> },
  { id: '/admin/roleManagement', title: '角色管理', icon: <BorderInnerOutlined /> },
  { id: '/admin/menuManagement', title: '菜单管理', icon: <UnorderedListOutlined /> },
  { id: '/admin/permissionManagement', title: '资源管理', icon: <NodeExpandOutlined /> },
  { id: '/admin/operationLogManagement', title: '角色日志', icon: <ClockCircleOutlined /> }
]

const Home = ({ menuCurrent, adminMenuCurrent, change, adminChange, userInfo, initUserInfo }) => {
  const [collapsed, collapsedState] = useState(false)
  const history = useHistory()
  const path = history.location.pathname
  const headerPath = path.split('/')[1] === '' ? 'workbench' : path.split('/')[1]
  const [headerCurrent, headerCurrentState] = useState('/' + headerPath)
  const list = headerCurrent === '/divisional' ? divisionalList : adminList
  const siderCurrent =
    headerCurrent === '/divisional'
      ? menuCurrent
      : headerCurrent === '/admin'
      ? adminMenuCurrent
      : []
  const onCollapse = () => {
    collapsedState(!collapsed)
  }
  const getTitle = (() => {
    const title = []
    let count = -1
    const fun = (list) => {
      list.forEach((item) => {
        if (item.id === menuCurrent.slice(count)[0]) {
          title.push(item.title)
          if (item.children) {
            count--
            fun(item.children)
          }
        }
      })
    }
    fun(list)
    return title
  })()
  const siderHandleClick = (e) => {
    history.push(e.key)
    if (headerCurrent === '/divisional') {
      change(e.keyPath)
      // switch (e.key) {
      //   case '1':
      //     history.push('/divisional/ProjectList/1')
      //     break
      //   case '2':
      //     history.push('/divisional/ProjectList/2')
      //     break
      //   case '3':
      //     history.push('/divisional/ProjectList/3')
      //     break
      //   case '4':
      //     history.push('/divisional/ProjectList/4')
      //     break
      //   case '5':
      //     history.push('/divisional/ProjectTemplate')
      //     break
      //   case '7':
      //     history.push('/divisional/Message/1')
      //     break
      //   case '8':
      //     history.push('/divisional/Message/2')
      //     break
      //   case '9':
      //     history.push('/divisional/Message/3')
      //     break
      //   default:
      //     history.push('/divisional/ProjectList/1')
      // }
    }
    if (headerCurrent === '/admin') {
      adminChange(e.keyPath)
      // switch (e.key) {
      //   case '1':
      //     history.push('/admin/UserManagement')
      //     break
      //   case '2':
      //     history.push('/admin/roleManagement')
      //     break
      //   case '3':
      //     history.push('/admin/menuManagement')
      //     break
      //   case '4':
      //     history.push('/admin/permissionManagement')
      //     break
      //   case '5':
      //     history.push('/admin/operationLogManagement')
      //     break
      //   default:
      //     break
      // }
    }
  }
  async function reqUserInfo() {
    const { data } = await getInfo()
    initUserInfo(data.data)
    window.localStorage.setItem('userInfo', JSON.stringify(data.data))
  }
  const logOut = () => {
    localStorage.clear()
    window.location.reload(true)
  }

  useEffect(() => {
    reqUserInfo()
    return () => {
      collapsedState(collapsed)
      headerCurrentState(headerCurrent)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const menu = (
    <Menu>
      <Menu.Item onClick={() => history.push('/PersonalCenter')}>
        <UserOutlined /> 个人设置
      </Menu.Item>
      <Menu.Item onClick={logOut}>
        <PoweroffOutlined style={{ color: 'red' }} /> 退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="home">
      {localStorage.getItem('token') ? '' : <Redirect to="/login" />}
      <Layout style={{ height: '100%' }}>
        <Sider
          collapsible
          className={headerCurrent === '/divisional' || headerCurrent === '/admin' ? '' : 'is-show'}
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <div className="logo">
            <img src="/static/img/logo.png" alt="" />
            {collapsed ? '' : <h1>Orange </h1>}
          </div>
          <Menu
            onClick={siderHandleClick}
            theme="dark"
            defaultOpenKeys={siderCurrent.slice(-1)}
            selectedKeys={[siderCurrent[0]]}
            mode="inline"
          >
            {list.map((item) =>
              item.children ? (
                <SubMenu key={item.id} icon={item.icon} title={item.title}>
                  {item.children.map((childItem) => {
                    return (
                      <Menu.Item key={childItem.id} icon={childItem.icon}>
                        {' '}
                        {childItem.title}
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
              ) : (
                <Menu.Item key={item.id} icon={item.icon}>
                  {item.title}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <div
              className={
                headerCurrent === '/divisional' || headerCurrent === '/admin' ? 'is-show' : 'logo'
              }
            >
              <img src="/static/img/logo.png" alt="" />
              <h1 style={{ padding: '0 5px' }}>Orange</h1>
            </div>
            <Menu
              className="header-center"
              onClick={(e) => headerCurrentState(e.key)}
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={[headerCurrent]}
            >
              <Menu.Item key="/workbench">
                <Link to="/workbench">
                  <DesktopOutlined />
                  <span className="header-item">工作台</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/divisional">
                <Link to="/divisional">
                  <ContainerOutlined />
                  <span className="header-item">项目管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/project">
                <Link to="/project">
                  <TeamOutlined />
                  <span className="header-item">部门管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/admin">
                <Link to="/admin">
                  <SettingOutlined />
                  <span className="header-item">管理员配置</span>
                </Link>
              </Menu.Item>
            </Menu>
            <div className="header-right">
              <div></div>
              <div>
                <GithubOutlined />
              </div>
              <div>GitHub</div>
              <div>
                <TeamOutlined />
              </div>
              <div>
                <BellOutlined />
              </div>
              <div className="user-img">
                <img src={userInfo.avatar} alt="" />
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button type="text">{userInfo.username}</Button>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Breadcrumb style={{ margin: '16px' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>{getTitle[0]}</Breadcrumb.Item>
            <Breadcrumb.Item>{getTitle[1]}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{ margin: '0 16px 16px', minHeight: 280 }}
          >
            <Switch>
              <Redirect from="/" exact to="/workbench" />
              <Route path="/workbench" component={Workbench} />
              <Route path="/divisional" component={divisional} />
              <Route path="/project" component={ProjectMgt} />
              <Route path="/admin" component={AdminMgt} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

const divisional = function () {
  const pathname = window.location.pathname
  const path = pathname === '/divisional' ? '/divisional/ProjectList/1' : pathname
  return (
    <Switch>
      <Route path="/divisional/ProjectList/:id" component={ProjectList} />
      <Route path="/divisional/ProjectTemplate" component={ProjectTemplate} />
      <Route path="/divisional/Message/:id" component={Message} />
      <Redirect to={path} />
    </Switch>
  )
}
const AdminMgt = function () {
  const pathname = window.location.pathname
  const path = pathname === '/admin' ? '/admin/UserManagement' : pathname
  return (
    <Switch>
      <Route path="/admin/UserManagement" component={UserManagement} />
      <Route path="/admin/roleManagement" component={RoleManagement} />
      <Route path="/admin/menuManagement" component={MenuManagement} />
      <Route path="/admin/permissionManagement" component={PermissionManagement} />
      <Route path="/admin/operationLogManagement" component={OperationLogManagement} />
      <Redirect to={path} />
    </Switch>
  )
}

export default connect(
  (state) => ({
    menuCurrent: state.home.menuCurrent,
    adminMenuCurrent: state.home.adminMenuCurrent,
    userInfo: state.user.userInfo
  }),
  { change, adminChange, initUserInfo }
)(Home)

import React, { useEffect, useState } from 'react'
import './index.less'
import { Layout, Menu, Input, Button, List, Avatar, Popconfirm, Modal } from 'antd';
import {
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  BranchesOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  HighlightOutlined,
  DeleteOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { getList } from '../../api/departmentManagement'
import { getList as userList } from '../../api/user'
import { formatDate1 } from '../../utils'
const { Sider, Content } = Layout;

export default function ProjectMgt(props) {
  const [keyword, setKeyword] = useState('')
  const [currentMenu, setCurrentMenu] = useState('0')
  const [departmentList, setDepartmentList] = useState([{ id: '' }])
  const [tableList, setTableList] = useState([])
  const [createVisible, setCreateVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const memberMenuList = [
    { id: 0, icon: <TeamOutlined />, name: '所有成员' },
    { id: 1, icon: <UsergroupAddOutlined />, name: '新加入的成员' },
    { id: 2, icon: <UserOutlined />, name: '未分配部门的成员' },
    { id: 3, icon: <UsergroupDeleteOutlined />, name: '停用的成员' }
  ]
  const reqList = async () => {
    const { data } = await getList()
    setDepartmentList(data.data.rows)
  }
  const reqUserList = async () => {
    const params = {
      keyword,
      department_id: (currentMenu - 0) <= 3 ? currentMenu === '2' ? 0 : undefined : departmentList[currentMenu - 4]?.id,
      state: currentMenu === '3' ? 0 : null,
    };
    if (currentMenu === '1') {
      params.date_after_created = formatDate1()
    }
    const { data } = await userList(params)
    setTableList(data.data.rows)
  }
  function confirm(e) {
    console.log(e);
  }



  useEffect(() => {
    reqList()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    reqUserList()
    // props.history.push({
    //   pathname: '/project',
    //   state: {
    //     current: currentMenu
    //   }
    // })
  }, [currentMenu])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout className='pm'>
      <Sider
        theme='light'
        className='pm-sider'
      >
        <Input.Search placeholder="输入用户名/邮箱" onSearch={() => setKeyword()} enterButton />
        <div className='menu-header'>成员</div>
        <Menu
          onClick={e => setCurrentMenu(e.key)}
          selectedKeys={[currentMenu]}
          mode="inline"
        >
          {memberMenuList.map(item => (
            <Menu.Item key={item.id} icon={item.icon}>{item.name}</Menu.Item>
          ))}
          <div className='menu-header' key={12}>
            <span>部门</span>
            <Button onClick={() => setCreateVisible(true)} type="link" icon={<PlusCircleOutlined />}>创建部门</Button>
          </div>
          {departmentList.map((item, index) => (
            <Menu.Item key={index + 4} icon={<BranchesOutlined />}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content className='pm-content'>
        <div className='pm-content-item'>
          <div>
            {currentMenu < 4
              ? <span>{memberMenuList[currentMenu].name}</span>
              : <span>{departmentList[currentMenu - 4].name}</span>
            }
            <span> {tableList.length}</span>
          </div>
          {currentMenu > '3' ?
            <div>
              <Button onClick={() => setAddVisible(true)} type='link' icon={<UserAddOutlined />}>添加成员</Button>
              <Button onClick={() => setEditVisible(true)} type='link' icon={<HighlightOutlined />}>编辑部门</Button>
              <Button onClick={() => setRemoveVisible(true)} type='link' icon={<DeleteOutlined />}>删除部门</Button>
            </div>
            : ''
          }
        </div>
        <List
          itemLayout="horizontal"
          dataSource={tableList}
          renderItem={item => (
            <List.Item
              className='list-btn'
              actions={currentMenu > '3' ?
                [
                  <Popconfirm
                    title="确定禁用此用户吗?"
                    onConfirm={confirm}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button shape="circle" icon={<CloseCircleOutlined />}></Button>
                  </Popconfirm>,
                  <Popconfirm
                    title="确定移除此用户吗?"
                    onConfirm={confirm}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button shape="circle" icon={<DeleteOutlined />}></Button>
                  </Popconfirm>
                ]
                : []
              }>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Button type="link">{item.username}</Button>}
                description={
                  <div>{item.email} {item.department.name}</div>
                }
              />
            </List.Item>
          )}
        />,
      </Content>
      <CreateModal
        visible={createVisible}
        Cancel={() => setCreateVisible(false)}
      />
      <AddModal
        visible={addVisible}
        Cancel={() => setAddVisible(false)}
      />
      <EditModal
        visible={editVisible}
        Cancel={() => setEditVisible(false)}
      />
      <RemoveModal
        visible={removeVisible}
        Ok={() => setRemoveVisible(false)}
        Cancel={() => setRemoveVisible(false)}
      />
    </Layout>
  )
}

function CreateModal({ visible, Cancel }) {
  return (
    <Modal
      title="创建部门"
      visible={visible}
      onCancel={Cancel}
      footer={[]}
    >
      此操作将永久删除该部门，并释放所有成员, 是否继续?
    </Modal>
  )
}
function AddModal({ visible, Cancel }) {
  return (
    <Modal
      title="添加成员至部门"
      visible={visible}
      onCancel={Cancel}
      footer={[]}
    >
      此操作将永久删除该部门，并释放所有成员, 是否继续?
    </Modal>
  )
}
function EditModal({ visible, Cancel }) {
  return (
    <Modal
      title="编辑部门"
      visible={visible}
      onCancel={Cancel}
      footer={[]}
    >
      此操作将永久删除该部门，并释放所有成员, 是否继续?
    </Modal>
  )
}
function RemoveModal({ visible, Ok, Cancel }) {
  return (
    <Modal
      title="提示"
      cancelText='取消'
      okText='确定'
      visible={visible}
      onOk={Ok}
      onCancel={Cancel}
    >
      此操作将永久删除该部门，并释放所有成员, 是否继续?
    </Modal>
  )
}
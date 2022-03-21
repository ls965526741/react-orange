import React, { useState, useEffect } from 'react'
import './index.less'
import { Button, Input, Table, Tag, Divider } from 'antd'
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import zhCN from 'antd/es/locale/zh_CN';
import { getList } from '../../api/user';
export default function UserManagement() {
  const [list, setList] = useState([])
  async function reqList() {
    const queryForm = {
      prop_order: '',
      order: '',
      pageNo: 1,
      pageSize: 10,
      keyword: '',
      limit: 10,
      offset: 0
    }
    const { data } = await getList(queryForm)
    setList(data.data.rows)
  }
  const onSearch = value => console.log(value)

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      sorter: (a, b) => a.nickname.length - b.nickname.length
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'id',
      width: 80,
      render: item => (
        item.map(item1 => (
          <Tag color="green" key={item1.id}>{item1.name}</Tag>
        ))
      )
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: item => (
        <img style={{ width: '40px' }} src={item} alt="" />
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone - b.phone,
    },


    {
      title: '状态',
      dataIndex: 'state',
      key: 'id',
      render: item => (
        item === 1
          ? <Tag icon={<CheckCircleOutlined />} color="success">正常</Tag>
          : <Tag icon={<CloseCircleOutlined />} color="success">不正常</Tag>
      )
    },
    {
      title: '最近登录时间',
      dataIndex: 'updated_at',
      key: 'id',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: (item, recode) => (
        <>
          <Button type='link'>角色管理</Button>
          <Button type='link'>编辑</Button>
          <Button type='link'>删除</Button>
        </>
      )
    },
  ]
  useEffect(() => {
    reqList()
  }, [])
  const onSelectChange = selectedRowKeys => {
    setselectedRowKeys(selectedRowKeys)
  };
  const [selectedRowKeys, setselectedRowKeys] = useState([])
  return (
    <div className='user-management'>
      <div className='um-header'>
        <Button danger icon={<DeleteOutlined />}>批量删除</Button>
        <Input.Search style={{ width: '231px' }} placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      <Divider />
      <Table
        locale={zhCN}
        columns={columns}
        dataSource={list}
        rowKey='id'
        pagination={{ position: ['bottomCenter'], defaultPageSize: '2' }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
    </div>
  )
}

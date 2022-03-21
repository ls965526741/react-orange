import React, { useState, useEffect } from 'react'
import './index.less'
import { Table, Button } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { getList } from '../../api/permissionManagement';

const columns = [
  {
    title: '标识码',
    dataIndex: 'mark',
    width: 80,
    key: 'id'
  },
  {
    title: '标识码名',
    dataIndex: 'mark_name',
    width: 90,
    key: 'id'
  },
  {
    title: 'name',
    dataIndex: 'name',
    width: 70,
    key: 'id'
  },
  {
    title: '路径',
    dataIndex: 'url',
    width: 120,
    ellipsis: true,
    key: 'id'
  },
  {
    title: '动作',
    dataIndex: 'action',
    width: 60,
    key: 'id'
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 60,
    key: 'id',
    render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : <CloseOutlined style={{ color: "red" }} />)
  },
  {
    title: '需要认证',
    dataIndex: 'authentication',
    key: 'id',
    render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : <CloseOutlined style={{ color: "red" }} />)
  },
  {
    title: '需要授权',
    dataIndex: 'authorization',
    key: 'id',
    render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : <CloseOutlined style={{ color: "red" }} />)
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 60,
    key: 'id'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'id',
    render: item => (
      <div>
        <Button type='link'>编辑</Button>
        <Button type='link' danger>删除</Button>
      </div>
    )
  }
]

export default function PermissionManagement() {
  const [selectedRowKeys, setselectedRowKeys] = useState()
  const [list, setList] = useState()
  async function reqList() {
    const params = {
      prop_order: '',
      order: '',
      pageNo: 1,
      pageSize: 10,
      keyword: '',
      limit: 10,
      offset: 0
    }
    const { data } = await getList(params)
    setList(data.data.rows)
  }
  const onSelectChange = selectedRowKeys => {
    setselectedRowKeys(selectedRowKeys)
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    reqList()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='permission-management'>
      <div className='pm-header'>
        <Button className='heander-btn-1' type="primary" icon={<PlusOutlined />}>添加</Button>
        <Button type="primary" danger icon={<DeleteOutlined />}>批量删除</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={list}
        rowKey='id'
        pagination={{ pageSize: 50 }}
        scroll={{ y: 300 }}
      />
    </div>
  )
}

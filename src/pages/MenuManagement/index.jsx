import React, { useState, useEffect } from 'react'
import './index.less'
import { Table, Button } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { getList } from '../../api/menuManagement';
import { arrayTree } from '../../utils'

const columns = [
  {
    title: '路由title',
    dataIndex: 'title',
    width: 200,
    key: 'id'
  },
  {
    title: '路由名',
    dataIndex: 'path',
    key: 'id',
    ellipsis: true
  },
  {
    title: '父id',
    dataIndex: 'parent_id',
    key: 'id'
  },
  {
    title: '图标url',
    dataIndex: 'icon',
    key: 'id'
  },
  {
    title: '路由路径',
    dataIndex: 'redirect',
    key: 'id',
    ellipsis: true
  },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
    key: 'id',
    render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : <CloseOutlined style={{ color: "red" }} />)
  },
  {
    title: '总是显示',
    dataIndex: 'always_show',
    key: 'id',
    render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : <CloseOutlined style={{ color: "red" }} />)
  },
  {
    title: '缓存',
    dataIndex: 'keep_alive',
    key: 'id',
    render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : <CloseOutlined style={{ color: "red" }} />)
  },
  {
    title: 'target',
    dataIndex: 'title',
    key: 'id'
  },
  {
    title: '对应组件',
    dataIndex: 'name',
    key: 'id',
    ellipsis: true
  },
  {
    title: '路由重定向',
    dataIndex: 'redirect',
    key: 'id',
    ellipsis: true
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'id'
  },
  {
    title: '操作',
    key: 'id',
    width: 300,
    render: record => (
      <div>
        <Button type='link'>添加下级菜单</Button>
        <Button type='link'>编辑</Button>
        <Button type='link'>删除</Button>
      </div>
    )
  },
];

export default function MenuManagement() {
  const [selectedRowKeys, setselectedRowKeys] = useState()
  const [list, setList] = useState()

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys)
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  async function reqList() {
    const params = {
      keyword: '',
      limit: 1000,
      prop_order: 'sort',
      order: 'desc'
    }
    const { data } = await getList(params)
    const newArr = arrayTree(data.data.rows, 0)
    setList(newArr)
  }
  useEffect(() => {
    reqList()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='menu-management'>
      <div className='mm-header'>
        <Button className='heander-btn-1' type="primary" icon={<PlusOutlined />}>添加</Button>
        <Button type="primary" danger icon={<DeleteOutlined />}>批量删除</Button>
      </div>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={list}
        rowSelection={rowSelection}
        pagination={false}
        scroll={{ x: 2000, y: 350 }}
      />
    </div>
  )
}

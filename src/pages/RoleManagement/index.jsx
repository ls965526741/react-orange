import React, { useState, useEffect } from 'react'
import './index.less'
import { Table, Button, Input } from 'antd';
import { CheckOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import zhCN from 'antd/es/locale/zh_CN';
import { getList } from '../../api/roleManagement';
export default function RoleManagement() {
  const [list, setLsit] = useState([])
  async function reqList() {
    const { data } = await getList()
    setLsit(data.data.rows)
  }
  const onSearch = e => {
    console.log(e);
  }
  useEffect(() => {
    reqList()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '是否为默认角色',
      dataIndex: 'is_default',
      key: 'id',
      render: item => (item === 1 ? <CheckOutlined style={{ color: 'blue' }} /> : '')
    },
    {
      title: '操作',
      key: 'name',
      dataIndex: 'is_default',
      render: item => (
        <>
          <Button type='link'>资源管理</Button>
          <Button type='link'>菜单管理</Button>
          <Button type='link'>编辑</Button>
          <Button type='link'>删除</Button>
          {item !== 1 ? <Button type='link'>设为默认</Button> : ''}
        </>
      )
    },
  ]
  const [selectedRowKeys, setselectedRowKeys] = useState()

  const onSelectChange = selectedRowKeys => {
    setselectedRowKeys(selectedRowKeys)
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: '选择单数行',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setselectedRowKeys(newSelectedRowKeys)
        },
      },
      {
        key: 'even',
        text: '选择双数行',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setselectedRowKeys(newSelectedRowKeys)
        },
      },
    ],
  };
  return (
    <div className='role-management'>
      <div className='rm-header'>
        <div>
          <Button className='heander-btn-1' type="primary" icon={<PlusOutlined />}>添加</Button>
          <Button type="primary" danger icon={<DeleteOutlined />}>批量删除</Button>
        </div>
        <Input.Search className='header-input' placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      {
        list.length > 2
          ? <Table
            locale={zhCN}
            columns={columns}
            dataSource={list}
            rowKey='id'
            rowSelection={rowSelection}
            pagination={{ position: ['bottomCenter'], defaultPageSize: '4' }}
          />
          : ''
      }
    </div>
  )
}

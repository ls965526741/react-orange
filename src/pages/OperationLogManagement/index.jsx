import React, { useState, useEffect } from 'react'
import './index.less'
import { Table, Button, Tag, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { getList } from '../../api/operationLogManagement';

const columns = [
  {
    title: '操作人',
    dataIndex: 'operator_username',
    width: 80,
    key: 'id'
  },
  {
    title: '日期',
    dataIndex: 'created_at',
    width: 80,
    key: 'id'
  },
  {
    title: '状态码',
    dataIndex: 'status',
    width: 80,
    key: 'id',
    render: item => (<Tag color={item === ('201' || '200') ? "cyan" : 'gold'}>{item}</Tag>)
  },
  {
    title: '请求IP',
    dataIndex: 'ip',
    width: 80,
    key: 'id'
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    width: 80,
    key: 'id',
    render: item => (<Tag color={item === 'PUT' ? "cyan" : 'gold'}>{item}</Tag>)

  },
  {
    title: 'url',
    dataIndex: 'mark',
    width: 80,
    key: 'id'
  },
  {
    title: '请求体',
    dataIndex: 'params',
    width: 80,
    ellipsis: true,
    key: 'id'
  },
  {
    title: '操作',
    width: 80,
    key: 'id',
    render: () => (<Button type='link' danger>删除</Button>)
  },
]

export default function OperationLogManagement() {
  const [selectedRowKeys, setselectedRowKeys] = useState()
  const [list, setList] = useState()
  async function reqList() {
    const params = {
      pageNo: 1,
      pageSize: 10,
      keyword: '',
      prop_order: 'id',
      order: 'desc',
      limit: 10,
      offset: 0,
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
    getCheckboxProps: (record) => ({
      name: record.id,
    }),
  };
  const onSearch = e => {
    console.log(e);
  }
  useEffect(() => {
    reqList()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='operationLog-management'>
      <div className='om-header'>
        <Button type="primary" danger icon={<DeleteOutlined />}>批量删除</Button>
        <Input.Search className='header-input' placeholder="input search text" onSearch={onSearch} enterButton />
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

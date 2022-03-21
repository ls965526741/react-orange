import React from 'react'
import { Input, Table } from 'antd'

export default function Message(props) {
  console.log(props.match.params.id);
  const onSearch = value => console.log(value)
  const columns = []
  const list = []
  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <Input.Search style={{ width: 304 }} placeholder="查询" onSearch={onSearch} enterButton />
      </div>
      <Table
        showHeader={false}
        pagination={true}
        columns={columns} dataSource={list} />
    </div>
  )
}

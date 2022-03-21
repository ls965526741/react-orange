import React, { useState, useEffect } from 'react'
import './index.less'
import { Menu, Button, Table, Breadcrumb, Tooltip, Popconfirm, message } from 'antd'
import { TableOutlined, HighlightOutlined, DeleteOutlined } from '@ant-design/icons'
import { getList } from '../../api/projectTemplateManagement';

export default function ProjectTemplate() {
  const [currentMenu, setCurrentMenu] = useState('1')
  const [list, setList] = useState([])
  const handleClick = e => {
    setCurrentMenu(e.key)
  };
  const reqList = async () => {
    const is_custom = currentMenu === '1' ? 1 : 0
    const { data } = await getList({ is_custom, limit: 1000, offset: 0 })
    setList(data.data.rows)
  }
  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  const publicColumns = [
    {
      dataIndex: 'cover',
      key: 'id',
      render: (item, recode) => (
        <div className='table-project'>
          <img className='project-img' src={item} alt="" />
        </div>
      )
    },
    {
      dataIndex: 'name',
      key: 'id',
    },
    {
      dataIndex: 'project_template_tasks',
      width: '400',
      key: 'id',
      render: item => (
        <Breadcrumb separator="->">
          {item.map(item1 => (
            <Breadcrumb.Item key={item1.id}>{item1.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb >
      )
    },
    {
      key: 'id',
      render: () => (
        currentMenu === '1'
          ? <>
            <Tooltip title="任务模板">
              <Button shape="circle" icon={<TableOutlined />} />
            </Tooltip>
            <Tooltip title="编辑">
              <Button shape="circle" icon={<HighlightOutlined />} />
            </Tooltip>
            <Popconfirm
              title="你确定要删除当前项吗?"
              onConfirm={confirm}
              okText="确定"
              cancelText="取消"
            >
              <Tooltip title="移除">
                <Button shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          </>
          : ''
      )
    },
  ]
  useEffect(() => {
    reqList()
  }, [currentMenu])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='pt'>
      <div className='pt-menu'>
        <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal">
          <Menu.Item key="1" >
            自定义模板
          </Menu.Item>
          <Menu.Item key="2">
            公共模板
          </Menu.Item>
        </Menu>
        <Button className='create-btn' type="primary"> + 创建项目模板</Button>
      </div>
      <Table
        showHeader={false}
        rowKey='id'
        pagination={list.length > 5 ? { position: ['bottomCenter'], defaultPageSize: '5' } : false}
        columns={publicColumns} dataSource={list} />
    </div>
  )
}

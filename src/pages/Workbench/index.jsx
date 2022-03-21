// 工作台
import React, { useState, useEffect } from 'react'
import './index.less'
import { connect } from 'react-redux'
import { Select, Menu, Tag, Pagination } from 'antd';
import { UnorderedListOutlined, PlusCircleOutlined, TeamOutlined } from '@ant-design/icons'
import { getList } from '../../api/taskManagement'
import { getList as getTaskPriorityList } from '../../api/taskPriorityManagement'
import HomeDetail from '../../components/HomeDetail'

const { Option } = Select;
const getTip = () => {
  const time = new Date().getHours();
  let tip = ''
  if (time >= 0 && time < 5) {
    tip = '深夜了，注意身体哦，';
  } else if (time < 7) {
    tip = '清晨好，早起的鸟儿有虫吃，';
  } else if (time < 12) {
    tip = '上午好，';
  } else if (time < 19) {
    tip = '下午好，';
  } else if (time < 22) {
    tip = '晚上好，';
  } else if (time <= 23) {
    tip = '还在加班吗？辛苦了，';
  }
  return tip
}
function Children({ userInfo }) {
  const [current, currentState] = useState("1")
  const [currentPage, currentPageState] = useState("1")
  const [list, listState] = useState({})
  const manageList = () => {
    return getList({
      is_done: 0,
      is_recycle: 0,
      limit: 5,
      offset: (currentPage - 1) * 5,
      participator_id: userInfo.id
    })
  }
  const getModule = async () => {
    Promise.all([getTaskPriorityList(), manageList()]).then(([{ data: { data: { rows } } }, { data: { data } }]) => {
      data.rows.forEach(task => {
        task.priority = rows.find(priority => priority.id === task.task_priority_id);
      });
      listState(data)
    })
  }

  useEffect(() => {
    getModule()
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='workbench'>
      <div className='header'>
        <img className='header-img' src={userInfo.avatar} alt="" />
        <div className='center'>
          <div>{getTip()} {userInfo.username}，祝你开心每一天!</div>
          <div>{userInfo.nickname}</div>
        </div>
        <div className='right'>
          <div>项目总数</div>
          <div>4</div>
        </div>
      </div>
      <div className='main'>
        <div className='project'>
          <div className='main-left-header'>
            <div className='main-header'>
              <div>进行中的项目</div>
              <div>全部项目</div>
            </div>
            <HomeDetail />
          </div>
        </div>
        <div className='task'>
          <div className='main-right-header'>
            <div>我的任务-{list.count}</div>
            <Select defaultValue="jack" style={{ width: 120 }}>
              <Option value="jack">未完成</Option>
              <Option value="lucy">已完成</Option>
            </Select>
          </div>
          <Menu onClick={value => currentState(value.key)} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="1" icon={<UnorderedListOutlined />}>
              我执行的
            </Menu.Item>
            <Menu.Item key="2" icon={<PlusCircleOutlined />}>
              我参与的
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              我创建的
            </Menu.Item>
          </Menu>
          {current === '1'
            ? <div className='empty'>空空如也~~</div>
            : <div>
              {list.rows.map(item => (
                <div className='task-item' key={item.id}>
                  <Tag color={item.priority.color}>{item.priority.name}</Tag>
                  <span>{item.name}</span>
                  <span>{item.project && item.project.name}</span>
                </div>
              ))}
              <Pagination onChange={value => currentPageState(value)} pageSize={5} defaultCurrent={1} total={list.count} />
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default connect(state => ({
  userInfo: state.user.userInfo
}))(Children)
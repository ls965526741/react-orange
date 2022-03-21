// 部门管理
// 全部列表
import React, { useState, useEffect } from 'react'
import './index.less'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Button, Table, Progress, Space, Tooltip, Tag, message, Popconfirm } from 'antd'
import { SearchOutlined, SettingOutlined, StarOutlined, DeleteOutlined, StarFilled, ReloadOutlined } from '@ant-design/icons';
import AddMembers from './components/AddMembers'
import CreateProject from './components/CreateProject'
import ProjectSetting from './components/ProjectSetting'
import { change } from '../../redux/actions/home'
import { getList } from '../../api/projectManagement';
import { themeColor } from '../../config/settings';
// import { doChange, } from '../../api/userProjectCollectManagement';

function Children(props) {
  const [list, listState] = useState()
  const [CPVisible, CPVisibleState] = useState(false)
  const [AMVisible, setAMVisible] = useState(false)
  const [PSVisible, setPSVisible] = useState(false)
  const [currentList, setCurrentList] = useState({})
  const history = useHistory(null)
  const pathname = history.location.pathname.slice(-1)
  // 收藏业务
  const collect = (res) => {
    return () => {
      console.log(res);
    }
  }
  function confirm(e) {
    console.log(e);
    message.success('删除成功');
  }

  const columns = [
    {
      title: '项目',
      dataIndex: 'cover',
      width: '250px',
      key: 'cover',
      render: (item, recode) => (
        <div className='table-project'>
          <img className='project-img' src={item} alt="" />
          <div>
            <span className='table-name'>{recode.name}</span>
            {recode.is_private === 0 ? <Tag color="lime">公开</Tag> : ''}
            <div className='project-intro'>{recode.intro}</div>
          </div>
        </div>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      width: '100px',
      key: 'creator',
      render: (creator) => (
        <>{creator.username}</>
      )
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      width: '120px',
      render: (progress) => (
        <Progress percent={progress} />
      )
    },
    {
      title: '编辑',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Space size="middle">
          {
            pathname === '1' || pathname === '2'
              ? <>
                <Tooltip onClick={() => { setAMVisible(true); setCurrentList(record) }} title="添加成员">
                  <Button shape="circle" icon={<SearchOutlined />} />
                </Tooltip>
                <Tooltip title="项目设置">
                  <Button onClick={() => { setPSVisible(true); setCurrentList(record) }} shape="circle" icon={<SettingOutlined />} />
                </Tooltip>
                <Tooltip title={record.collector.length ? '取消收藏' : '加入收藏'}>
                  <Button onClick={collect(record)} shape="circle" icon={record.collector.length ? <StarFilled style={{ color: themeColor }} /> : <StarOutlined />} />
                </Tooltip>
                <Tooltip title="移到回收站">
                  <Popconfirm
                    title={"确定要把" + record.name + "移到回收站?"}
                    onConfirm={confirm}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button shape="circle" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Tooltip>
              </>
              : pathname === '3'
                ? <>
                  <Tooltip title="从归档中回复项目">
                    <Button shape="circle" icon={<ReloadOutlined />} />
                  </Tooltip>
                  <Tooltip title="移到回收站">
                    <Button shape="circle" icon={<DeleteOutlined />} />
                  </Tooltip>
                </>
                : <Tooltip title="从回收站中回复项目">
                  <Button shape="circle" icon={<ReloadOutlined />} />
                </Tooltip>
          }
        </Space>
      ),
    },
  ];


  useEffect(() => {
    reqList()
    return () => {
      // listState(list)
      // CPVisibleState(CPVisible)
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  const currentVal = props.menuCurrent
  const handleClick = (value) => {
    props.change([value.key, '0'])
  };

  const reqList = async () => {
    let res = ''
    let data = ''
    let body = { collection: 0, is_recycle: 0, is_archived: null }
    switch (pathname) {
      case '1':
        data = await getList(body)
        listState(data.data.data.rows)
        break
      case '2':
        body.ollection = 1
        data = await getList(body)
        if (typeof data.data.data.rows === 'object') {
          res = data.data.data.rows.filter(item => item.collector.length ? item : '')
        }
        listState(res)
        break
      case '3':
        body.is_recycle = null;
        body.is_archived = 1;
        data = await getList(body)
        listState(data.data.data.rows)
        break
      case '4':
        body.is_recycle = 1
        data = await getList(body)
        listState(data.data.data.rows)
        break
      default:
        return
    }

  }
  // (async () => {
  //   const { data } = await doChange({
  //     user_id: 1,
  //     project_id: 1,
  //   })
  //   console.log(data);
  // })
  const showModal = () => {
    CPVisibleState(true);
  };
  const CPHandleOK = () => {
    CPVisibleState(false);
  };
  const CPHandleCancel = () => {
    CPVisibleState(false);
  };

  return (
    <div className='procjectlist'>
      <div className='procjectlist-nav'>
        <Menu onClick={handleClick} selectedKeys={[currentVal[0]]} mode="horizontal">
          <Menu.Item key="1"> <Link to='/divisional/ProjectList/1'>全部项目</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/divisional/ProjectList/2'>我的收藏</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/divisional/ProjectList/3'>已归档项目</Link></Menu.Item>
          <Menu.Item key="4"><Link to='/divisional/ProjectList/4'>回收站</Link> </Menu.Item>
        </Menu>
        <Button onClick={showModal} type="primary">+ 创建新项目</Button>
      </div>
      <div className='procjectlist-main'>
        <Table rowKey={recode => recode.id} pagination={{ position: ['bottomCenter'], defaultPageSize: '4' }} columns={columns} dataSource={list} />
      </div>
      <AddMembers
        visible={AMVisible}
        currentList={currentList}
        onCreate={() => { setAMVisible(true) }}
        onCancel={() => { setAMVisible(false) }} />
      <CreateProject
        isModalVisible={CPVisible}
        handleOk={CPHandleOK}
        handleCancel={CPHandleCancel} />
      <ProjectSetting
        visible={PSVisible}
        currentList={currentList}
        onCancel={() => { setPSVisible(false) }}
      />
    </div>
  )
}
export default connect(state => (
  {
    menuCurrent: state.home.menuCurrent,
  }), { change })(Children)

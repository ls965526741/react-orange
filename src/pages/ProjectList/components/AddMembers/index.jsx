import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Card, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import './index.less'

import { getList } from '../../../../api/user';
import { doCreate } from '../../../../api/inviteManagement';
import { doQuit } from '../../../../api/userProjectManagement';
import { responce } from '../../../../utils'
export default function AddMembers({ visible, onCreate, onCancel, currentList }) {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([])
  const getUserList = async (keyword = '') => {
    const params = {
      keyword: keyword,
      limit: 6,
      offset: (1 - 1) * 6,
    }
    const { data: { data: { rows } } } = await getList(params)
    const userList = rows.map(item => {
      return {
        ...item,
        projectIds: item.projects && item.projects.map(project => project.id),
        invited: false
      }
    })
    setUserList(userList)
  }
  const fun = responce(getUserList, 300)
  const inputChange = (val) => {
    fun(val.target.value)
  }
  const add = (val) => {
    return async () => {
      const params = {
        group: 'Projects',
        group_id: currentList.id,
        receiver_id: val.id,
      }
      await doCreate(params)
      const list = userList.map(item => {
        if (item.id === val.id) {
          val.invited = true
        }
        return item
      })
      setUserList(list)
    }
  }
  const cancelProject = (val) => {
    return async () => {
      await doQuit({ user_id: val.id, project_id: currentList.id, })
      getUserList()
    }
  }
  useEffect(() => {
    getUserList()
  }, [currentList])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Modal
      visible={visible}
      title="邀请新成员"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <div>
        <Card title="账号邀请" extra={<Button type="link" disabled>通过链接邀请</Button>} style={{ width: '100%' }}>
          <Input style={{ marginBottom: '10px' }} placeholder="default size" onChange={inputChange} prefix={<SearchOutlined style={{ color: '#ccc' }} />} />
          <List
            bordered
            dataSource={userList}
            renderItem={item => (
              <List.Item className='list'>
                <img src={item.avatar} alt="" />
                <div>
                  <div>{item.nickname}</div>
                  <div>{item.email}</div>
                </div>
                {item.projectIds.includes(currentList.id)
                  ? <Button onClick={add(item)} type="primary" ghost>{item.invited ? '已邀请' : '邀请'}</Button>
                  : item.id !== currentList.manager_id && currentList.manager_id === 1
                    ? <Button onClick={cancelProject(item)} danger >移出</Button>
                    : <i>{item.id === currentList.manager_id ? '已加入' : '拥有者'}</i>
                }
              </List.Item>
            )}
          />
        </Card>
      </div>
    </Modal >
  );
};

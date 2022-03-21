import React from 'react'
import './index.less'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tabs, Form, Input, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;


function Children({ userInfo }) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='personal-center'>
      <Link className='back' to='/' ><LeftOutlined />返回</Link>
      <Tabs className='pc-content' defaultActiveKey="1" tabPosition="left">
        <TabPane tab="基本设置" key="1">
          <div className='tab-item'>
            <Form
              className='user-form'
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="用户名"
                name="username"
              >
                <Input placeholder={userInfo.username} disabled />
              </Form.Item>

              <Form.Item
                label="昵称"
                name="nickname"
              >
                <Input placeholder={userInfo.nickname} />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
              >
                <Input placeholder={userInfo.email} disabled />
              </Form.Item>
              <Form.Item
                label="手机号"
                name="phone"
              >
                <Input placeholder={userInfo.phone} />
              </Form.Item>
              <Form.Item
                label="公司"
                name="company"
              >
                <Input placeholder={userInfo.company} />
              </Form.Item>
              <Form.Item
                label="城市"
                name="city"
              >
                <Input placeholder={userInfo.city} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
            <div className='user-image'><img src={userInfo.avatar} alt="" /></div>
          </div>
        </TabPane>
        <TabPane tab="安全设置" key="2">
          安全设置
        </TabPane>
        <TabPane tab="账号绑定" key="3">
          安全设置
        </TabPane>
      </Tabs>
    </div>

  )
}

const PersonalCenter = connect(state => (
  {
    userInfo: state.user.userInfo
  }))(Children)
export default PersonalCenter
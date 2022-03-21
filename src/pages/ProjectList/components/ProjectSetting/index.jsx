import React, { useState } from 'react';
import { Modal, Menu, Form, Input, Button, Select, Switch } from 'antd';
import { PieChartOutlined } from '@ant-design/icons'

import { doEdit } from '../../../../api/projectManagement';
// import { doQuit } from '../../../../api/userProjectManagement';

export default function ProjectSetting({ visible, onCancel, currentList }) {
  const [sideCurrent, setSideCurrent] = useState('1')
  const [progess, setProgess] = useState(0)
  const onChange = (val) => {
    val ? setProgess(0) : setProgess(1)
  }
  return (
    <Modal
      visible={visible}
      title="项目设置"
      width={700}
      onCancel={onCancel}
      footer={[]}
    >
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={e => { setSideCurrent(e.key) }}
          style={{ width: 150 }}
          defaultOpenKeys={[sideCurrent]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            概览
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            项目偏好
          </Menu.Item>
          <Menu.Item key="3" icon={<PieChartOutlined />}>
            更多
          </Menu.Item>
        </Menu>
        <div style={{ paddingLeft: '10px', width: '100%' }}>
          {sideCurrent === '1'
            ? <Overview currentList={currentList} progess={progess} />
            : sideCurrent === '2'
              ? <div>
                <div>自动更新项目进度</div>
                <div style={{ textAlign: 'right' }}>
                  <Switch defaultChecked onChange={onChange} />
                </div>
                <div>根据当前任务的完成情况自动计算项目进度。</div>
              </div>
              : <div>
                <h3>项目操作</h3>
                <div>您可以执行以下操作</div>
                <Button danger type="solid">归档项目</Button>&nbsp;
                <Button danger>退出</Button>&nbsp;
                <Button type="primary" danger>移至回收站</Button>
              </div>
          }
        </div>
      </div>
    </Modal >
  );
};

const Overview = ({ currentList, progess }) => {
  const onFinish = async (values) => {
    const form = { ...currentList }
    form.name = values.name
    const data = await doEdit(form);
    console.log(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>项目封面</div>
      <img style={{ marginBottom: '10px' }} src={currentList.cover} alt="" />
      <Form.Item
        label="项目名称"
        name="name"
        rules={[
          { required: true, message: '项目名称不能为空' },
          { min: 2, max: 15, message: '项目名称应该在2-15个字符' }
        ]}
      >
        <Input placeholder={currentList.name} />
      </Form.Item>
      <Form.Item
        label="项目进度（%）"
        name="progress"
      >
        <Input disabled placeholder={currentList.progress} />
      </Form.Item>
      <Form.Item
        label="项目简介"
        name="intro"
      >
        <Input.TextArea placeholder={currentList.intro} />
      </Form.Item>
      <Form.Item
        label="项目公开性"
        name="username"
      >
        <Select style={{ width: '100%' }} >
          <Select.Option value="jack">私有项目（仅项目成员可查看和编辑）</Select.Option>
          <Select.Option value="lucy">公开项目（所有人都可通过链接访问，仅项目成员可编辑）</Select.Option>
        </Select>
      </Form.Item>
      <div>
        <div>项目拥有者</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }} src={currentList.creator.avatar} alt="" />
          <span>{currentList.creator.username}</span>
        </div>
      </div>
      <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}
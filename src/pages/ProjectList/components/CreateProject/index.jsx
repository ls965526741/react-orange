import React, { useState, useEffect } from 'react';
import CoverImage from '../../../../components/CoverImage'
import { doCreate } from '../../../../api/projectManagement';
import { getList } from '../../../../api/projectTemplateManagement';
import { Modal, Form, Input, Select, message } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

export default function CreateProject(props) {
  const { isModalVisible, handleOk, handleCancel } = props
  const [imgPath, setImgPath] = useState()
  const [select, setSelect] = useState([])
  const [form] = Form.useForm();
  const emitImgPath = (path) => {
    setImgPath(path)
  }
  const onCreate = async (values) => {
    values.cover = imgPath
    values.manager_id = 1
    values.id = ''
    console.log(values);
    const { data: { msg } } = await doCreate(values);
    message.success(msg)
    handleOk(false);
  };
  const getData = async () => {
    const { data: { data: { rows } } } = await getList({ limit: 1000, offset: 0 })
    setSelect(rows)
  }
  useEffect(() => {
    getData()
    return () => {
      setSelect(select)
      setImgPath(imgPath)
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Modal title="添加项目" okText="确认" cancelText="取消" visible={isModalVisible}
        onCancel={handleCancel}
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
        }}>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="cover"
          >
            <CoverImage emitImgPath={emitImgPath} />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入项目名称' },
            { min: 2, max: 100, message: '长度在 2 到 100 个字符' },]}
          >
            <Input placeholder="项目名称（必填）" />
          </Form.Item>
          <Form.Item
            name="project_template_id"
            rules={[{ required: true, message: '请选择项目模板' }]}
          >
            <Select placeholder='请选择项目模板（必填）' style={{ width: "100%" }}>
              {select.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}

            </Select>
          </Form.Item>
          <Form.Item
            name="intro"
          >
            <TextArea placeholder="项目简介" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

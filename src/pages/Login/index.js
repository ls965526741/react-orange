import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import { login } from '../../api/user'

const Login = () => {
  const onFinish = async (values) => {
    const { username, password, remember } = values
    if (!remember) return message.info('请先勾选已经阅读')
    const { data } = await login({ username, password })
    console.log(data.data);
    localStorage.setItem('token', data.data.accessToken)
    window.location.reload(true)
  }

  const validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
  }

  return (
    <div className='login'>
      <div className='page'>
        <h1>用户登录</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, whitespace: true, message: '用户名必须输入' },
              { min: 4, message: '用户名至少4位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
            ]}
            initialValue='admin'
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { validator: validatePwd }]}
            initialValue='123123'
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>已阅读</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >

  );
};
export default Login
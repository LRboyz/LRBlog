import React from 'react'
import './less/login.less'
import desc from '@/assets/image/common/desc.png'
import { Modal, Button, Form, Checkbox, Input } from 'antd'
import { CloseCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'

function LoginModal(props: Props) {
  const { showLogin } = props
  // let form = {} as any;
  // let [loginForm, setLoginForm] = useState(form);

  // async function login() {
  //   console.log("登陆！！");
  // try {
  //   const result = await apiManage.get_token(loginForm);
  //   if (result.status === 200) {
  //     await saveTokens(result.data.access_token, result.data.refresh_token);
  //     const user_info = await apiManage.get_user_info();
  //     console.log(user_info);
  //   }
  //   console.log(result, 'token');
  // } catch (error) {
  //   console.log(error);
  // }
  // }

  // 视图层
  return (
    <div className="login">
      <Modal
        closeIcon={<CloseCircleOutlined />}
        width="350px"
        title="登陆"
        visible={showLogin}
        onCancel={() => props.closeLogin()}
        maskStyle={{ backdropFilter: 'blur(3px)' }}
        footer={null}>
        <img src={desc} alt="cow" style={{ position: 'absolute', width: '180px', top: '-55px', left: '40%', transform: 'translate(-50px)' }} />
        <Form name="basic" initialValues={{ remember: true }}>
          <Form.Item
            // label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名或手机号" />
          </Form.Item>

          <Form.Item
            // label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入您的密码" />
          </Form.Item>

          <div>
            <span>
              没有账号? &nbsp;
              <a>去注册</a>
            </span>
          </div>
          <Form.Item>
            <Button htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

type Props = {
  showLogin: boolean;
  closeLogin: () => void;
};

export default React.memo(LoginModal)

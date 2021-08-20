import React, { useState } from 'react'
import desc from '@/assets/image/common/desc.png'
import { Modal, Button, Form, Checkbox, Input, Row, Col, Radio, message, notification } from 'antd'
import { CloseCircleOutlined, ContactsOutlined, EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar'
import { useRequest } from 'ahooks'
import { getAvatarGroup } from '@/services/api/public'
import { useDispatch } from 'react-redux'
import { clearUserInfo, setUserInfo } from '@/store/systemSlice'
import { postRegisterForm } from '@/services/api/user'
import { queryUserAuth, queryUserInfo } from '@/services/cloudbase'

export interface Props {
  showLogin: boolean;
  closeLogin: () => void;
}


function LoginModal(props: Props) {
  const { showLogin } = props
  const dispatch = useDispatch()
  const [toggle, toggleForm] = useState(true)
  const [form] = Form.useForm();
  const { data } = useRequest(async () => await getAvatarGroup())

  const submitRegisterForm = async (value: any, form: any) => {
    try {
      const res = await postRegisterForm({
        data: [value]
      })
      if (res.ids) {
        message.success("恭喜您注册成功！")
        form.register.resetFields()
      }
      console.log(res, 'regsiter result')
    } catch (error) {
      message.error("注册失败")
      form.resetFields()
    }
  }

  const submitLoginForm = async (value: any, form: any) => {
    try {
      const { total } = await queryUserAuth(value)
      console.log(total, 'result')
      if (total === 0) {
        message.error("登录失败！未查询到用户信息")
      } else if (total === 1) {
        const { data } = await queryUserInfo(value)
        dispatch(setUserInfo(data[0]))
        message.success("登陆成功！")
        form.login.resetFields();
        props.closeLogin()
      } else {
        message.error("登陆失败！")
      }
    } catch (error) {
      console.log(error, 'login error')
    }
  }

  const LoginForm = () => {
    return (
      <Form name="login" form={form} initialValues={{ remember: true }}>
        <Form.Item
          // label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="用户名或手机号" />
        </Form.Item>

        <Form.Item
          name="user_pwd"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入您的密码" />
        </Form.Item>

        <div>
          <span>
            已有账号? &nbsp;
            <a onClick={() => { toggleForm(!toggle) }}>去注册</a>
          </span>
        </div>
        <Form.Item>
          <Button htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    )
  }

  const RegisterForm = () => {
    return (
      <Form name="register" form={form} initialValues={{}}>
        <Form.Item
          // label="用户名"
          name="username"
          rules={[
            { required: true, message: '请填写您的用户名!' },
            { min: 4, max: 20 }
          ]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="nickname"
          rules={[{ required: true, message: '请填写您的昵称!' }]}
        >
          <Input size="large" prefix={<EditOutlined />} placeholder="请填写您的昵称" />
        </Form.Item>
        <Form.Item
          name="user_pwd"
          rules={[{ required: true, message: '请填写您的密码!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="请输入您的密码" />
        </Form.Item>
        <Form.Item
          name="job"
          rules={[{ required: true, message: '请填写你的职业!' }]}
        >
          <Input size="large" prefix={<ContactsOutlined />} placeholder="前端工程师/后端工程师/架构师/游客" />
        </Form.Item>
        <Form.Item name="user_avatar" label="默认头像">
          <Radio.Group>
            {
              data!.data.map(item => (
                <Radio value={item.avatar_image} key={Math.random()} style={{ marginBottom: 10 }}>
                  <Avatar src={item.avatar_image} alt={item.avatar_name}></Avatar>
                </Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>
        <div>
          <span>
            已有账号? &nbsp;
            <a onClick={() => { toggleForm(!toggle) }}>去登录</a>
          </span>
        </div>
        <Form.Item>
          <Button htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
            注册
          </Button>
        </Form.Item>

      </Form>
    )
  }

  // 视图层
  return (
    <div className="login">
      <Modal
        closeIcon={<CloseCircleOutlined />}
        width="300px"
        title={toggle ? '登录' : '注册账号'}
        visible={showLogin}
        onCancel={() => props.closeLogin()}
        maskStyle={{ backdropFilter: 'blur(3px)' }}
        footer={null}>
        <img src={desc} alt="cow" style={{ position: 'absolute', width: '180px', top: '-55px', left: '40%', transform: 'translate(-50px)' }} />
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            if (name === 'register') {
              submitRegisterForm(values, forms)
            } else {
              submitLoginForm(values, forms)
            }
          }}
        >
          {toggle ? <LoginForm /> : <RegisterForm />}
        </Form.Provider>
      </Modal>
    </div>
  )
}



export default LoginModal

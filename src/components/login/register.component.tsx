import React from 'react';
import './less/register.less';
import './scss/login.scss';

function Register(props: Props) {
  // let form = {} as any;
  // let [registerForm, setRegisterForm] = useState(form);
  // Props
  // const {showRegister, closeRegister} = props;

  // 注册按钮
  // async function register_account() {
  // if (registerForm.check()) {
  //   try {
  //     const result = await apiManage.register_account(
  //       registerForm.state.formValue
  //     );
  //     console.log(result);
  //     if (result.status === 200) {
  //     }
  //   } catch (error) {
  //     console.log(error, '/user/register');
  //   }
  // } else {
  //   return false;
  // }

  //   console.log(registerForm.state, registerForm.check(), '注册账号！');
  // }

  // 视图层
  return <div className="login"></div>;
}

type Props = {
  showRegister: boolean;
  closeRegister: () => void;
};

export default React.memo(Register);

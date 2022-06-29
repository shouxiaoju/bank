import './login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, message, Form, Input } from 'antd';
import { history } from "umi";
import CryptoJS from 'crypto-js';
import { login } from '@/api/activeapi';
const Login=()=>{
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        let {username,password}=values
        let paswor=encrypt(password)
        let key={"userAccount":username,"userPwd":paswor}
        login(key).then(function (response) {
            const {data:{code,data}}=response
            if(code===200){
                message.success('登录成功')
                localStorage.setItem("user",JSON.stringify(data))
                history.push({
                    pathname:'/active'
                })
            }
            console.log("登录成功",response);
          })
          .catch(function (error) {
            message.error("登录失败！错误信息："+error.message);
            console.log("登录失败",error);
          });
      };
     const encrypt = (plaintText:any) => { 
        const CRYPTOJSKEY = 'cmbCampus0722000'; 
        const options = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, };
        const key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY); 
        const encryptedData = CryptoJS.AES.encrypt(plaintText, key, options); 
        const encryptedBase64Str = encryptedData.toString(); 
        return encryptedBase64Str; 
    }
    return(
        <div id="login">
            <div className="login_content">
                <p className='login_titele'>秦学后台管理</p>
                <Form className='login_from'
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input className='login_input' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item 
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            className='login_input'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className='login_item'>
                        <Button  htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <a href="">使用手机小程序提示的账号密码登录</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
    
}

export default Login
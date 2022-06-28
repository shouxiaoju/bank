import {DownOutlined } from '@ant-design/icons';
import { Layout, Menu,Dropdown,Space,Avatar,Image,message } from 'antd';
import type { MenuProps } from 'antd';
import { history } from "umi";
import React,{useEffect,useState} from 'react';
import Login from '@/pages/login/login';
import { logout} from '@/api/activeapi';
import './index.less'
import Menubar from '@/pages/menu/menu';
const { Header, Content, Footer, Sider } = Layout;
/* 登录展示 */
const onClick: MenuProps['onClick'] = ({ key }) => {
    switch(key){
        case "1" :
        break;
        case "2" :
        break;
        case "3" :
            logout().then(function (response) {
                const {data:{code}}=response
                localStorage.removeItem("user")
                if(code===200){
                    message.success('操作成功')
                    history.push({
                        pathname:'/active'
                    })
                }
                console.log("登录成功",response);
            })
              .catch(function (error) {
                console.log("error",error);
              });
        break;
    } 
};
/* 登录账号展示 */
const menu = (
    <Menu
        onClick={onClick}
        items={[
            {
                key: '1',
                label: (
                    <p>个人中心</p>
                ),
            },
            {
                key: '2',
                label: (
                    <p>修改密码</p>
                ),
            },
            {
                key: '3',
                danger: true,
                label: (
                    <p>退出登录</p>
                ),
            },
        ]}
    />
  );






const Theme=(props:any)=>{
    const islogin=localStorage.getItem("user")
    const data=islogin?JSON.parse(islogin):""
    const {location:{pathname}}=props
    const [titlename,setTitlename]=useState("创建活动")

    const onadd=(key:string)=>{
        setTitlename(key)
    }
    return(
        pathname==="/login"
        ?<Login/>
        :<Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo">秦学后台管理</div>
                <Menubar onadd={onadd}/>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 ,height:"100%"}}>
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div className='site-layout-header'>
                        <div>{titlename}</div>
                        <div>
                        <Dropdown overlay={menu}>
                            <Space>
                                <Avatar src={<Image src={data.headPortrait} style={{ width: 32 }} />} />
                                <span>{data.userAccount}</span>
                                <DownOutlined />
                            </Space>
                            
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content style={{ margin:'0 24px 24px 24px', overflow: 'initial' }}>
                    <div className="site-layout-menu" style={{ padding: 24}}>
                        {props.children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
    </Layout>
    )
}

export default Theme

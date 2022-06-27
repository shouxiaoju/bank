import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined, SmileOutlined
  } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { history } from "umi";
import { Layout, Menu,Dropdown,Space,Avatar,Image,message } from 'antd';
import React,{useEffect} from 'react';
import Login from '@/pages/login/login';
import './index.less'
import { logout } from '@/api/activeapi';
const { Header, Content, Footer, Sider } = Layout;
const onClick: MenuProps['onClick'] = ({ key }) => {
    switch(key){
        case "1" :
            console.log("1");
        break;
        case "2" :
            console.log("2");
        break;
        case "3" :
            logout().then(function (response) {
                const {data:{code}}=response
                if(code===200){
                    message.success('操作成功')
                    localStorage.removeItem("user")
                    history.push({
                        pathname:'/active'
                    })
                }
                console.log("response",response);
            })
              .catch(function (error) {
                console.log("error",error);
              });
            
        break;
    
    }
    
  };
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
         /*  icon: <SmileOutlined />, */
      
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

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));





const Theme=(props:any)=>{
    const islogin=localStorage.getItem("user")
    const data=islogin?JSON.parse(islogin):""
    const {location:{pathname}}=props
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
                <div className="logo">logo</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 ,height:"100%"}}>
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div className='site-layout-header'>
                        <div>活动</div>
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
                    <div className="site-layout-menu" style={{ padding: 24, textAlign: 'center' }}>
                        {props.children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
    </Layout>
    )
}

export default Theme

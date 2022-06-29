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
            })
              .catch(function (error) {
                localStorage.removeItem("user")
                message.error("操作失败！错误信息："+error.message);
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
    const {location:{pathname},route}=props
    const [titlename,setTitlename]=useState([])
    let dizhi= pathname.split("/")
    const onadd=(key:string)=>{
        setTitlename((pretit):any=>{
            let arr=[]
            arr.push(key)
            return arr
        })
    }

    useEffect(()=>{
        if(route.path===pathname){
            return
        }else{
            let str=""
            let arrstr=[]
            for(let i=1;i<dizhi.length;i++){
                str+="/"+dizhi[i]
                arrstr.push(digui(route.routes,str))
            }
            setTitlename(arrstr)
        }
        
    },[pathname])
    /* 递归取数据 */
    const digui=(rout:any,path:any)=>{
        let arr2=""
        function find(cityData:any,id:any){
            for (let i = 0; i < cityData.length; i++) {
                if (cityData[i].path === id) {
                    arr2 = cityData[i].title
                    break
                }
                if (cityData[i].routes && cityData[i].routes.length > 0) {
                    find(cityData[i].routes, id);
                }
            }
            return arr2
        }
        return find(rout,path)
    }
    /* 点击跳转 */
    const goback=(index:any)=>{
        let newstr=""
        let newarr=dizhi.slice(1,2+index)
        for(let i=0;i<newarr.length;i++){
            newstr+="/"+newarr[i]
        }
        history.push({
            pathname:newstr
        })
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
                        
                        <div className='site-layoutitle'>
                            {
                                titlename.map((item:any, index:any)=>{
                                    return <span 
                                                key={index} 
                                                className={`${index===titlename.length-1?"site-layoutspan":""}`} 
                                                onClick={index===titlename.length-1?null:()=>{goback(index)}}
                                            >
                                                {`${index===titlename.length-1&&index!==0?"/":""}`} {item} 
                                            </span>
                                })
                            }
                        </div>
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

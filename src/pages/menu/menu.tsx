import {DownOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu,Dropdown,Space,Avatar,Image,message } from 'antd';
import type { MenuProps } from 'antd';
import { history } from "umi";
import React,{useEffect,useState} from 'react';

import { firstmenu,othersmenu } from '@/api/activeapi';

/* 左侧导航 */
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  
  const Menubar=()=>{
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [datalist,setDatalist]=useState([])
    useEffect(()=>{
        let menulist:any=[]
        firstmenu().then(res=>{
            const {data:{code,data}}=res
            if(code===200){
                menulist.push(data)
                formenu(data,menulist)
            }
            console.log(res,'一级导航');
            
        }).catch(error=>{
            console.log(error,'error');
        })
        
    },[])
    async function formenu(list:any,menulist:any){
        for(let i=0;i<list.length;i++){
            let query=list[i].menuId
            await othersmenu({"parentId":query}).then(res=>{
                const {data:{code,data}}=res
                list[i].data1=data
                setDatalist(list)
                console.log('二级级导航',res,list);
            })
        }
    }
    const items: MenuItem[] = datalist.map((item:any,index:any)=>{
       return getItem(item.menuName, 'sub1', <MailOutlined />,item.data1.map((item1:any)=>{
           return  getItem(item1.menuName, item1.menuId)
       }))
    })
    console.log("items",items);
    const rootSubmenuKeys = ['sub1'];
    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };

    return(
        <Menu 
            theme="dark" 
            mode="inline" 
            openKeys={openKeys} 
            defaultSelectedKeys={['234765385696768976']} 
            items={items} 
            onOpenChange={onOpenChange}
        />
    )
  }

  export default Menubar


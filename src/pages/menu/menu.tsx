import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { history,useLocation } from "umi";
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
  /* 获取一级菜单 */
  const Menubar=(props:any)=>{
    const{onadd}=props
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [datalist,setDatalist]=useState([])
    const [defitem,setDefitem]=useState(["234765385696768976"])
    const {pathname}=useLocation()
    useEffect(()=>{
        let menulist:any=[]
        firstmenu().then(res=>{
            const {data:{code,data}}=res
            if(code===200){
                menulist.push(data)
                formenu(data,menulist)
            }
        }).catch(error=>{
            console.log("获取导航失败",error);
        })
    },[])
    /* 循环获取2级菜单列表 */
    async function formenu(list:any,menulist:any){
        for(let i=0;i<list.length;i++){
            let query=list[i].menuId
            await othersmenu({"parentId":query}).then(res=>{
                const {data:{code,data}}=res
                list[i].data1=data
                setDatalist(list)
            })
        }
    }
    /* 处理获取到的菜单数据生产左侧菜单 */
    const items: MenuItem[] = datalist.map((item:any,index:any)=>{
       return getItem(item.menuName, 'sub1', <MailOutlined />,item.data1.map((item1:any)=>{
           return  getItem(item1.menuName, item1.menuId)
       }))
    })
    const rootSubmenuKeys = ['sub1'];
    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };


    /* 获取当前地址判断展示的内容 */
    const onmenuclick=({ key }:any)=>{
      
      if(key==="102"){
        onadd("抽奖白名单")
        history.push({
          pathname:'/luck'
        })
      }else if(key==="234765385696768976"){
        onadd("创建活动")
        history.push({
          pathname:'/active'
        })
      }else if(key==="344547686666666649"){
        onadd("活动评论")
        history.push({
          pathname:'/comment'
        })
      } 
    }
    return(
        <Menu 
            theme="dark" 
            mode="inline" 
            openKeys={openKeys} 
            defaultSelectedKeys={defitem} 
            items={items} 
            onOpenChange={onOpenChange}
            onClick={onmenuclick}
            /* selectedKeys={defitem} */
        />
    )
  }

  export default Menubar


import { Button } from 'antd';
import React,{useState,useEffect} from 'react';
import './addfoote.less'
const Addfooter=(props:any)=>{
    const {nonefrom,tabfrom,getform1,getform2}=props
    const[butname,setButname]=useState(["发布","上一步","下一步","预览","保存草稿"])
    useEffect(()=>{
        if(nonefrom==="1"){
            setButname(["下一步","预览","保存草稿"])
        }else if(nonefrom==="2"){
            setButname(["发布","上一步","预览","保存草稿"])
        }
        
    },[nonefrom])

    const onfooter=(item:any)=>{
        if(item==="下一步"){
            getform1()//触发表单一的提交

        }else if(item==="上一步"){
            tabfrom("1")//返回上一步
        }else if(item==="发布"){
            getform2("发布")//触发表单二的提交
        }else if(item==="保存草稿"){
            getform2("保存草稿")
        }
        
    }
    return(
        <div className="addfooter">
            {
                butname.map((item,index)=>{
                    return <Button size="large" key={item} onClick={()=>{onfooter(item)}} className={`${index===0?"addfooter_but":""}`}>{item}</Button>
                })
            }
        </div>
    )
}

export default Addfooter
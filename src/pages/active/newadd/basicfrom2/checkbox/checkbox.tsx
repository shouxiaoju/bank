import { Button, Space } from 'antd';
import React,{useEffect, useState} from 'react';
import "./check.less"


const Check=(props:any )=>{
   
    const [listdata,setListdata]=useState(["姓名","姓别","图片","手机号","生日","QQ号","邮箱","学院","年级","班级","学号","特长","备注"])
    const {value = [],onChange }:any=props
    const [checkcount,setCheckcount]=useState([])
    const triggerChange = (changedValue: { checkcount?: any; }) => {      
        onChange ?.({ checkcount, ...value, ...changedValue });
    };
    useEffect(()=>{
        if(value.checkcount.length>0){
            setCheckcount(value.checkcount)
        }
    },[props])
    const check=(name:any)=>{
        let flag=checkcount.indexOf(name)
        if(flag===-1){
            setCheckcount((preount):any=>{
                let arr=[...preount]
                arr.push(name)
                triggerChange({checkcount:arr})
                return arr
            })
        }else{
            setCheckcount((preount):any=>{
                let arr=[...preount]
                arr.splice(flag,1)
                triggerChange({checkcount:arr})
                return arr
            })
        }
    }
    return (
        <Space size={[12, 12]} wrap className="check">
            {
                listdata.map((item,index):any=>{
                    return <div key={item} className={`${checkcount.includes(item)?'check_div check_div1':"check_div"}`} onClick={()=>{check(item)}} >{item}</div>
                })
            }
            {/* <div className={`${checkcount.includes("姓名")?'check_div check_div1':"check_div"}`} onClick={()=>{check("姓名")}}>姓名</div>
            <div className={`${checkcount.includes("姓别")?'check_div check_div1':"check_div"}`} onClick={()=>{check("姓别")}}>姓别</div>
            <div className={`${checkcount.includes("图片")?'check_div check_div1':"check_div"}`} onClick={()=>{check("图片")}}>图片</div>
            <div className={`${checkcount.includes("手机号")?'check_div check_div1':"check_div"}`} onClick={()=>{check("手机号")}}>手机号</div>
            <div className={`${checkcount.includes("生日")?'check_div check_div1':"check_div"}`} onClick={()=>{check("生日")}}>生日</div>
            <div className={`${checkcount.includes("QQ号")?'check_div check_div1':"check_div"}`} onClick={()=>{check("QQ号")}}>QQ号</div>
            <div className={`${checkcount.includes("邮箱")?'check_div check_div1':"check_div"}`} onClick={()=>{check("邮箱")}}>邮箱</div>
            <div className={`${checkcount.includes("学院")?'check_div check_div1':"check_div"}`} onClick={()=>{check("学院")}}>学院</div>
            <div className={`${checkcount.includes("年级")?'check_div check_div1':"check_div"}`} onClick={()=>{check("年级")}}>年级</div>
            <div className={`${checkcount.includes("班级")?'check_div check_div1':"check_div"}`} onClick={()=>{check("班级")}}>班级</div>
            <div className={`${checkcount.includes("学号")?'check_div check_div1':"check_div"}`} onClick={()=>{check("学号")}}>学号</div>
            <div className={`${checkcount.includes("特长")?'check_div check_div1':"check_div"}`} onClick={()=>{check("特长")}}>特长</div>
            <div className={`${checkcount.includes("备注")?'check_div check_div1':"check_div"}`} onClick={()=>{check("备注")}}>备注</div> */}
        </Space>
    )
}

export default Check
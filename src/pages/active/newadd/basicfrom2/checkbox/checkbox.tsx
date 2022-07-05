import { Space } from 'antd';
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
        </Space>
    )
}

export default Check
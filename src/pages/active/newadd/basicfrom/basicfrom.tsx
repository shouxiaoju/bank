import { Button, TreeSelect, Form, Input,Row ,Col,Cascader } from 'antd';
import type { TreeSelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React,{useState,useEffect} from 'react';
import { address,address2 } from '@/api/activeapi';




const Basicfrom = () => {

    

    




  
 
/* 处理城市接口数据 */

    const [options, setOptions] = useState([]);
    const onChange = (value:any , selectedOptions:any ) => {
        console.log("onChange",value, selectedOptions);
    };
    const loadData = (selectedOptions: any) => {
        address2({"addressLevel":2,"parentId": selectedOptions[0].value}).then((res)=>{
            const{data:{code,data}}=res
            if(code===200){
                setOptions((pertreeData):any=>{
                    let arr1=[...pertreeData]
                    for(let i =0;i<arr1.length;i++){
                        if(arr1[i].value===data[0].parentId){
                            arr1[i]["children"]=data.map((item:any)=>{
                                return {
                                    value: item.addressCode,
                                    label: item.addressName ,
                                    isLeaf:true,
                                }
                            })
                            break
                        }
                    }
                    console.log("城市",arr1);
                    
                    return arr1
                })
            }
            
        })
    };

    useEffect(()=>{
        address({"addressLevel":1}).then((res)=>{
            const{data:{code,data}}=res
            if(code===200){
                setOptions((pertreeData):any=>{
                    return data.map((item:any)=>{
                        if(item.addressName==="其他"){
                            item["isLeaf"]=true
                        }else{
                            item["isLeaf"]=false
                        }
                        return {
                            value: item.addressCode,
                            isLeaf:item.isLeaf,
                            label: item.addressName,
                        }
                    })
                })
            }
        })
    },[])

    /* 表单1操作数据 */
    const onFinish = (values:any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <Form
      name="basic"
      colon={false}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    <Row>
      <Col span={12}>
        <Form.Item
            name="name"
            label="活动名称"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input placeholder="请输入活动名称" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="地区选择">
            <Cascader placeholder="请选择活动所属地" options={options} loadData={loadData} onChange={onChange}  />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="所属分行">
        
        </Form.Item>
      </Col>
    </Row>
       
    </Form>
  );
};

export default Basicfrom;
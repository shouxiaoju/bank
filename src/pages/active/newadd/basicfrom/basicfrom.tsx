import { Button, TreeSelect, Form, Input,Row ,Col} from 'antd';
import type { TreeSelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React,{useState,useEffect} from 'react';
import { address,address2 } from '@/api/activeapi';
const Basicfrom = () => {

    const [value, setValue] = useState<string>();
    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
    

  const onFinish = (values:any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };


 const onLoadData: TreeSelectProps['loadData'] = ({ id,value }) =>{
    
        return new Promise(resolve => {
            address2({"addressLevel":2,"parentId": id}).then((res)=>{
                console.log("2城市",res);
                const{data:{code,data}}=res
                setTreeData((pertreeData):any=>{
                    let arr= data.map((item:any)=>{
                        return {
                            id: item.addressCode,
                            pId: item.parentId,
                            value: item.addressCode,
                            title: item.addressName ,
                            isLeaf:true,
                        }
                    })
                    return pertreeData.concat(arr)
                })
                resolve(undefined)  
            })
        });
    }

    const onChange1 = (newValue: string) => {
        setValue(newValue);
    };

    useEffect(()=>{
        address({"addressLevel":1}).then((res)=>{
            console.log("城市",res);
            const{data:{code,data}}=res
            setTreeData((pertreeData):any=>{
                return data.map((item:any)=>{
                    if(item.addressName==="其他"){
                        item["isLeaf"]=true
                    }else{
                        item["isLeaf"]=false
                    }
                    return {
                        id: item.addressCode,
                        pId: item.parentId,
                        value: item.addressCode,
                        title: item.addressName ,
                        isLeaf:item.isLeaf,
                    }
                })
            })
            
        })
  },[])

  return (
    <Form
      name="basic"
      
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
            <Input placeholder="input placeholder" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="所属分行">
            <TreeSelect
                treeDataSimpleMode
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                onChange={onChange1}
                loadData={onLoadData}
                treeData={treeData}
            />
        </Form.Item>
      </Col>
    </Row>
       
    </Form>
  );
};

export default Basicfrom;
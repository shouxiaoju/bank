
import { Button, Form, Input, DatePicker,TreeSelect} from 'antd';
import type { TreeSelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { FormInstance } from 'antd/es/form';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import React, { useEffect, useState } from 'react';
import './index.less'
import { address,address2 } from '@/api/activeapi';

const { RangePicker }:any = DatePicker;
const Actsear = (props:any) => {
  
  const{onsearch,onrest}=props
    const [form] = Form.useForm();
    const [value, setValue] = useState<string>();
    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
    
    /* const onLoadData: TreeSelectProps['loadData'] = ({ id,value }) =>{
    
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
 */
    /* const onChange1 = (newValue: string) => {
        setValue(newValue);
    }; */

   /*  useEffect(()=>{
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
  },[]) */

/* 重置 */

const onReset = () => {
  form.resetFields();
  onrest()
};
/* 搜索 */
const onFinish = (values: any) => {
  console.log("values",values);
  
  onsearch(values)
};


  return (
    <Form
      /* {...formItemLayout} */
      layout="inline"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="活动名称" name="name">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="创建时间" name="time">
        {/* <DatePicker  locale={locale} placement="topLeft"/> */}
        <RangePicker placement="topLeft" locale={locale} />
      </Form.Item>
      {/* <Form.Item label="所属分行">
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
      </Form.Item> */}
      <Form.Item className='search_but'>
        <Button  className='but1' htmlType="submit"  >搜索</Button>
        <Button  className='but2' htmlType="button" onClick={onReset}>重置</Button>
        
      </Form.Item>
    </Form>
  );
};

export default Actsear;

import { Button, Form, Input, DatePicker} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import React, { useEffect, useState } from 'react';
import './index.less'


const { RangePicker }:any = DatePicker;
const Actsear = (props:any) => {
  
  const{onsearch,onrest}=props
  const [form] = Form.useForm();

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
        <RangePicker placement="topLeft" locale={locale} />
      </Form.Item>
      <Form.Item className='search_but'>
        <Button  className='but1' htmlType="submit"  >搜索</Button>
        <Button  className='but2' htmlType="button" onClick={onReset}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export default Actsear;
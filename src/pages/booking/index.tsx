import { doCardHotelReq } from '@/redux/action/actionHotel';
import { Button, Checkbox, Form, Input, DatePicker, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
const { RangePicker } = DatePicker;

export default function Booking(){

    let root = useRouter()
const {id} =root.query
const dispatch = useDispatch();
let card = useSelector((state : any) => state.HotelReducer.hotel)

const [cardByOne, setCardByOne]= useState({
    hotel_id: 0,
    hotel_name: '',
    hotel_description: '',
    hotel_rating_star: 0,
    hotel_phonenumber: 0,
    faci_hotelall: '',
    url: '',
    place: '',         
})

useEffect(()=>{
    dispatch(doCardHotelReq());
    let result = card.filter((e: { hotel_id: string | string[] | undefined; }) => e.hotel_id ==  id)[0];
    setCardByOne({...result})
},[id])

console.log('booking', cardByOne)

    return (
        <div className="container mx-auto">
            <h1 className="flex justify-center md:font-bold font-serif text-2xl">Booking</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='md:mt-7'
            >
               <Form.Item
                label="Order Number"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                label="Hotel"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={cardByOne.hotel_name} placeholder={cardByOne.hotel_name} readOnly/>
                </Form.Item>
                <Form.Item
                label="User Name"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item> 
                <Form.Item label="Arrival Date"
                name="arrival"
                rules={[{ required: true, message: 'Please input arrival' }]}
                >
                    <RangePicker />
                </Form.Item>
                <Form.Item
                label="Total room"
                name="room"
                rules={[{ required: true, message: 'Please input total room' }]}
                >
                    <Input />
                </Form.Item> 
                <Form.Item
                label="Total Guest"
                // name="guest"
                rules={[{ required: true, message: 'Please input total guest' }]}
                >
                    <Form.Item
                            name="adults"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} >
                            <Input placeholder="Adults" />
                    </Form.Item>
                    <Form.Item
                        name="kids"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }} >
                        <Input placeholder="Kids" />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                label="Discount"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item> 
                <Form.Item
                label="Total Tax"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item> 
                <Form.Item
                label="Total Amount"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item> 
                <Form.Item
                label="Down Payment"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item> 
                <Form.Item
                label="Payment Type"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Select
                        defaultValue="Credit Card"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'CR', label: 'Credit Card' },
                            { value: 'C', label: 'Cash' },
                            { value: 'D', label: 'Debet' },
                            { value: 'PG', label: 'Paymet Gateawey' },
                        ]}
                    />
                </Form.Item> 
                <Form.Item
                label="Guest Type"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Select
                        defaultValue="Individual"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'TA', label: 'Travel Agent' },
                            { value: 'C', label: 'Corporate' },
                            { value: 'I', label: 'Individual' },
                        ]}
                    />
                </Form.Item> 
                <Form.Item
                label="Card Number"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
    )
}
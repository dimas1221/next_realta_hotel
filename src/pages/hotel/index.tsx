import React, { useEffect, useState } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Space, Carousel } from 'antd';
import {FileTextOutlined, StarOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { doCardHotelReq } from '@/redux/action/actionHotel';
import { doAllFaciHotelReq } from '@/redux/action/actionFindFaciAllhotel';



const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  

export default function index() {

const { Meta } = Card;
let root = useRouter()
const {id} =root.query

// modal booking
const [loading, setLoading] = useState(false);
const [open, setOpen] = useState(false);

const handleOk = () => {
  setLoading(true);
  setTimeout(() => {
  setLoading(false);
  setOpen(false);
  }, 3000);
};

const handleCancel = () => {
  setOpen(false);
};
//end

const dispatch = useDispatch();
let card = useSelector((state : any) => state.HotelReducer.hotel)

let faci = useSelector((state:any) => state.FaciAllHotelReducer.facihotel)
const detail = faci.filter((item:any) => item.hotel_id == id)

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
    dispatch(doAllFaciHotelReq())
    let result = card.filter((e: { hotel_id: string | string[] | undefined; }) => e.hotel_id ==  id)[0];
    setCardByOne({...result})
},[id])

  return (
        <div className="md:container md:mx-auto">
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <div className='card2'>
                {/* ini gambar */}
                <div className='m-5 mb-6'>
                    <img 
                className='w-full '
                src={cardByOne.url} alt="hotels" 
                /></div>
                
                    <div  className='ml-5 mr-5 mb-5 flex flex-col gap-3'>

                    {/* badge */}
                    <div className='flex  justify-between items-center'>
                        {/* hotle title */}
                        <h2 className='hotel-title' title='Best Hotel Ever'>
                            {cardByOne.hotel_name}
                        </h2>  
                        <span className=' font-reguler'>{cardByOne.place}</span>
                    </div>
                    <span className='flex items-center font-bold'>
                            <img className='w-3 h-3 mr-1' src="./img/strar.png" alt="star" /> 
                            {cardByOne.hotel_rating_star}
                        </span>

                    {/* action button */}
                    <div className='mt-2 flex gap-2 items-center justify-between'>
                        <span className='text-sm font-medium '>
                        {cardByOne.hotel_phonenumber}
                        </span>
                    </div>
                </div>
                </div>
                <>
                
                    <Card className='mt-3' title="Special Offers" extra={<a href="#">More</a>} bordered={false} >
                        <p className='font-bold'>Promo Discount 120%</p>
                        <p>Angkasa Pura Hotel dan maskapai bintang 5 "Garuda Indonesia" bekerjasama dalam program loyalti Concordia Lounge <br /> 
                        Potongan harga 20% bagi pemilik kartu member GarudaMiles tipe Blue & Silver <br />
                        Promo berlaku di Concordia Lounge seluruh Bandara PT Angkasa Pura I (Persero) Indonesia <br />
                        Promo berlaku mulai tanggal 10 Agustus 2018 s.d 09 Februari 2019 </p>
                        <p className='italic font-bold'><br />*Syarat & ketentuan berlaku</p>
                        <Button type="primary" onClick={() => setOpen(true)} className='bg-red-500 mt-3 '>
                            Booking Now
                        </Button>
                    </Card>     
                {/* </div> */}
                <Modal
                    title="Booking Order"
                    centered
                    open={open}
                    onOk={handleOk}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                        Cancle
                        </Button>,
                        <Button key="Booking" type="primary" loading={loading} onClick={handleOk} className='bg-yellow-300'>
                        Booking
                        </Button>]}
                    onCancel={() => setOpen(false)}
                    width={500}
                >
                    <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                        <Form.Item
                        label="Check-In"
                        name="CheckIn"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                        label="Check-Out"
                        name="CheckOut"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                        label="Guest"
                        name="Guest"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Price"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Order Extra"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Discount"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Tax"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Subtotal"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                </>
            </Col>
            <Col xs={24} md={12}>
                <div className='card2'>
                <h1 className='bg-[#131828] text-white p-4 rounded-lg text-base ml-3 mr-3 mr-3 mt-2'>Description</h1>
                <span className='ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2'>{cardByOne.hotel_description}</span>
                <h1 className='bg-[#131828] text-white p-4 rounded-lg text-base ml-3 mr-3'>Facility</h1>
                <span className='ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2 '>{cardByOne.faci_hotelall}</span>
                </div>
                <span>foto :</span>
                <div className='flex flex-wrap md:flex-no-wrap -mx-3 items-center justify-center gap-6 m-10 '>
                {detail && detail.map((faci:any, i:any)=>{
                return(
                    <Card
                            hoverable
                            style={{ width: 150 }}
                            cover={<img alt="example" src={faci.fapho_url} />}>
                            <Meta title={faci.faci_name}/>
                            <div className='flex justify-between'>
                                <span>{faci.faci_discount}</span>
                                <button className='button-primary1'>
                                Action
                                </button>
                            </div>
                    </Card>
                )})} 
                </div>
            </Col>
        </Row>
        <Row className='mt-5'>
            <Col span={24}>
                <div>
                <h2 className='bg-[#131828] text-white p-4 rounded-lg text-xl'>Review user :</h2>
                    <Card className='mt-2 mb-1' title={'suldani'} extra={<img alt='profil'  src='./img/profil.png' style={{width:30}}/>} style={{ width: '100%' }}> 
                        <div className='flex justify-between'>
                        <Space><StarOutlined className='mb-2' /><p>5</p></Space>
                        <p>12-08-2022</p>
                        </div> 
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora sapiente repellat minus officiis voluptate nobis? Minima, dolores sapiente? Porro omnis officia quia laborum sed, debitis provident tempora corrupti commodi. Excepturi.</p>
                    </Card>
                </div>
            </Col>
        </Row>
        </div>
        )
}


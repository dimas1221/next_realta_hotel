import React, { useEffect, useState } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row, Space, Carousel } from 'antd';
import {FileTextOutlined, StarOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { doCardHotelReq } from '@/redux/action/actionHotel';
import { doAllFaciHotelReq } from '@/redux/action/actionFindFaciAllhotel';
import { doGetHore } from '@/redux/action/actionHore';
import { Zoom, Slide } from "react-slideshow-image";


// modul booking
const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
// modul booking
  
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

// slide card
const zoomInProperties = {
    indicators: true,
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,

    prevArrow: (
        <div style={{ width: "0.5px", marginRight: "-30px", cursor: "pointer" }}>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#2e2e2e"
            >
                <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
            </svg> */}
        </div>
    ),
    nextArrow: (
        <div style={{ width: "0.5px", marginLeft: "-30px", cursor: "pointer" }}>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#2e2e2e"
            >
                <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
            </svg> */}
        </div>
    ),
};
// end
const dispatch = useDispatch();

// reducer hotel
let card = useSelector((state : any) => state.HotelReducer.hotel)
let faci = useSelector((state:any) => state.FaciAllHotelReducer.facihotel)
let horeData = useSelector((state:any)=>state.HoreReducer.hore)

const detail = faci.filter((item:any) => item.hotel_id == id)
const oneHore = horeData.filter((item:any)=> item.hore_hotel_id == id)

// end

// modul hotel
useEffect(()=>{
    dispatch(doAllFaciHotelReq())
    dispatch(doGetHore())
},[id])


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
// end

let arr = cardByOne.url;
let array = arr.split(",")
  return (
        <div className="md:container md:mx-auto">
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <div className='card2'>
                {/* ini gambar */}
                <div className='m-5 mb-6'>
                <Slide {...zoomInProperties}>
                    {array.map((each: any, index: React.Key | null | undefined) => (
                    <div key={index} className="flex justify-center w-full h-full">
                    <img 
                        className='w-full '
                        src={each} alt="hotels" 
                    />
                       </div>
                    ))}
                </Slide>
                </div>
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
                {/* modul booking */}
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
                {/* end */}
            </Col>
            <Col xs={24} md={12}>
                <div className='card2'>
                <h1 className=' text-2xl text-center text-[#131828] ml-3 mr-3 mt-2'>Description</h1>
                <hr className="w-10/12 h-1 mx-auto border-b-4 border-t-4 rounded-full bg-[#131828] mt-3 mb-3"></hr>
                <div className='w-10/12 mx-auto'>
                    <span className='ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2 text-justify'>{cardByOne.hotel_description}</span>
                </div>
                <h1 className=' text-2xl text-center text-[#131828] ml-3 mr-3'>Facility</h1>
                <hr className="w-10/12 h-1 mx-auto border-b-4 border-t-4 rounded-full bg-[#131828] mt-3 mb-3"></hr>
                <div className='w-10/12 mx-auto'>
                    <span className='ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2 text-justify'>{cardByOne.faci_hotelall}</span>
                </div>
                </div>
                <div className='flex flex-wrap md:flex-no-wrap -mx-3 items-center gap-3 justify-center m-5'>
                {detail && detail.map((faci:any, i:any)=>{
                    let arr = faci.fapho_url
                    let array = arr.split(",")
                    console.log('ab', array)
                return(
                    <Card hoverable style={{ width: 200 }} className='  w-4/12'>
                        <Meta title={faci.faci_name}/>
                                <Slide {...zoomInProperties}>
                                    {array.map((each: any, index: React.Key | null | undefined) => (
                                    <div key={index} className="flex justify-center w-full h-full">
                                    <img alt="ex" src={each}  className='w-2/3'/>
                                    </div>
                                    ))}
                                </Slide>
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
        <Row className='mt-5 mb-5'>
            <Col span={24}>
                <div>
                <h2 className='bg-[#131828] text-white p-4 rounded-lg text-xl'>Review user :</h2>
                {oneHore && oneHore.map((hore:any, i:any)=>{
                    return(
                        <Card className='mt-2 mb-1' title={hore.user_full_name} extra={<img alt='profil'  src='./img/profil.png' style={{width:30}}/>} style={{ width: '100%' }}> 
                            <div className='flex justify-between'>
                            <Space><StarOutlined className='mb-2' /><p>{hore.hore_rating}</p></Space>
                            <p>{hore.hore_created_on}</p>
                            </div> 
                            <p>{hore.hore_user_review}</p>
                        </Card>
                    )
                })}
                </div>
            </Col>
        </Row>
        </div>
        )
}


import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Space } from 'antd';
import {FileTextOutlined, StarOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { doCardHotelReq } from '@/redux/action/actionHotel';


export default function index() {
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

const submit = (id:any)=>{
    root.push({
        pathname:'/booking',
        query:{id}
      },)
}

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
                    <button className='button-primary' onClick={()=>submit(cardByOne.hotel_id)}>
                        Booking
                    </button>
                    </div>
                </div>
                </div>
            </Col>
            <Col xs={24} md={12}>
                <div className='card2'>
                <h1 className='bg-[#131828] text-white p-4 rounded-lg text-xl ml-3 mr-3 mr-3 mt-2'>Description</h1>
                <span className='ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2'>{cardByOne.hotel_description}</span>
                <h1 className='bg-[#131828] text-white p-4 rounded-lg text-xl ml-3 mr-3'>Facility</h1>
                <span className='ml-4 mt-3 mb-3 text-base text-[#131828] flex gap-2 '>{cardByOne.faci_hotelall}</span>
                <div className='mt-2 flex gap-2 items-center justify-end ml-3 mr-3 mb-3'>
                <button className='button-primary'>
                        Resto1
                    </button>
                    <button className='button-primary'>
                        Resto2
                    </button>
                    <button className='button-primary'>
                        Resto3
                    </button>
                    </div>
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

// {
//     ...cardByOne,
//     hotel_id: result.hotel_id,
//     hotel_name: result.hotel_name,
//     hotel_description: result.hotel_description,
//     hotel_rating_star: result.hotel_rating_star,
//     hotel_phonenumber: result.hotel_phonenumber,
//     faci_hotelall: result.faci_hotelall,
//     url: result.url,
//     place: result.place,
// }

// hotel_id: 0,
//         hotel_name:'',
//         hotel_description:'',
//         hotel_rating_star:0,
//         hotel_phonenumber:0,
//         faci_hotelall:'',
//         url: '',
//         place:''


import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Space } from 'antd';
import {StarOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';


export default function index() {
const { Meta } = Card;
const root = useRouter()
const dispatch = useDispatch();
const {id} =root.query

const [dataCard, setDataCard]= useState({
    hotel_name :'',
    hotel_description:'',
    hotel_rating_star:0,
    hotel_phonenumber:'',
    faci_hotelall:'',
    url:'',
    place:''

})

// useEffect(()=>{
//     dispatch(doIdCardReq(id))
// },[id])
  return (
    <div className="md:container md:mx-auto">
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <div className='card2'>
                {/* ini gambar */}
                <div className='m-5 mb-6'>
                    <img 
                className='w-full '
                src="./img/hotel1.png" alt="hotels" 
                /></div>
                
                    <div  className='ml-5 mr-5 mb-5 flex flex-col gap-3'>

                    {/* badge */}
                    <div className='flex  justify-between items-center'>
                        {/* hotle title */}
                        <h2 className='hotel-title' title='Best Hotel Ever'>
                            Grand hotel
                        </h2>  
                        <span className=' font-reguler'>indonesia</span>
                    </div>
                    <span className='flex items-center font-bold'>
                            <img className='w-3 h-3 mr-1' src="./img/strar.png" alt="star" /> 5
                        </span>

                    {/* action button */}
                    <div className='mt-2 flex gap-2 items-center justify-between'>
                        <span className='text-sm font-medium '>
                        Contact : +62 843 6789 9064
                        </span>
                    <button className='button-primary'>
                        Booking
                    </button>
                    </div>
                </div>
                </div>
            </Col>
            <Col xs={24} md={12}>
                <div>
                <h1 className='bg-[#131828] text-white p-4 rounded-lg text-xl'>Description</h1>
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas accusamus nisi in eum modi quis ipsam. Explicabo sapiente qui voluptatibus perspiciatis corporis architecto sint unde, reprehenderit amet similique debitis hic!</span>
                <h1 className='bg-[#131828] text-white p-4 rounded-lg text-xl'>Facility</h1>
                <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni quos inventore quod ipsam fuga consectetur vitae animi voluptas minus quibusdam eveniet odit tempore minima, suscipit atque reprehenderit doloremque optio. Ipsa?</h1>
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

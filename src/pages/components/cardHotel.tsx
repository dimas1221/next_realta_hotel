import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { doCardHotelReq } from '@/redux/action/actionHotel'
import {useRouter} from 'next/router'
interface Props {
    text: string;
  }
  
export default function CardHotel() {

  const dispatch = useDispatch()
  const root = useRouter()
  
  let card = useSelector((state:any) => state.HotelReducer.hotel)
  // let faci = useSelector((state:any) => state.FaciAllHotelReducer.facihotel)




  //  console.log(faci)
    const submit = (id:any)=>{
      root.push({
        pathname:'/hotel',
        query:{id}
      },)
    }

  return (
    card && card.map((card:any, i:any)=>{
        return(
          <div className='card w-full md:w-1/4 p-3'>
            {/* ini gambar */}
            <div className='m-5 mb-6'>
              <img 
            className='w-full '
            src={card.url} alt="hotels" 
            /></div>
            
              <div  className='ml-5 mr-5 mb-5 flex flex-col gap-3'>

                {/* badge */}
                <div className='flex  justify-between items-center'>
                    {/* hotle title */}
                    <h2 className='hotel-title' title='Best Hotel Ever'>
                      {card.hotel_name}
                    </h2>
                    <span className='flex items-center '>
                      <img className='w-3 h-3 mr-1' src="./img/strar.png" alt="star" /> {card.hotel_rating_star}
                    </span>  
                </div>
                <span className=' font-reguler font-reguler text-sm'>{card.place}</span>
                {/* hotel deskrip */}
                <div>
                  <div className='flex items-center gap-2 mt-1'>
                    <span className='text-sm font-medium opacity-50 text-justify'> 
                    {card.hotel_description}
                    </span>
                  </div>
                </div>

                {/* contact */}
                <div className='mt-2 flex gap-2 items-center justify-between'>
                <span className='text-sm font-medium '>
                   {card.phonenumber}
                  </span>
                  <button className='button-primary' onClick={()=>submit(card.hotel_id)}>
                      Detail
                  </button>
                </div>
              </div>
          </div>
        )
    })
  )
}



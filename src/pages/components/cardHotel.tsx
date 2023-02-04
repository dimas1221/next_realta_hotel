import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { doCardHotelReq } from '@/redux/action/actionHotel'

interface Props {
    text: string;
  }
  
  const truncateWords = (text: string, maxWords: number): string => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };


export default function CardHotel() {

    let card = useSelector(state => state.HotelReducer.hotel)
    console.log(card)
    const dispatch = useDispatch()

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
                    {truncateWords(card.hotel_description, 20)}
                    </span>
                  </div>
                </div>

                {/* contact */}
                <div className='mt-2 flex gap-2 items-center justify-between'>
                <span className='text-sm font-medium '>
                   {card.phonenumber}
                  </span>
                  <button className='button-primary'>
                      Detail
                  </button>
                </div>
              </div>
          </div>
        )
    })
  )
}



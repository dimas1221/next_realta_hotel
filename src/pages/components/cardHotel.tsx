import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doCardHotelReq } from "@/redux/action/actionHotel";
import { useRouter } from "next/router";
import { Zoom, Slide } from "react-slideshow-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faDumbbell,
  faSwimmingPool,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
interface Props {
  text: string;
}

export default function CardHotel() {
  const dispatch = useDispatch();
  const root = useRouter();

  let card = useSelector((state: any) => state.HotelReducer.hotel);
  // let faci = useSelector((state:any) => state.FaciAllHotelReducer.facihotel)

  const zoomInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    prevArrow: (
      <div
        style={{ width: "1px", marginRight: "-30px", cursor: "pointer" }}
        className="opacity-75"
      ></div>
    ),
    nextArrow: (
      <div
        style={{ width: "1px", marginLeft: "-30px", cursor: "pointer" }}
      ></div>
    ),
  };

  //  console.log(faci)
  const submit = (id: any) => {
    root.push({
      pathname: "/hotel",
      query: { id },
    });
  };

  return (
    card &&
    card.map((card: any, i: any) => {
      let arr = card.url;
      let array = arr.split(",");
      return (
        <div className="card md:w-1/4 p-3">
          {/* ini gambar */}
          <div className="m-5 mb-6">
            <Slide {...zoomInProperties}>
              {array.map((each: any, index: React.Key | null | undefined) => (
                <div key={index} className="flex justify-center w-full h-full">
                  <img className="w-full " src={each} alt="hotels" />
                </div>
              ))}
            </Slide>
          </div>
          <div className="ml-5 mr-5 mb-5 flex flex-col gap-3">
            {/* badge */}
            <div className="flex  justify-between items-center">
              {/* hotle title */}
              <h2 className="hotel-title" title="Best Hotel Ever">
                {card.hotel_name}
              </h2>
              <span className="flex items-center ">
                <img
                  className="w-3 h-3 mr-1"
                  src="./img/strar.png"
                  alt="star"
                />{" "}
                {card.hotel_rating_star}
              </span>
            </div>
            <span className=" font-reguler font-reguler text-sm">
              {card.place}
            </span>
            {/* hotel deskrip */}
            <div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium opacity-50 text-justify">
                  {card.hotel_description}
                </span>
              </div>
            </div>

            {/* contact */}
            <div className="mt-2 flex gap-2 items-center justify-between">
              <span className="text-sm font-medium ">
                {card.hotel_phonenumber}
              </span>
              <button
                className="button-primary"
                onClick={() => submit(card.hotel_id)}
              >
                Detail
              </button>
            </div>
            {/* icon */}
            {/* <div className='flex-start gap-6'>
                <span className='bg-[#131828]'>
                <FontAwesomeIcon icon={faSwimmingPool} className='text-white'/> | 
                <FontAwesomeIcon icon={faUtensils} className='text-white'/>  | 
                <FontAwesomeIcon icon={faDumbbell} className='text-white'/>
                </span>
                </div> */}
          </div>
        </div>
      );
    })
  );
}

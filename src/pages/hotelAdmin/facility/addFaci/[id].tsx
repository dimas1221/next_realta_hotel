import { doMaxRoomIdReq } from "@/redux/action/actionMaxId";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function addFaci() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  // validasi from input room number
  const IdRoom = useSelector(
    (state: any) => state.RoomNumberReducer.RoomNumber
  );
  //   data resto
  const [data1, setData1] = useState({
    faci_cagro_id: 0,
    max_roomid: "",
  });
  // data room
  const [data2, setData2] = useState({
    faci_cagro_id: 0,
    max_roomid: "",
  });
  //   meeting room
  const [data3, setData3] = useState({
    faci_cagro_id: 0,
    max_roomid: "",
  });
  //   gym
  const [data4, setData4] = useState({
    faci_cagro_id: 0,
    max_roomid: "",
  });

  const [resto, setResto] = useState();
  const [room, setRoom] = useState();
  const [meetRoom, setMeetRoom] = useState();
  const [gym, setGym] = useState();
  useEffect(() => {
    dispatch(doMaxRoomIdReq());

    const result1 = IdRoom.find((item: any) => item.faci_cagro_id == 1);
    setResto(result1);
    const result2 = IdRoom.find((item: any) => item.faci_cagro_id == 2);
    setRoom(result2);
    const result3 = IdRoom.find((item: any) => item.faci_cagro_id == 3);
    setMeetRoom(result3);
    const result4 = IdRoom.find((item: any) => item.faci_cagro_id == 4);
    setGym(result4);
  }, [IdRoom, id]);

  useEffect(() => {
    if (resto) {
      setData1(resto);
    }
  }, [resto]);

  useEffect(() => {
    if (room) {
      setData2(room);
    }
  }, [room]);

  useEffect(() => {
    if (meetRoom) {
      setData3(meetRoom);
    }
  }, [meetRoom]);
  useEffect(() => {
    if (gym) {
      setData4(gym);
    }
  }, [gym]);

  // room
  let room2 = data2.max_roomid;
  let counter = parseInt(room2.slice(1));
  let hasil2 = "R" + (counter + 1).toString().padStart(4, "0");
  //   resto
  let resto1 = data1.max_roomid;
  let counter1 = parseInt(resto1.slice(2));
  let hasil1 = "RT" + (counter1 + 1).toString().padStart(4, "0");
  //   meet room
  let mr3 = data3.max_roomid;
  let counter3 = parseInt(mr3.slice(2));
  let hasil3 = "MR" + (counter3 + 1).toString().padStart(4, "0");
  //   gym
  let g4 = data4.max_roomid;
  let counter4 = parseInt(g4.slice(1));
  let hasil4 = "G" + (counter4 + 1).toString().padStart(4, "0");

  //   add faci hotel
  const [dataFaci, setDataFaci] = useState({
    faci_name: "",
    faci_description: "",
    faci_max_number: 0,
    faci_measure_unit: "",
    faci_room_number: "",
    faci_startdate: "",
    faci_endate: "",
    faci_low_price: "",
    faci_hight_price: "",
    faci_rate_price: "",
    faci_discount: "",
    faci_tax_rate: "",
    faci_modified_date: new Date().toISOString().substr(0, 10),
    faci_cagro_id: 0,
    faci_hotel_id: id,
  });

  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setDataFaci({ ...dataFaci, [item]: event.target.value });
    };

  const handlerMunit = (value: any) => {
    setDataFaci({ ...dataFaci, faci_measure_unit: value });
  };

  const handlerCagroId = (value: any) => {
    setDataFaci({ ...dataFaci, faci_cagro_id: value });
  };

  useEffect(() => {
    setDataFaci({ ...dataFaci, faci_hotel_id: id });
    if (dataFaci.faci_cagro_id === 1) {
      setDataFaci({ ...dataFaci, faci_room_number: hasil1 });
    } else if (dataFaci.faci_cagro_id === 2) {
      setDataFaci({ ...dataFaci, faci_room_number: hasil2 });
    } else if (dataFaci.faci_cagro_id === 3) {
      setDataFaci({ ...dataFaci, faci_room_number: hasil3 });
    } else if (dataFaci.faci_cagro_id === 4) {
      setDataFaci({ ...dataFaci, faci_room_number: hasil4 });
    }
  }, [dataFaci.faci_cagro_id, id]);

  return (
    <div className="w-3/4 mx-auto ">
      <div className="flex justify-center items-center mt-5 mb-5">
        <span className="text-2xl">Add Data Facilities</span>
      </div>
      {/* form */}
      <Form
        form={form}
        layout="vertical"
        className="bg-white p-6 rounded-lg w-3/4 mx-auto"
      >
        <Form.Item className="" label="faci_name">
          <Input
            placeholder=""
            value={dataFaci.faci_name}
            onChange={eventHandler("faci_name")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_description">
          <TextArea
            placeholder=""
            value={dataFaci.faci_description}
            onChange={eventHandler("faci_description")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_max_number">
          <Input
            className="w-1/4"
            placeholder=""
            type="number"
            min={0}
            value={dataFaci.faci_max_number}
            onChange={eventHandler("faci_max_number")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_measure_unit">
          <Select onChange={handlerMunit}>
            <Select.Option value="people">people</Select.Option>
            <Select.Option value="beds">beds</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="" label="faci_cagro_id">
          <Select onChange={handlerCagroId} placeholder="faci cagro">
            <Select.Option value={1}>Restorant</Select.Option>
            <Select.Option value={2}>Room</Select.Option>
            <Select.Option value={3}>Meet Room</Select.Option>
            <Select.Option value={4}>Gym</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="" label="faci_room_number">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_room_number}
            onChange={eventHandler("faci_room_number")}
            readOnly
          />
        </Form.Item>
        <Form.Item className="" label="faci_startdate">
          <Input
            placeholder=""
            type="date"
            value={dataFaci.faci_startdate}
            onChange={eventHandler("faci_startdate")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_endate">
          <Input
            placeholder=""
            type="date"
            value={dataFaci.faci_endate}
            onChange={eventHandler("faci_endate")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_low_price">
          <Input
            placeholder=""
            type="text"
            value={dataFaci.faci_low_price}
            onChange={eventHandler("faci_low_price")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_hight_price">
          <Input
            placeholder=""
            type="text"
            value={dataFaci.faci_hight_price}
            onChange={eventHandler("faci_hight_price")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_rate_price">
          <Input
            placeholder=""
            type="text"
            value={dataFaci.faci_rate_price}
            onChange={eventHandler("faci_rate_price")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_discount">
          <Input
            placeholder=""
            type="text"
            value={dataFaci.faci_discount}
            onChange={eventHandler("faci_discount")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_tax_rate">
          <Input
            placeholder=""
            type="text"
            value={dataFaci.faci_tax_rate}
            onChange={eventHandler("faci_tax_rate")}
          />
        </Form.Item>
        <Form.Item className="" label="faci_modified_date">
          <Input
            placeholder=""
            type="date"
            value={dataFaci.faci_modified_date}
            onChange={eventHandler("faci_modified_date")}
            readOnly
          />
        </Form.Item>
        <Form.Item className="" label="faci_hotel_id">
          <Input
            placeholder=""
            value={dataFaci.faci_hotel_id}
            onChange={eventHandler("faci_hotel_id")}
            readOnly
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="bg-red-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* end */}
    </div>
  );
}

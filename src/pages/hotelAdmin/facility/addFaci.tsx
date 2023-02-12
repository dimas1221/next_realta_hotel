import { doMaxRoomIdReq } from "@/redux/action/actionMaxId";
import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function addFaci() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  // validasi from input room number
  const IdRoom = useSelector(
    (state: any) => state.RoomNumberReducer.RoomNumber
  );
  //   data resto
  const [data1, setData1] = useState({
    faci_cagro_id: 0,
    max_roomid: "",
  });

  const [resto, setResto] = useState();
  useEffect(() => {
    const result1 = IdRoom.find((item: any) => item.faci_cagro_id == 1);
    setResto(result1);
  }, [IdRoom]);

  useEffect(() => {
    if (resto) {
      setData1(resto);
    }
  }, [resto]);

  // data room
  const [data2, setData2] = useState({
    faci_cagro_id: 0,
    max_roomid: "",
  });

  const [room, setRoom] = useState();
  useEffect(() => {
    dispatch(doMaxRoomIdReq());
    const result2 = IdRoom.find((item: any) => item.faci_cagro_id == 2);
    setRoom(result2);
  }, [IdRoom]);

  useEffect(() => {
    if (room) {
      setData2(room);
    }
  }, [room]);

  // room
  let room2 = data2.max_roomid;
  let counter = parseInt(room2.slice(1));
  let hasil2 = "R" + (counter + 1).toString().padStart(4, "0");
  //   resto
  let resto1 = data1.max_roomid;
  let counter1 = parseInt(resto1.slice(2));
  let hasil1 = "RT" + (counter1 + 1).toString().padStart(4, "0");

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
    faci_modified_date: "",
    faci_cagro_id: 0,
    faci_hotel_id: 0,
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
    if (dataFaci.faci_cagro_id === 1) {
      setDataFaci({ ...dataFaci, faci_room_number: hasil1 });
    } else if (dataFaci.faci_cagro_id === 2) {
      setDataFaci({ ...dataFaci, faci_room_number: hasil2 });
    }
  }, [dataFaci.faci_cagro_id, hasil1, hasil2]);

  return (
    <div className="w-3/4 mx-auto ">
      {/* form */}
      <Form>
        <Form.Item label="faci_name">
          <Input
            placeholder=""
            value={dataFaci.faci_name}
            onChange={eventHandler("faci_name")}
          />
        </Form.Item>
        <Form.Item label="faci_description">
          <TextArea
            placeholder=""
            value={dataFaci.faci_description}
            onChange={eventHandler("faci_description")}
          />
        </Form.Item>
        <Form.Item label="faci_max_number">
          <Input
            placeholder=""
            type="number"
            min={0}
            value={dataFaci.faci_max_number}
            onChange={eventHandler("faci_max_number")}
          />
        </Form.Item>
        <Form.Item label="faci_measure_unit">
          <Select onChange={handlerMunit}>
            <Select.Option value="people">people</Select.Option>
            <Select.Option value="beds">beds</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="faci_cagro_id">
          <Select onChange={handlerCagroId}>
            <Select.Option value={1}>Restorant</Select.Option>
            <Select.Option value={2}>Room</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="faci_room_number">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_room_number}
            onChange={eventHandler("faci_room_number")}
            readOnly
          />
        </Form.Item>
        <Form.Item label="faci_startdate">
          <Input
            placeholder="input placeholder"
            type="date"
            value={dataFaci.faci_startdate}
            onChange={eventHandler("faci_startdate")}
          />
        </Form.Item>
        <Form.Item label="faci_endate">
          <Input
            placeholder="input placeholder"
            type="date"
            value={dataFaci.faci_endate}
            onChange={eventHandler("faci_endate")}
          />
        </Form.Item>
        <Form.Item label="faci_low_price">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_low_price}
            onChange={eventHandler("faci_low_price")}
          />
        </Form.Item>
        <Form.Item label="faci_hight_price">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_hight_price}
            onChange={eventHandler("faci_hight_price")}
          />
        </Form.Item>
        <Form.Item label="faci_rate_price">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_rate_price}
            onChange={eventHandler("faci_rate_price")}
          />
        </Form.Item>
        <Form.Item label="faci_discount">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_discount}
            onChange={eventHandler("faci_discount")}
          />
        </Form.Item>
        <Form.Item label="faci_tax_rate">
          <Input
            placeholder="input placeholder"
            type="text"
            value={dataFaci.faci_tax_rate}
            onChange={eventHandler("faci_tax_rate")}
          />
        </Form.Item>
        <Form.Item label="faci_modified_date">
          <Input
            placeholder="input placeholder"
            type="date"
            value={dataFaci.faci_modified_date}
            onChange={eventHandler("faci_modified_date")}
          />
        </Form.Item>
        <Form.Item label="faci_hotel_id">
          <Input
            placeholder="input placeholder"
            value={dataFaci.faci_hotel_id}
            onChange={eventHandler("faci_hotel_id")}
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

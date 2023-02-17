import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doDelFaci, doFaciAdminReq } from "@/redux/action/actionFaciAdmin";
import {
  Alert,
  Button,
  Col,
  Form,
  Grid,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { doInsertFaci } from "@/redux/action/actionFaciAdmin";
import { doMaxRoomIdReq } from "@/redux/action/actionMaxId";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

export default function Faci() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { TextArea } = Input;

  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);
  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );

  const faciOne = faciHotel.filter((item: any) => item.faci_hotel_id == id);
  useEffect(() => {
    dispatch(doFaciAdminReq());
    dispatch(doMaxRoomIdReq());
  }, []);

  const columns: ColumnType<any>[] = [
    {
      title: "No.",
      dataIndex: "index",
      render: (text: any, record: any, index: any) => index + 1,
      fixed: "left",
    },
    {
      title: "facilities",
      dataIndex: "faci_name",
      key: "faci_name",
      fixed: "left",
      sorter: (a: any, b: any) => a.faci_name.length - b.faci_name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "faci_description",
      key: "faci_description",
    },
    {
      title: "faciMax",
      dataIndex: "faci_max_number",
      key: "faci_max_number",
      sorter: (a: any, b: any) => a.faci_max_number - b.faci_max_number,
    },
    {
      title: "faci_measure_unit",
      dataIndex: "faci_measure_unit",
      key: "faci_measure_unit",
    },
    {
      title: "faci_room_number",
      dataIndex: "faci_room_number",
      key: "faci_room_number",
    },
    {
      title: "faci_startdate",
      dataIndex: "faci_startdate",
      key: "faci_startdate",
    },
    {
      title: "faci_endate",
      dataIndex: "faci_endate",
      key: "faci_endate",
    },
    {
      title: "faci_low_price",
      dataIndex: "faci_low_price",
      key: "faci_low_price",
    },
    {
      title: "faci_hight_price",
      dataIndex: "faci_hight_price",
      key: "faci_hight_price",
    },
    {
      title: "faci_rate_price",
      dataIndex: "faci_rate_price",
      key: "faci_rate_price",
    },
    {
      title: "faci_discount",
      dataIndex: "faci_discount",
      key: "faci_discount",
    },
    {
      title: "faci_tax_rate",
      dataIndex: "faci_tax_rate",
      key: "faci_tax_rate",
    },
    {
      title: "faci_modified_date",
      dataIndex: "faci_modified_date",
      key: "faci_modified_date",
    },
    {
      title: "faci_cagro_id",
      dataIndex: "faci_cagro_id",
      key: "faci_cagro_id",
    },
    {
      title: "faci_hotel_id",
      dataIndex: "faci_hotel_id",
      key: "faci_hotel_id",
    },
    {
      title: "Aksi",
      key: "action",
      fixed: "right",
      render: (_: any, record: { faci_id: any }) => (
        <Select defaultValue={record} className="w-32">
          <Select.Option>
            <Button
              className="text-yellow-500 text-sm hover:text-green-400 w-24"
              type="primary"
            >
              <EditOutlined />
              update
            </Button>
          </Select.Option>
          <Select.Option>
            <Button
              onClick={() => showDeleteConfirm(record.faci_id)}
              type="primary"
              className="text-red-500 text-sm hover:text-green-400 w-24"
            >
              <DeleteOutlined />
              delete
            </Button>
          </Select.Option>
          <Select.Option>
            <Button
              className="text-blue-500 text-sm hover:text-green-400 w-24"
              type="primary"
              onClick={() => showFapho(record.faci_id)}
            >
              <MenuOutlined />
              Photo
            </Button>
          </Select.Option>
          <Select.Option>
            <Button
              className="text-blue-500 text-sm hover:text-green-400 w-24"
              type="primary"
              onClick={() => showFPH(record.faci_id)}
            >
              <MenuOutlined />
              faciPrice
            </Button>
          </Select.Option>
        </Select>
      ),
    },
  ];

  // tambah data faci

  const [form] = Form.useForm();

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
    const result1 = IdRoom.find((item: any) => item.faci_cagro_id == 1);
    setResto(result1);
    const result2 = IdRoom.find((item: any) => item.faci_cagro_id == 2);
    setRoom(result2);
    const result3 = IdRoom.find((item: any) => item.faci_cagro_id == 3);
    setMeetRoom(result3);
    const result4 = IdRoom.find((item: any) => item.faci_cagro_id == 4);
    setGym(result4);
  }, [IdRoom]);

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
    faciName: "",
    faciDescription: "",
    faciMaxNumber: 0,
    faciMeasureUnit: "",
    faciRoomNumber: "",
    faciStartdate: "",
    faciEndate: "",
    faciLowPrice: "",
    faciHightPrice: "",
    faciRatePrice: "",
    faciDiscount: "",
    faciTaxRate: "",
    faciModifiedDate: new Date().toISOString().substr(0, 10),
    faciCagro: 0,
    faciHotel: id,
  });

  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setDataFaci({ ...dataFaci, [item]: event.target.value });
    };

  const handlerMunit = (value: any) => {
    setDataFaci({ ...dataFaci, faciMeasureUnit: value });
  };

  const handlerCagroId = (value: any) => {
    setDataFaci({ ...dataFaci, faciCagro: value });
  };

  useEffect(() => {
    setDataFaci({ ...dataFaci, faciHotel: id });
    if (dataFaci.faciCagro === 1) {
      setDataFaci({ ...dataFaci, faciRoomNumber: hasil1 });
    } else if (dataFaci.faciCagro === 2) {
      setDataFaci({ ...dataFaci, faciRoomNumber: hasil2 });
    } else if (dataFaci.faciCagro === 3) {
      setDataFaci({ ...dataFaci, faciRoomNumber: hasil3 });
    } else if (dataFaci.faciCagro === 4) {
      setDataFaci({ ...dataFaci, faciRoomNumber: hasil4 });
    }
  }, [dataFaci.faciCagro, id]);

  // button insert data hotel
  const addData = (e: any) => {
    e.preventDefault();
    dispatch(doInsertFaci(dataFaci));
    setModal2Open(false);

    setVisible("");
    setTimeout(() => {
      setVisible("hidden");
    }, 2000);
  };
  // end
  // alert
  const [visible, setVisible] = useState("hidden");

  // modal delete
  const { confirm } = Modal;
  const showDeleteConfirm = (id: any) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(doDelFaci(id));
      },
      onCancel() {
        console.log("OK");
      },
    });
  };
  // handler fapho
  const showFapho = (id: any) => {
    router.push("fapho/" + id);
  };
  // end
  // handler fph
  const showFPH = (id: any) => {
    router.push("faciPriceHistory/" + id);
  };
  // end
  return (
    <div className="w-3/4 mx-auto text-center">
      <Alert
        message="Success"
        description="Data has been successfully entered into the table."
        type="success"
        showIcon
        style={{ marginBottom: "16px" }}
        closable
        afterClose={() => setVisible("")}
        className={visible}
      />
      <div className="flex justify-start">
        {/* modal add data */}
        <>
          <Button
            className="bg-red-500 mb-5 w-28"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            Add
          </Button>
          <Modal
            title="Add Facilitas"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
            width={800}
          >
            {/* form */}
            <Form
              form={form}
              layout="vertical"
              className="bg-white p-6 rounded-lg w-3/4 mx-auto"
            >
              <Row className="flex justify-center">
                <Col span={10}>
                  <Form.Item className="" label="faci_name">
                    <Input
                      placeholder=""
                      value={dataFaci.faciName}
                      onChange={eventHandler("faciName")}
                    />
                  </Form.Item>

                  <Form.Item className="" label="faci_max_number">
                    <Input
                      placeholder=""
                      type="number"
                      min={0}
                      value={dataFaci.faciMaxNumber}
                      onChange={eventHandler("faciMaxNumber")}
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
                      value={dataFaci.faciRoomNumber}
                      onChange={eventHandler("faciRoomNumber")}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_startdate">
                    <Input
                      placeholder=""
                      type="date"
                      value={dataFaci.faciStartdate}
                      onChange={eventHandler("faciStartdate")}
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_description">
                    <TextArea
                      placeholder=""
                      value={dataFaci.faciDescription}
                      onChange={eventHandler("faciDescription")}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} className="ml-5">
                  <Form.Item className="" label="faci_endate">
                    <Input
                      placeholder=""
                      type="date"
                      value={dataFaci.faciEndate}
                      onChange={eventHandler("faciEndate")}
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_low_price">
                    <Input
                      placeholder=""
                      type="text"
                      value={dataFaci.faciLowPrice}
                      onChange={eventHandler("faciLowPrice")}
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_hight_price">
                    <Input
                      placeholder=""
                      type="text"
                      value={dataFaci.faciHightPrice}
                      onChange={eventHandler("faciHightPrice")}
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_rate_price">
                    <Input
                      placeholder=""
                      type="text"
                      value={dataFaci.faciRatePrice}
                      onChange={eventHandler("faciRatePrice")}
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_discount">
                    <Input
                      placeholder=""
                      type="text"
                      value={dataFaci.faciDiscount}
                      onChange={eventHandler("faciDiscount")}
                    />
                  </Form.Item>
                  <Form.Item className="" label="faci_tax_rate">
                    <Input
                      placeholder=""
                      type="text"
                      value={dataFaci.faciTaxRate}
                      onChange={eventHandler("faciTaxRate")}
                    />
                  </Form.Item>

                  <Form.Item className="">
                    <Input
                      placeholder=""
                      type="date"
                      value={dataFaci.faciModifiedDate}
                      onChange={eventHandler("faciModifiedDate")}
                      hidden
                    />
                  </Form.Item>
                  <Form.Item className="faciHotel">
                    <Input
                      placeholder=""
                      value={dataFaci.faciHotel}
                      onChange={eventHandler("faciHotel")}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="flex justify-center">
                <Form.Item className="items-center">
                  <Button
                    type="primary"
                    className="bg-red-500"
                    onClick={addData}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Form>
            {/* end */}
          </Modal>
        </>
        {/* end */}
      </div>
      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={faciOne}
        columns={columns}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doDelFaci, doFaciAdminReq } from "@/redux/action/actionFaciAdmin";
import {
  Alert,
  Button,
  Col,
  Form,
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
  MenuFoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { HiPhoto } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { doHotelAdminReq } from "@/redux/action/actionHotelAdmin";
import { IoIosBed } from "react-icons/io";

export default function Faci() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { TextArea } = Input;

  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);
  // reducer faci
  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );
  const faciOne = faciHotel.filter((item: any) => item.faci_hotel_id == id);
  // reducer hotel
  const dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );

  useEffect(() => {
    dispatch(doFaciAdminReq());
    dispatch(doMaxRoomIdReq());
    dispatch(doHotelAdminReq());
  }, []);
  // data hotel one
  const dataHotelOne = dataHotel?.find((items: any) => items.hotelId == id);

  // dropdown
  const [dropdowns, setDropdowns] = useState(
    faciHotel.reduce((acc: any, item: any) => {
      return { ...acc, [item.hotelId]: false };
    }, {})
  );

  const toggleDropdown = (dropdown: any) => {
    setDropdowns({
      ...dropdowns,
      [dropdown]: !dropdowns[dropdown],
    });
  };
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
      title: (
        <>
          <Button
            className="mt-5 px-4 py-1 bg-green-500 mb-5 w-16"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            <PlusOutlined className="text-white" />
          </Button>
        </>
      ),
      key: "action",
      fixed: "right",
      render: (_: any, record: { faci_id: any }) => (
        <>
          <button
            onClick={() => toggleDropdown(record.faci_id)}
            className="px-4 py-1 bg-blue-300 rounded-md w-16"
          >
            <MenuFoldOutlined className="text-white" />
          </button>
          <div className="absolute">
            {dropdowns[record.faci_id] && (
              <ul className="absolute right-0 bottom-full z-10 bg-white border rounded-lg shadow-lg mt-2 ">
                <li className="py-2 px-2 hover:bg-gray-100 flex px-1">
                  <button className="text-yellow-500 text-sm hover:text-green-400 flex items-center px-1 space-x-2">
                    <EditOutlined />
                    <p>Update</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex px-1">
                  <button
                    onClick={() => showDeleteConfirm(record.faci_id)}
                    className="text-red-500 text-sm hover:text-green-400 flex items-center px-1 space-x-2"
                  >
                    <DeleteOutlined />
                    <p>Delete</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex px-1">
                  <button
                    className="text-blue-500 text-sm hover:text-green-400 flex items-center px-1 space-x-2"
                    onClick={() => showFapho(record.faci_id)}
                  >
                    <HiPhoto />
                    <p>uploadPhoto</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex px-1">
                  <button
                    className="text-blue-500 text-sm hover:text-green-400 flex items-center px-1 space-x-2"
                    onClick={() => showFPH(record.faci_id)}
                  >
                    <GoHistory />
                    <p>FPH</p>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      ),
    },
  ];

  // tambah data faci

  const [form] = Form.useForm();
  // data room number
  const IdRoom = useSelector(
    (state: any) => state.RoomNumberReducer.RoomNumber
  );
  const result1 = IdRoom?.find((item: any) => item.faci_cagro_id == 1);
  const result2 = IdRoom?.find((item: any) => item.faci_cagro_id == 2);
  const result3 = IdRoom?.find((item: any) => item.faci_cagro_id == 3);
  const result4 = IdRoom?.find((item: any) => item.faci_cagro_id == 4);
  // room
  let room2 = result2?.max_roomid;
  let counter = parseInt(room2?.slice(1));
  let hasil2 = "R" + (counter + 1).toString().padStart(4, "0");
  //   resto
  let resto1 = result1?.max_roomid;
  let counter1 = parseInt(resto1?.slice(2));
  let hasil1 = "RT" + (counter1 + 1).toString().padStart(4, "0");
  //   meet room
  let mr3 = result3?.max_roomid;
  let counter3 = parseInt(mr3?.slice(2));
  let hasil3 = "MR" + (counter3 + 1).toString().padStart(4, "0");
  //   gym
  let g4 = result4?.max_roomid;
  let counter4 = parseInt(g4?.slice(1));
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
    faciRatePrice: "0",
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

  // use effect membuat faci discount
  // diskon
  const [disc, setDisc] = useState(0);
  function handlerDisc(event: any) {
    setDisc(event.target.value);
  }
  // end
  let hightPrice = dataFaci.faciRatePrice;
  let IntHp = parseInt(hightPrice);
  useEffect(() => {
    let totDiscount = IntHp * (disc / 100);
    let hasilDiscount = totDiscount.toString();
    setDataFaci({ ...dataFaci, faciDiscount: hasilDiscount });
  }, [dataFaci.faciRatePrice, disc]);

  // button insert data hotel
  // message require
  const [showError, setShowError] = useState({
    faciName: false,
    faciDescription: false,
    faciMaxNumber: false,
    faciMeasureUnit: false,
    faciRoomNumber: false,
    faciStartdate: false,
    faciEndate: false,
    faciLowPrice: false,
    faciHightPrice: false,
    faciRatePrice: false,
    faciDiscount: false,
    faciTaxRate: false,
    faciCagro: false,
  });
  const [messageError, setMessageError] = useState({
    faciName: "",
    faciDescription: "",
    faciMaxNumber: "",
    faciMeasureUnit: "",
    faciRoomNumber: "",
    faciStartdate: "",
    faciEndate: "",
    faciLowPrice: "",
    faciHightPrice: "",
    faciRatePrice: "",
    faciDiscount: "",
    faciTaxRate: "",
    faciCagro: "",
  });
  const addData = (e: any) => {
    e.preventDefault();
    if (dataFaci.faciName === "") {
      setShowError({ ...showError, faciName: true });
      setMessageError({
        ...messageError,
        faciName: "faci name must be filled!",
      });
      return;
    }
    if (dataFaci.faciDescription === "") {
      setShowError({ ...showError, faciDescription: true });
      setMessageError({
        ...messageError,
        faciDescription: "faci description must be filled!",
      });
      return;
    }
    if (dataFaci.faciMaxNumber === 0) {
      setShowError({ ...showError, faciMaxNumber: true });
      setMessageError({
        ...messageError,
        faciMaxNumber: "faci max must be filled!",
      });
      return;
    }
    if (dataFaci.faciMeasureUnit === "") {
      setShowError({ ...showError, faciMeasureUnit: true });
      setMessageError({
        ...messageError,
        faciMeasureUnit: "faci measure unit must be filled!",
      });
      return;
    }
    if (dataFaci.faciStartdate === "") {
      setShowError({ ...showError, faciStartdate: true });
      setMessageError({
        ...messageError,
        faciStartdate: "faci start date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faciEndate === "") {
      setShowError({ ...showError, faciEndate: true });
      setMessageError({
        ...messageError,
        faciEndate: "faci end date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faciCagro === 0) {
      setShowError({ ...showError, faciCagro: true });
      setMessageError({
        ...messageError,
        faciCagro: "faci categori date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faciHightPrice === "") {
      setShowError({ ...showError, faciHightPrice: true });
      setMessageError({
        ...messageError,
        faciHightPrice: "faci hight price date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faciLowPrice === "") {
      setShowError({ ...showError, faciLowPrice: true });
      setMessageError({
        ...messageError,
        faciLowPrice: "faci hight price date unit must be filled!",
      });
      return;
    }
    if (dataFaci.faciRatePrice === "") {
      setShowError({ ...showError, faciRatePrice: true });
      setMessageError({
        ...messageError,
        faciRatePrice: "faci hight price date unit must be filled!",
      });
      return;
    }

    dispatch(doInsertFaci(dataFaci));
    setModal2Open(false);

    setVisible("");
    setTimeout(() => {
      setVisible("hidden");
    }, 2000);
  };
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
      <div className="flex justify-start py-5">
        <span className="text-4xl font-bold">
          <IoIosBed />
        </span>
        <span className="text-4xl font-bold ml-3">
          {dataHotelOne?.hotelName}
        </span>
      </div>
      <hr className="text-gray-600 font-bold py-4" />

      {/* modal add data */}
      <>
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
                <Form.Item
                  className=""
                  label="faci_name"
                  name="faciName"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciName === "" && showError.faciName
                      ? "error"
                      : ""
                  }
                  help={dataFaci.faciName === "" ? messageError.faciName : null}
                >
                  <Input
                    placeholder=""
                    value={dataFaci.faciName}
                    onChange={eventHandler("faciName")}
                  />
                </Form.Item>

                <Form.Item
                  className=""
                  label="faci_max_number"
                  name="faciMaxNumber"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciMaxNumber === 0 && showError.faciMaxNumber
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciMaxNumber === 0
                      ? messageError.faciMaxNumber
                      : null
                  }
                >
                  <Input
                    placeholder=""
                    type="number"
                    min={0}
                    value={dataFaci.faciMaxNumber}
                    onChange={eventHandler("faciMaxNumber")}
                  />
                </Form.Item>
                <Form.Item
                  className=""
                  label="faci_measure_unit"
                  name="faciMeasureUnit"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciMeasureUnit === "" && showError.faciMeasureUnit
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciMeasureUnit === ""
                      ? messageError.faciMeasureUnit
                      : null
                  }
                >
                  <Select onChange={handlerMunit}>
                    <Select.Option value="people">people</Select.Option>
                    <Select.Option value="beds">beds</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className=""
                  label="faci_cagro_id"
                  name="faciCagro"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciCagro === 0 && showError.faciCagro
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciCagro === 0 ? messageError.faciCagro : null
                  }
                >
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
                <Form.Item
                  className=""
                  label="faci_startdate"
                  name="faciStartdate"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciStartdate === "" && showError.faciStartdate
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciStartdate === ""
                      ? messageError.faciStartdate
                      : null
                  }
                >
                  <Input
                    placeholder=""
                    type="date"
                    value={dataFaci.faciStartdate}
                    onChange={eventHandler("faciStartdate")}
                  />
                </Form.Item>
                <Form.Item
                  className=""
                  label="faci_description"
                  name="faciDescription"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciDescription === "" && showError.faciDescription
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciDescription === ""
                      ? messageError.faciDescription
                      : null
                  }
                >
                  <TextArea
                    placeholder=""
                    value={dataFaci.faciDescription}
                    onChange={eventHandler("faciDescription")}
                  />
                </Form.Item>
              </Col>
              <Col span={10} className="ml-5">
                <Form.Item
                  className=""
                  label="faci_endate"
                  name="faciEndate"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciEndate === "" && showError.faciEndate
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciEndate === "" ? messageError.faciEndate : null
                  }
                >
                  <Input
                    placeholder=""
                    type="date"
                    value={dataFaci.faciEndate}
                    onChange={eventHandler("faciEndate")}
                  />
                </Form.Item>
                <Form.Item
                  className=""
                  label="faci_hight_price"
                  name="faciHightPrice"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciHightPrice === "" && showError.faciHightPrice
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciHightPrice === ""
                      ? messageError.faciHightPrice
                      : null
                  }
                >
                  <Input
                    placeholder=""
                    type="number"
                    value={dataFaci.faciHightPrice}
                    onChange={eventHandler("faciHightPrice")}
                    suffix="$"
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  className=""
                  label="faci_low_price"
                  name="faciLowPrice"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciLowPrice === "" && showError.faciLowPrice
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciLowPrice === ""
                      ? messageError.faciLowPrice
                      : null
                  }
                >
                  <Input
                    placeholder=""
                    type="number"
                    value={dataFaci.faciLowPrice}
                    onChange={eventHandler("faciLowPrice")}
                    suffix="$"
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  className=""
                  label="faci_rate_price"
                  name="faciRatePrice"
                  rules={[{ required: true }]}
                  validateStatus={
                    dataFaci.faciRatePrice === "" && showError.faciRatePrice
                      ? "error"
                      : ""
                  }
                  help={
                    dataFaci.faciRatePrice === ""
                      ? messageError.faciRatePrice
                      : null
                  }
                >
                  <Input
                    placeholder=""
                    type="number"
                    value={dataFaci.faciRatePrice}
                    onChange={eventHandler("faciRatePrice")}
                    suffix="$"
                    min={0}
                  />
                </Form.Item>
                <Form.Item className="" label="discount">
                  <Input
                    type="number"
                    value={disc}
                    onChange={handlerDisc}
                    className="w-2/5"
                    suffix="%"
                    min={0}
                    max={100}
                  />
                </Form.Item>
                <Form.Item className="" label="faci_discount">
                  <Input
                    placeholder=""
                    type="text"
                    value={dataFaci.faciDiscount}
                    onChange={eventHandler("faciDiscount")}
                    readOnly
                    className="bg-gray-100 font-bold text-gray-500"
                    suffix="$"
                  />
                </Form.Item>
                <Form.Item className="" label="faci_tax_rate">
                  <Input
                    placeholder=""
                    type="number"
                    value={dataFaci.faciTaxRate}
                    onChange={eventHandler("faciTaxRate")}
                    suffix="$"
                    min={0}
                  />
                </Form.Item>

                <Form.Item className="">
                  <Form.Item className="faciHotel" label="faciHotelId">
                    <Input
                      placeholder=""
                      value={dataFaci.faciHotel}
                      onChange={eventHandler("faciHotel")}
                      readOnly
                      className="text-base text-gray-500 font-bold bg-gray-100"
                    />
                  </Form.Item>
                  <Input
                    placeholder=""
                    type="date"
                    value={dataFaci.faciModifiedDate}
                    onChange={eventHandler("faciModifiedDate")}
                    hidden
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="flex justify-end px-8">
              <Form.Item className="items-center">
                <Button type="primary" className="bg-red-500" onClick={addData}>
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Form>
          {/* end */}
        </Modal>
      </>
      {/* end */}

      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={faciOne}
        columns={columns}
      />
    </div>
  );
}

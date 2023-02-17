import React, { useState, useEffect } from "react";
import {
  doAddrSearchReq,
  doDelHotel,
  doHotelAdminReq,
  doInsertHotel,
} from "@/redux/action/actionHotelAdmin";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form, Input, Modal, Table } from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MenuFoldOutlined,
  MenuOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

export default function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { TextArea } = Input;
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );
  console.log("object", dataHotel);
  let dataAddr = useSelector((state: any) => state.AddrHotelReducer.HotelAddr);
  console.log("add", dataAddr);

  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);

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
        dispatch(doDelHotel(id));
      },
      onCancel() {
        console.log("calcle");
      },
    });
  };

  // end

  // buuton edit
  const showEdit = (id: any) => {
    // navigate('/editcust', {state:{id}})
    router.push("hotelAdmin/updatehotel/" + id);
  };

  const showFaci = (id: any) => {
    router.push("hotelAdmin/facility/" + id);
  };

  // dropdown
  const [dropdowns, setDropdowns] = useState(
    dataHotel.reduce((acc: any, item: any) => {
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
      title: "hotel",
      dataIndex: "hotelName",
      key: "hotelName",
      sorter: (a: any, b: any) => a.hotelName.length - b.hotelName.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "hotelDescription",
      key: "hotelDescription",
    },
    {
      title: "Rating",
      dataIndex: "hotelRatingStar",
      key: "hotelRatingStar",
      sorter: (a: any, b: any) => a.hotelRatingStar - b.hotelRatingStar,
    },
    {
      title: "hotelPhonenumber",
      dataIndex: "hotelPhonenumber",
      key: "hotelPhonenumber",
    },
    {
      title: "hotelModifiedDate",
      dataIndex: "hotelModifiedDate",
      key: "hotelModifiedDate",
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
      render: (_: any, record: { hotelId: any }) => (
        <>
          <button
            onClick={() => toggleDropdown(record.hotelId)}
            className="px-4 py-1 bg-blue-300 rounded-md w-16"
          >
            <MenuFoldOutlined className="text-white" />
          </button>
          <div className="absolute">
            {dropdowns[record.hotelId] && (
              <ul className="absolute right-0 bottom-full z-10 bg-white border rounded-lg shadow-lg mt-2 ">
                <li className="py-2 px-2 hover:bg-gray-100 flex justify-center">
                  <button
                    className="text-yellow-500 text-sm hover:text-green-400 flex items-center justify-center space-x-2"
                    onClick={() => showEdit(record.hotelId)}
                  >
                    <EditOutlined />
                    <p>Update</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex justify-center">
                  <button
                    onClick={() => showDeleteConfirm(record.hotelId)}
                    className="text-red-500 text-sm hover:text-green-400 flex items-center justify-center space-x-2"
                  >
                    <DeleteOutlined />
                    <p>Delete</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex justify-center">
                  <button
                    className="text-blue-500 text-sm hover:text-green-400 flex items-center justify-center space-x-2"
                    onClick={() => showFaci(record.hotelId)}
                  >
                    <MenuOutlined />
                    <p>Facility</p>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      ),
    },
  ];
  // value input

  const [valueHotel, setValueHotel] = useState({
    hotelName: "",
    hotelAddr: 0,
    hotelDescription: "",
    hotelRatingStar: 0,
    hotelPhonenumber: "+62 ",
    hotelModifiedDate: new Date().toISOString().substr(0, 10),
  });
  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setValueHotel({ ...valueHotel, [item]: event.target.value });
    };

  // end
  // button insert data hotel
  const [showError, setShowError] = useState({
    hotelName: false,
    hotelAddr: false,
    hotelDescription: false,
    hotelRatingStar: false,
    hotelPhonenumber: false,
  });
  const [messageError, setMessageError] = useState({
    hotelName: "",
    hotelAddr: "",
    hotelDescription: "",
    hotelRatingStar: "",
    hotelPhonenumber: "",
  });
  const addData = (e: any) => {
    e.preventDefault();
    if (valueHotel.hotelName === "") {
      setShowError({ ...showError, hotelName: true });
      setMessageError({
        ...messageError,
        hotelName: "hotel name must be filled!",
      });
      return;
    }
    if (valueHotel.hotelAddr === 0) {
      setShowError({ ...showError, hotelAddr: true });
      setMessageError({ ...messageError, hotelAddr: "adrees must be filled!" });
      return;
    }
    if (valueHotel.hotelDescription === "") {
      setShowError({ ...showError, hotelDescription: true });
      setMessageError({
        ...messageError,
        hotelDescription: "deskription must be filled!",
      });
      return;
    }
    if (valueHotel.hotelPhonenumber === "") {
      setShowError({ ...showError, hotelPhonenumber: true });
      setMessageError({
        ...messageError,
        hotelPhonenumber: "phonenumber must be filled!",
      });
      return;
    }
    dispatch(doInsertHotel(valueHotel));
    setModal2Open(false);
    setVisible("");
    setTimeout(() => {
      setVisible("hidden");
    }, 2000);
  };
  // alert
  const [visible, setVisible] = useState("hidden");
  // end

  const [query, setQuery] = useState("");
  const handleSearch = (e: any) => {
    // setQuery(e.target.value);
    const input = e.target.value.toLowerCase().replace(/\s/g, "");
    setQuery(input);
  };

  const handleSelect = (e: any) => {
    setValueHotel({ ...valueHotel, hotelAddr: parseInt(e.target.value) });
  };

  const searchResults = dataAddr
    .filter((addr: any) =>
      addr.place.toLowerCase().replace(/\s/g, "").includes(query)
    )
    .map((addr: any) => (
      <option key={addr.hotel_addr_id} value={addr.hotel_addr_id}>
        {addr.place}
      </option>
    ));

  useEffect(() => {
    dispatch(doHotelAdminReq());
    dispatch(doAddrSearchReq());
  }, [setValueHotel]);
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
      <div className="flex justify-between mb-5 mt-5">
        <span className="text-4xl">Hotels</span>
        <hr />
        {/* modal add data */}
        <>
          <Modal
            title="Add Hotel"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
          >
            <Form layout="vertical" className="bg-white p-6 rounded-lg mx-auto">
              <Form.Item
                label="hotelName"
                validateStatus={
                  valueHotel.hotelName === "" && showError.hotelName
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelName === "" ? messageError.hotelName : null
                }
              >
                <Input
                  placeholder=""
                  value={valueHotel.hotelName}
                  onChange={eventHandler("hotelName")}
                />
              </Form.Item>
              <Form.Item label="search address">
                <div className="flex">
                  <SearchOutlined className="text-xl bg-blue-500 rounded w-10 text-white mr-2" />
                  <Input
                    type="search"
                    value={query}
                    onChange={handleSearch}
                    className="w-1/4"
                  />
                </div>
              </Form.Item>
              <Form.Item
                label="Address"
                validateStatus={
                  valueHotel.hotelAddr === 0 && showError.hotelAddr
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelAddr === 0 ? messageError.hotelAddr : null
                }
              >
                <select
                  value={valueHotel.hotelAddr}
                  onChange={handleSelect}
                  className="h-20 border border-solid border-gray-500 w-11/12"
                >
                  <option value="">-pilih address-</option>
                  {searchResults}
                </select>
              </Form.Item>
              <Form.Item label="hotelRatingStar">
                <Input
                  placeholder=""
                  type="number"
                  min={1}
                  max={5}
                  value={valueHotel.hotelRatingStar}
                  onChange={eventHandler("hotelRatingStar")}
                  className="w-1/4"
                />
              </Form.Item>
              <Form.Item
                label="hotelPhonenumber"
                validateStatus={
                  valueHotel.hotelPhonenumber === "" &&
                  showError.hotelPhonenumber
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelPhonenumber === ""
                    ? messageError.hotelPhonenumber
                    : null
                }
              >
                <Input
                  placeholder=""
                  value={valueHotel.hotelPhonenumber}
                  onChange={eventHandler("hotelPhonenumber")}
                  type="text"
                />
              </Form.Item>
              <Form.Item
                label="hotelDescription"
                validateStatus={
                  valueHotel.hotelDescription === "" &&
                  showError.hotelDescription
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelDescription === ""
                    ? messageError.hotelDescription
                    : null
                }
              >
                <TextArea
                  placeholder=""
                  value={valueHotel.hotelDescription}
                  onChange={eventHandler("hotelDescription")}
                />
              </Form.Item>
              <Form.Item className="items-center">
                <Button type="primary" className="bg-red-500" onClick={addData}>
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="input placeholder"
                  value={valueHotel.hotelModifiedDate}
                  onChange={eventHandler("hotelModifiedDate")}
                  hidden
                  type="date"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder=""
                  value={valueHotel.hotelAddr}
                  onChange={eventHandler("hotelAddr")}
                  hidden
                />
              </Form.Item>
            </Form>
            {/* end */}
          </Modal>
        </>
        {/* end */}
      </div>
      <div>
        <Table
          className="flex items-center"
          scroll={{ x: true }}
          size="small"
          dataSource={dataHotel}
          columns={columns}
        />
      </div>
    </div>
  );
}

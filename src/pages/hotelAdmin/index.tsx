import React, { useState, useEffect } from "react";
import {
  doAddrSearchReq,
  doDelHotel,
  doHotelAdminReq,
  doInsertHotel,
} from "@/redux/action/actionHotelAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Table,
} from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";

type LayoutType = Parameters<typeof Form>[0]["layout"];

export default function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { TextArea } = Input;
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );
  let dataAddr = useSelector((state: any) => state.AddrHotelReducer.HotelAddr);
  console.log("add", dataAddr);
  useEffect(() => {
    dispatch(doHotelAdminReq());
    dispatch(doAddrSearchReq());
  }, []);

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
        console.log("OK");
      },
    });
  };

  // end
  // form inputan
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? { wrapperCol: { span: 14, offset: 4 } }
      : null;

  // end

  // buuton edit
  const showEdit = (id: any) => {
    // navigate('/editcust', {state:{id}})
    router.push("hotelAdmin/updatehotel/" + id);
  };

  const showFaci = (id: any) => {
    router.push("hotelAdmin/facility/" + id);
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
      title: "Aksi",
      key: "action",
      render: (_: any, record: { hotelId: any }) => (
        <Select defaultValue={record} className="w-32 items-center">
          <Select.Option>
            <Button
              className=" px-6  text-yellow-500 text-sm hover:text-green-400"
              type="primary"
              onClick={() => showEdit(record.hotelId)}
            >
              <EditOutlined />
              edit
            </Button>
          </Select.Option>
          <Select.Option>
            <Button
              onClick={() => showDeleteConfirm(record.hotelId)}
              type="primary"
              className=" px-6  text-red-500 text-sm hover:text-green-400"
            >
              <DeleteOutlined />
              delete
            </Button>
          </Select.Option>
          <Select.Option>
            <Button
              className="h-10 px-6  text-blue-500 text-sm hover:text-green-400 "
              type="primary"
              onClick={() => showFaci(record.hotelId)}
            >
              Facility
            </Button>
          </Select.Option>
        </Select>
      ),
    },
  ];

  // value input

  const [valueHotel, setValueHotel] = useState({
    hotelName: "",
    hotelAddr: 0,
    hotelDescription: "",
    hotelRatingStar: 0,
    hotelPhonenumber: "",
    hotelModifiedDate: new Date().toISOString().substr(0, 10),
  });
  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setValueHotel({ ...valueHotel, [item]: event.target.value });
    };
  // end
  // button insert data hotel
  const addData = (e: any) => {
    e.preventDefault();
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
      <div className="flex justify-end">
        {/* modal add data */}
        <>
          <Button
            className="bg-red-500 mb-5 w-32 h-12"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            Add
          </Button>
          <Modal
            title="Add Hotel"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
          >
            <Form layout="vertical" className="bg-white p-6 rounded-lg mx-auto">
              <Form.Item label="hotelName">
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
              <Form.Item label="Address">
                <select
                  value={valueHotel.hotelAddr}
                  onChange={handleSelect}
                  className="h-20 border border-solid border-gray-500 w-11/12"
                >
                  {searchResults}
                  <option value="">-pilih address-</option>
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
              <Form.Item label="hotelPhonenumber">
                <Input
                  placeholder=""
                  value={valueHotel.hotelPhonenumber}
                  onChange={eventHandler("hotelPhonenumber")}
                  type="text"
                />
              </Form.Item>
              <Form.Item label="hotelDescription">
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
          scroll={{ x: true }}
          size="middle"
          dataSource={dataHotel}
          columns={columns}
        />
      </div>
    </div>
  );
}

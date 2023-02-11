import React, { useState, useEffect } from "react";
import {
  doDelHotel,
  doHotelAdminReq,
  doInsertHotel,
  doUpdateHotel,
} from "@/redux/action/actionHotelAdmin";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form, Input, Modal, Radio, Space, Table } from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

type LayoutType = Parameters<typeof Form>[0]["layout"];

export default function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );

  useEffect(() => {
    dispatch(doHotelAdminReq());
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
    router.push(
      {
        pathname: "hotelAdmin/updatehotel",
        query: { id },
      }
      // "hotelAdmin/updatehotel"
    );
  };
  const columns = [
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
        <span className="flex">
          <>
            <Button
              className="h-10 px-6 font-semibold rounded-md  text-yellow-500 text-2xl hover:text-green-400 "
              type="primary"
              onClick={() => showEdit(record.hotelId)}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => showDeleteConfirm(record.hotelId)}
              type="dashed"
              className="h-10 px-6 font-semibold rounded-md  text-red-500 text-2xl hover:text-green-400"
            >
              <DeleteOutlined />
            </Button>
          </>
        </span>
      ),
    },
  ];

  // value input
  const [valueHotel, setValueHotel] = useState({
    hotelName: "",
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
    router.push("/hotelAdmin");
    setModal2Open(false);
    setVisible("");
    setTimeout(() => {
      setVisible("hidden");
    }, 2000);
  };
  // alert
  const [visible, setVisible] = useState("hidden");
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
            title="Add Hotel"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
          >
            {/* form */}
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{ layout: formLayout }}
              onValuesChange={onFormLayoutChange}
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="Form Layout" name="layout">
                <Radio.Group value={formLayout}>
                  <Radio.Button value="horizontal">Horizontal</Radio.Button>
                  <Radio.Button value="vertical">Vertical</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="hotelName">
                <Input
                  placeholder=""
                  value={valueHotel.hotelName}
                  onChange={eventHandler("hotelName")}
                />
              </Form.Item>
              <Form.Item label="hotelDescription">
                <Input
                  placeholder=""
                  value={valueHotel.hotelDescription}
                  onChange={eventHandler("hotelDescription")}
                />
              </Form.Item>
              <Form.Item label="hotelRatingStar">
                <Input
                  placeholder=""
                  type="number"
                  min={0}
                  value={valueHotel.hotelRatingStar}
                  onChange={eventHandler("hotelRatingStar")}
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
              <Form.Item>
                <Input
                  placeholder="input placeholder"
                  value={valueHotel.hotelModifiedDate}
                  onChange={eventHandler("hotelModifiedDate")}
                  hidden
                  type="date"
                />
              </Form.Item>
              <Form.Item {...buttonItemLayout}>
                <Button type="primary" className="bg-red-500" onClick={addData}>
                  Submit
                </Button>
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

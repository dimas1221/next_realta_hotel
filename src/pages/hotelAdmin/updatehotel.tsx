import { doUpdateHotel } from "@/redux/action/actionHotelAdmin";
import { Button, Form, Input, Radio } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type LayoutType = Parameters<typeof Form>[0]["layout"];
export default function udatehotel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const now = new Date();
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );
  // let oneHotel = dataHotel.find((item: any) => item.hotelId == id);
  let oneHotel;
  if (id) {
    oneHotel = dataHotel.find((item: any) => item.hotelId == id);
  } else {
    oneHotel = null;
  }

  const [dataUpdate, setDataUpdate] = useState({
    hotelId: oneHotel.hotelId,
    hotelName: oneHotel.hotelName,
    hotelDescription: oneHotel.hotelDescription,
    hotelRatingStar: oneHotel.hotelRatingStar,
    hotelPhonenumber: oneHotel.hotelPhonenumber,
    hotelModifiedDate: now.toISOString().substr(0, 10),
  });

  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setDataUpdate({ ...dataUpdate, [item]: event.target.value });
    };
  // button edit data
  const updateData = (e: any) => {
    e.preventDefault();
    dispatch(doUpdateHotel(dataUpdate));
    router.push("/hotelAdmin");
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
  return (
    <div className="w-3/4 mx-auto text-center">
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
            value={dataUpdate.hotelName}
            onChange={eventHandler("hotelName")}
          />
        </Form.Item>
        <Form.Item label="hotelDescription">
          <Input
            placeholder=""
            value={dataUpdate.hotelDescription}
            onChange={eventHandler("hotelDescription")}
          />
        </Form.Item>
        <Form.Item label="hotelRatingStar">
          <Input
            placeholder=""
            type="number"
            min={0}
            value={dataUpdate.hotelRatingStar}
            onChange={eventHandler("hotelRatingStar")}
          />
        </Form.Item>
        <Form.Item label="hotelPhonenumber">
          <Input
            placeholder=""
            type="text"
            value={dataUpdate.hotelPhonenumber}
            onChange={eventHandler("hotelPhonenumber")}
          />
        </Form.Item>
        <Form.Item label="hotelModifiedDate">
          <Input
            placeholder="input placeholder"
            type="date"
            hidden
            value={dataUpdate.hotelModifiedDate}
            onChange={eventHandler("hotelModifiedDate")}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button onClick={updateData} type="primary" className="bg-red-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* end */}
    </div>
  );
}

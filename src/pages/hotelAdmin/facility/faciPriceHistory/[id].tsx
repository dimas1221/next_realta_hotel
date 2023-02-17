import { doGetFaciPriceHistory } from "@/redux/action/actionFPH";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import { ColumnType } from "antd/es/table";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Fapho() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const fphHotel = useSelector(
    (state: any) => state.FaciPriceHistoryReducer.fph
  );
  console.log("object", fphHotel);
  const fphOne = fphHotel.filter((item: any) => item.faph_faci_id == id);

  useEffect(() => {
    dispatch(doGetFaciPriceHistory());
  }, []);
  const columns: ColumnType<any>[] = [
    {
      title: "No.",
      dataIndex: "index",
      render: (text: any, record: any, index: any) => index + 1,
      fixed: "left",
    },
    {
      title: "faph_faci_id",
      dataIndex: "faph_faci_id",
      key: "faph_faci_id",
    },
    {
      title: "faph_startdate",
      dataIndex: "faph_startdate",
      key: "faph_startdate",
    },
    {
      title: "faph_enddate",
      dataIndex: "faph_enddate",
      key: "faph_enddate",
    },
    {
      title: "faph_low_price",
      dataIndex: "faph_low_price",
      key: "faph_low_price",
    },
    {
      title: "faph_high_price",
      dataIndex: "faph_high_price",
      key: "faph_high_price",
    },
    {
      title: "faph_discount",
      dataIndex: "faph_discount",
      key: "faph_discount",
    },
  ];

  return (
    <div className="w-3/4 mx-auto text-center">
      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={fphOne}
        columns={columns}
      />
    </div>
  );
}

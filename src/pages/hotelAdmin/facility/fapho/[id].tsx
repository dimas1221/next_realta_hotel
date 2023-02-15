import { doGetFapho } from "@/redux/action/actionFaphoAdmin";
import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Fapho() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const faphoHotel = useSelector((state: any) => state.FaphoReducer.fapho);
  const faphoOne = faphoHotel.filter((item: any) => item.fapho_faci_id == id);

  console.log(faphoOne);
  console.log(id);
  useEffect(() => {
    dispatch(doGetFapho());
  }, []);
  const columns: ColumnType<any>[] = [
    {
      title: "No.",
      dataIndex: "index",
      render: (text: any, record: any, index: any) => index + 1,
      fixed: "left",
    },
    {
      title: "fapho_faci_id",
      dataIndex: "fapho_faci_id",
      key: "fapho_faci_id",
    },
    {
      title: "fapho_thumbnail_filename",
      dataIndex: "fapho_thumbnail_filename",
      key: "fapho_thumbnail_filename",
    },
    {
      title: "fapho_photo_filename",
      dataIndex: "fapho_photo_filename",
      key: "fapho_photo_filename",
    },
    {
      title: "fapho_photo_filename",
      dataIndex: "fapho_photo_filename",
      key: "fapho_photo_filename",
    },
    {
      title: "fapho_url",
      dataIndex: "fapho_url",
      key: "fapho_url",
    },
    {
      title: "fapho_modifield_date",
      dataIndex: "fapho_modifield_date",
      key: "fapho_modifield_date",
    },
  ];
  return (
    <div className="w-3/4 mx-auto text-center">
      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={faphoOne}
        columns={columns}
      />
    </div>
  );
}

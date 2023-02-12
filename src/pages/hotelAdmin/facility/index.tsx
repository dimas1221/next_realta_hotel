import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doFaciAdminReq } from "@/redux/action/actionFaciAdmin";
import { Button, Table } from "antd";
export default function index() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );

  const faciOne = faciHotel.filter((item: any) => item.faci_hotel_id == id);

  useEffect(() => {
    dispatch(doFaciAdminReq());
  }, [id]);

  //   tambah faci
  const addData = (id: any) => {
    router.push({
      pathname: "facility/addFaci/" + id,
      //   query: { id },
    });
  };

  const columns = [
    {
      title: "facilities",
      dataIndex: "faci_name",
      key: "faci_name",
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
  ];
  return (
    <div className="w-3/4 mx-auto text-center">
      <div className="flex justify-start">
        <Button
          className="bg-red-500 mb-5 w-28"
          type="primary"
          onClick={() => addData(id)}
        >
          Add
        </Button>
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

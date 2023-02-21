import { doFaciAdminReq } from "@/redux/action/actionFaciAdmin";
import { doGetFapho, doUploadFapho } from "@/redux/action/actionFaphoAdmin";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
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
  Image,
} from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPicture } from "react-icons/ai";
import { ImUpload2 } from "react-icons/im";

import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

// const getBase64 = (file: RcFile): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

export default function Fapho() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const faphoHotel = useSelector((state: any) => state.FaphoReducer.fapho);
  const faphoOne = faphoHotel.filter((item: any) => item.fapho_faci_id == id);

  // reducer faci
  const faciHotel = useSelector(
    (state: any) => state.FaciAdminReducer.faciAdmin
  );
  const faciOne = faciHotel?.find((item: any) => item.faci_hotel_id == id);

  useEffect(() => {
    dispatch(doGetFapho());
    dispatch(doFaciAdminReq());
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
      title: "photo",
      key: "gambar",
      render: (text: any, record: any) => (
        <Image
          src={record?.fapho_url.slice(1)}
          alt={record?.fapho_url}
          className="w-1/4"
        />
      ),
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
      key: "fapho_modifield_date",
      render: (text: any, record: any, index) => (
        <p className="w-32 text-xs">
          {dayjs(record.fapho_modifield_date).format("DD MMMM YYYY hh:mm:ss")}
        </p>
      ),
    },
  ];
  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);

  // // upload image
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [previewTitle, setPreviewTitle] = useState("");
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // console.log("fielist", fileList);

  // const handleCancel = () => setPreviewOpen(false);

  // const handlePreview = async (file: UploadFile) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj as RcFile);
  //   }

  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewOpen(true);
  //   setPreviewTitle(
  //     file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
  //   );
  // };

  // const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
  //   setFileList(newFileList);

  // const uploadButton = (
  //   <div>
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );
  // end

  const [dataUp, setDataUp] = useState(new FormData());
  console.log("data up", dataUp);
  const onUploadLogo = (e: any) => {
    var img = e.target.files[0];
    let formData = new FormData();
    formData.append("file", img);
    console.log("image check => ", img);
    console.log("formData check => ", formData);
    // dispatch(doUploadFapho(formData));
    setDataUp(formData);
  };
  //  save photo
  const addData = (e: any) => {
    e.preventDefault();
    dispatch(doUploadFapho(dataUp));
    setModal2Open(false);
  };

  return (
    <div className="w-3/4 mx-auto text-center">
      <div className="flex justify-between py-3">
        <div className="flex justify-start space-x-3">
          <AiFillPicture className="text-2xl" />
          <span className="text-2xl font bold">{faciOne?.faci_name}</span>
        </div>
        <span>
          {dayjs(faciOne?.faci_modified_date).format("DD MMMM YYYY hh:mm:ss")}
        </span>
      </div>
      <hr className="text-gray-600 font-bold py-4" />
      <span className="text-base text-gray-300 flex justify-start">
        facility photo :
      </span>
      <div className="flex justify-end">
        {/* modal add data */}
        <>
          <Button
            className="bg-red-500 mb-5 flex justify-center px-3 py-2 items-center"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            <ImUpload2 />
            <p>upload</p>
          </Button>
          <Modal
            title="Upload Photo"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
          >
            <label className="custom-file-upload">
              <input type="file" onChange={onUploadLogo} accept="image/*" />
              Attach
            </label>
            <Button type="primary" className="bg-red-500" onClick={addData}>
              Save
            </Button>
          </Modal>
        </>
        {/* end */}
      </div>
      <Table
        scroll={{ x: true }}
        size="small"
        dataSource={faphoOne}
        columns={columns}
      />
    </div>
  );
}

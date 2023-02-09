import React, {useState, useEffect} from 'react'
import { doHotelAdminReq, doInsertHotel } from '@/redux/action/actionHotelAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, Modal, Radio, Table } from 'antd'
import { useRouter } from 'next/router'

type LayoutType = Parameters<typeof Form>[0]['layout'];

export default function index() {
    const dispatch = useDispatch()
    const router = useRouter()
    let dataHotel = useSelector((state:any)=> state.HotelAdminReducer.hotelAdmin)

    useEffect(()=>{
        dispatch(doHotelAdminReq())
    },[])

    // modal
    const [modal2Open, setModal2Open] = useState(false);
    // end
    // form inputan
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  
    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
      setFormLayout(layout);
    };
  
    const formItemLayout =
      formLayout === 'horizontal' ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } } : null;
  
    const buttonItemLayout =
      formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;
  
    // end

    const columns = [
        {
          title: 'hotel',
          dataIndex: 'hotelName',
          key: 'hotelName',
        },
        {
          title: 'Deskripsi',
          dataIndex: 'hotelDescription',
          key: 'hotelDescription',
        },
        {
          title: 'Rating',
          dataIndex: 'hotelRatingStar',
          key: 'hotelRatingStar',
        },
        {
            title: 'hotelPhonenumber',
            dataIndex: 'hotelPhonenumber',
            key: 'hotelPhonenumber',
        },
        {
            title: 'hotelModifiedDate',
            dataIndex: 'hotelModifiedDate',
            key: 'hotelModifiedDate',
        },
        ]

        // value input
        const [valueHotel, setValueHotel]= useState({
            hotelName:'',
            hotelDescription:'',
            hotelRatingStar:0,
            hotelPhonenumber:'',
            hotelModifiedDate:new Date().toISOString().substr(0, 10),
        })
        const eventHandler = (item:any): (event: any) => void => event =>{
            setValueHotel({...valueHotel, [item]: event.target.value})
        }
        // end
        // button insert data hotel
            const addData = (e:any)=>{
                e.preventDefault();
                dispatch(doInsertHotel(valueHotel))
                router.push('/hotelAdmin')
                setModal2Open(false)
            }
        // end
        
  return (
    <div className='w-3/4 mx-auto text-center'>
        <div className='flex justify-start'>
        {/* modal add data */}
        <>
        <Button className='bg-red-500 mb-5' type="primary" onClick={() => setModal2Open(true)}>
            Add
        </Button>
        <Modal
            title="Add Hotel"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
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
                        <Input placeholder="" value={valueHotel.hotelName} onChange={eventHandler('hotelName')} />
                    </Form.Item>
                    <Form.Item label="hotelDescription">
                        <Input placeholder="" value={valueHotel.hotelDescription} onChange={eventHandler('hotelDescription')}/>
                    </Form.Item>
                    <Form.Item label="hotelRatingStar">
                        <Input placeholder="" type='number' min={0} value={valueHotel.hotelRatingStar} onChange={eventHandler('hotelRatingStar')}/>
                    </Form.Item>
                    <Form.Item label="hotelPhonenumber">
                        <Input placeholder="" value={valueHotel.hotelPhonenumber} onChange={eventHandler('hotelPhonenumber')} type='text'/>
                    </Form.Item>
                    <Form.Item label="hotelModifiedDate">
                        <Input placeholder="input placeholder" value={valueHotel.hotelModifiedDate} onChange={eventHandler('hotelModifiedDate')} readOnly type='date'/>
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button type="primary" className='bg-red-500' onClick={addData}>Submit</Button>
                    </Form.Item>
                </Form>
           {/* end */}
        </Modal>
        </>
        {/* end */}
        </div>
        <div>
        <Table dataSource={dataHotel} columns={columns} />
        </div>
    </div>
  )
}



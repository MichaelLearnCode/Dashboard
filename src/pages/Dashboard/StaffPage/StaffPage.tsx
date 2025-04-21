import { Button } from "antd";
import { Layout, Typography, Input, Grid, Table,Tag,InputNumber, Select, Dropdown, Checkbox, Pagination, Modal, Form, notification, App } from "antd";
import type { TableProps, FormProps } from "antd";
import { LuChartBarIncreasing } from "react-icons/lu";
import { PiPencilSimple } from "react-icons/pi";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import usePagination from "@/hooks/usePagination";
import useFetch from "@/hooks/useFetch";
import useCustomCheckbox from "@/hooks/useCustomCheckbox";
import type staffType from "@/types/StaffType";
import { useState } from "react";
import axiosApi from "@/services/api/axiosApi";

const {useBreakpoint} = Grid;

type DataType = {
  order: number,
  key: string,
} & staffType;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  currentKey: string;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  currentKey,
  inputType,
  children,
  ...restProps
}) => {

  // 
  let inputNode;
  if (currentKey && currentKey === "gender")inputNode = <Select options={[{ value: 'male', label: "Nam" }, { value: "female", label: "Nữ" }]}></Select>;
  else if (currentKey && currentKey === "status")inputNode = <Select options={[{ value: 'active', label: "Hoạt động" }, { value: "inactive", label: "Ngừng hoạt động" }]}></Select>;
  else inputNode = inputType === "number"? <InputNumber/> : <Input/>
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Hãy nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const StaffPage = () => {
  const { Text, Link } = Typography;
  const {md} = useBreakpoint();
  const { Content, Footer } = Layout;
  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description
    });
  };
  const { modal } = App.useApp();
  const { data: staffData, setData } = useFetch<staffType>('/staff');
  const showConfirmDelete = (name: string, id: string) => {
    modal.confirm({
      title: `Xác nhận xóa nhân viên ${name}?`,
      onOk() {
        return axiosApi.delete(`/staff/${id}`).then(() => {
          const newData = staffData.filter(datum => datum.id !== id);
          setData(newData);
          openNotificationWithIcon('success', 'Thành công', `Xóa thành công nhân viên ${name}`)
        })
      },
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { variant: "solid", color: "danger" }
    });
  };
  const showConfirmEdit = (id: string) => {
    modal.confirm({
      title: "Xác nhận lưu",
      onOk() {
        return save(id).then(()=>{
          openNotificationWithIcon('success', 'Thành công', 'Lưu thành công')
        })
      },
      okText: "Lưu",
      cancelText: "Hủy",
      okButtonProps: { variant: "solid", color: "blue" }
    });
  };
  

  const dataOptions: string[] = [];
  const rawData: DataType[] = [];
  const dataLen = staffData.length;
  for (let i = 0; i < dataLen; i++) {
    rawData.unshift({
      key: `${i}`,
      order: dataLen - i,
      staffId: staffData[i].staffId,
      name: staffData[i].name,
      phone: staffData[i].phone,
      email: staffData[i].email,
      role: staffData[i].role,
      gender: staffData[i].gender,
      status: staffData[i].status,
      id: staffData[i].id
    });
    dataOptions.push(staffData[i].staffId);
  }
  const { checkedList, indeterminate, checkAll, onCheckedAllChange, onCheckedChange } = useCustomCheckbox<DataType["staffId"]>({ dataOptions })
  
  
  
  // Editing row
  
  
  
  
  
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isPutting, setIsPutting] = useState<boolean>(false);
  const isEditing = (record: DataType) => record.key === editingKey;
  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", phone: "", email: "",role: "",gender: "",status: "",...record });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (id: DataType["id"]) => {
    try {
      setIsPutting(true);
      const row = (await form.validateFields()) as DataType;
      const response = await axiosApi.put(`/staff/${id}`,{...row});
      const responseData =response.data as staffType;
      setIsPutting(false);
      const newData = [...staffData];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...responseData,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(responseData);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      setIsPutting(false);
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns:TableProps<DataType>["columns"] = [
    {
      title: <Checkbox onChange={onCheckedAllChange} checked={checkAll} indeterminate={indeterminate}><Text type="secondary">#</Text></Checkbox>,
      dataIndex: "order",
      key: "#",
      render: (text:string, record:DataType) => (<Checkbox checked={!!checkedList.find(checkid => checkid === record.staffId)} onChange={() => { onCheckedChange(record.staffId) }}><Text strong>{text}</Text></Checkbox>)
    },
    {
      title: <Text type="secondary">Mã nhân viên</Text>,
      dataIndex: "staffId",
      key: "id",
      render: (text:string) => <Link strong>{text}</Link>
    },
    {
      title: <Text type="secondary">Tên nhân viên</Text>,
      dataIndex: "name",
      key: "name",

      render: (text:string) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Số điện thoại</Text>,
      dataIndex: "phone",
      key: "phone",
      
      render: (text:string) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Email</Text>,
      dataIndex: "email",
      key: "email",
      
      render: (text:string) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Chức vụ</Text>,
      dataIndex: "role",
      key: "role",
      
      render: (text:string) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Giới tính</Text>,
      dataIndex: "gender",
      key: "gender",
      
      render: (text:string) => {
        const label = text === "male" ? "Nam" : "Nữ";
        return <Text strong>{label}</Text>
      }
    },
    {
      title: <Text type="secondary">Trạng thái</Text>,
      dataIndex: "status",
      
      key: "status",
      render: (status: "active" | "inactive") => {
        const color = status === "active" ? "success" : "volcano";
        const type = status === "active" ? "success" : "danger";
        const label = status === "active" ? "Hoạt động" : "Ngừng hoạt động";
        return <Tag key={status} color={color}><Text type={type} strong>{label}</Text></Tag>
      }
    },
    {
      title: <Text type="secondary">Thao tác</Text>,
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      render: (_:string, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button variant = "link" color = "cyan" onClick={() => showConfirmEdit(record.id)}>Lưu</Button>
            <Button variant = "link" color="red" onClick = {cancel}>Hủy</Button>
          </span>
        ) : <Dropdown disabled = {editingKey !== ""} arrow menu={{
          items: [{
            label: <Text><span onClick={()=>{edit(record)}} className="flex items-center"><PiPencilSimple className="text-[1rem] me-2" />Chỉnh sửa</span></Text>,
            key: 'edit'
          },
          {
            label: <Text type="danger"><span onClick={() => { showConfirmDelete(record.name, record.id) }} className="flex cursor-pointer items-center"><FiTrash2 className="text-[1rem] me-2" />Xóa</span></Text>,
            key: 'delete'
          }]
        }} trigger={["click"]}>
          <Button shape="circle" size="small" icon={<BsThreeDotsVertical />}></Button>
        </Dropdown>
      }
    }
  ]
  const mergedColumns: TableProps<DataType>["columns"] = columns.map((col) => {
    const editableKeys: React.Key[] = ["name", "phone", "email", "role","gender","status"];
  
    if ("dataIndex" in col && col.key && editableKeys.includes(col.key)) {
      return {
        ...col,
        onCell(record: DataType) {
          return {
            currentKey: this.key,
            inputType: "text",
            dataIndex: col.dataIndex ?? '',
            title: "title",
            editing: isEditing(record),
          }
        },
      };
    }
  
    return col;
  });

  const { currentPage, currentSize, handlePageChange, paginatedData: data } = usePagination(rawData);
  // Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const handleCancel = () => {
    setModalOpen(false);
  }
  const handleOpen = () => {
    setModalOpen(true);
  }
  type FieldType = {
    name: string,
    phone: string,
    email: string,
    role: string,
    gender: string,
    status: string
  }
  const handleOnCreateStaff: FormProps<FieldType>['onFinish'] = (values) => {
    setIsCreating(true);
    axiosApi.post('/staff', { ...values })
      .then((response) => { setData([...staffData, response.data]); setIsCreating(false); setModalOpen(false); openNotificationWithIcon('success', 'Thành công', 'Thêm nhân viên thành công'); })
  }
  

  return (
    <>
      <Content>
        {contextHolder}
        <Modal
          onCancel={handleCancel}
          open={modalOpen}
          title="Thêm nhân viên"
          footer={[]}
        >
          <Form
            name="createStaff"
            onFinish={handleOnCreateStaff}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: "Tên là bắt buộc" }, { min: 5, message: "Độ dài tối thiểu là 5" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Số điện thoại là bắt buộc" }, { min: 5, message: "Độ dài tối thiểu là 5" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Chức vụ" rules={[{ required: true, message: "Chức vụ là bắt buộc" }, { min: 3, message: "Độ dài tối thiểu là 3" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email là bắt buộc" }, { type: "email", message: "Email không hợp lệ" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
              <Select options={[{ value: 'male', label: "Nam" }, { value: "female", label: "Nữ" }]}></Select>
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
              <Select options={[{ value: 'active', label: "Hoạt động" }, { value: "inactive", label: "Ngừng hoạt động" }]}></Select>
            </Form.Item>
            <Form.Item label="">
              <div className="w-full flex justify-end"><Button loading={isCreating} type="primary" size="large" htmlType="submit">Thêm</Button></div>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex px-2 flex-col md:flex-row mt-[10px] md:items-center gap-y-2 md:gap-y-0 gap-x-2">
          <div className="flex md:ms-auto gap-x-2">
            <Button size="large" icon={<LuChartBarIncreasing />}><Text strong>Bộ lọc</Text></Button>
            <Input  size="large" placeholder="Tìm kiếm" prefix={<CiSearch className="text-xl md:max-w-[300px] w-full" />} />
          </div>
          <Button size="large" color="primary" className="w-full md:w-auto" onClick={handleOpen} variant="solid" icon={<FaPlus />}>Thêm mới</Button>
        </div>
        <div className="px-2 mt-[20px]">
          <Form form = {form} component={false}>
            <Table<DataType> 
              components={{
                body: { cell: EditableCell },
              }}
              scroll={{ x: 'max-content' }} 
              pagination={false} 
              bordered 
              
              columns={mergedColumns} 
              size="small" dataSource={data} 
            />
          </Form>
        </div>
      </Content>
      <Footer className="relative">
        <Pagination
          showTotal={(total, range) => {
            return <Text className="absolute hidden md:block left-[6px] top-[50%] translate-y-[-50%]" type="secondary">Hiển thị từ <Text strong>{range[0]}</Text> đến <Text strong>{range[1]}</Text> của <Text strong>{total}</Text> kết quả</Text>
          }}
          align= {md? 'end' : 'center'}
          showSizeChanger
          pageSize={currentSize}
          defaultPageSize={currentSize}
          current={currentPage}
          defaultCurrent={1}
          total={rawData.length}
          onChange={(page,pageSize)=>{handlePageChange(page, pageSize);setEditingKey('')}}
        />
      </Footer></>
  )
}

export default StaffPage;
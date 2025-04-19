import { Button } from "antd";
import { Layout, theme, ConfigProvider, Typography, Input, Table, Tag, Dropdown, Checkbox } from "antd";
import type { TableProps, MenuProps, CheckboxProps } from "antd";
import { LuChartBarIncreasing } from "react-icons/lu";
import { PiPencilSimple } from "react-icons/pi";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";


const CustomersPage = () => {
  const { Text, Link } = Typography;
  const { Content, Footer } = Layout;
  const { token: { colorBgContainer } } = theme.useToken();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  type DataType = {
    order: number,
    key: string,
    id: string,
    name: string,
    phone: string,
    email: string,
    role: string,
    gender: string,
    status: string
  }

  const actionItems: MenuProps['items'] = [
    {
      label: <Text><span className="flex items-center"><PiPencilSimple className="text-[1rem] me-2" />Chỉnh sửa</span></Text>,
      key: 'edit'
    },
    {
      label: <Text type="danger"><span className="flex items-center"><FiTrash2 className="text-[1rem] me-2" />Xóa</span></Text>,
      key: 'delete'
    }
  ]
  const dataOptions = ["E001"];
  const checkAll = dataOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < dataOptions.length;
  const onCheckedChange = (list: string[]) => {
    setCheckedList(list);
    console.log(list);
    console.log(checkAll)
  }
  const onCheckedAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? dataOptions : []);
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: <Text type="secondary"><Checkbox onChange={onCheckedAllChange} checked = {checkAll} indeterminate={indeterminate}>#</Checkbox></Text>,
      dataIndex: "order",
      key: "#",
      render: (text, record) => (<Checkbox value = {record.id}><Text strong>{text}</Text></Checkbox>)
    },
    {
      title: <Text type="secondary">Mã nhân viên</Text>,
      dataIndex: "id",
      key: "id",
      render: (text) => <Link strong>{text}</Link>
    },
    {
      title: <Text type="secondary">Tên nhân viên</Text>,
      dataIndex: "name",
      key: "name",
      render: (text) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Số điện thoại</Text>,
      dataIndex: "phone",
      key: "phone",
      render: (text) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Email</Text>,
      dataIndex: "email",
      key: "email",
      render: (text) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Chức vụ</Text>,
      dataIndex: "role",
      key: "role",
      render: (text) => (<Text strong>{text}</Text>)
    },
    {
      title: <Text type="secondary">Giới tính</Text>,
      dataIndex: "gender",
      key: "gender",
      render: (text) => (<Text strong>{text}</Text>)
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
      render: () => {
        return <Dropdown arrow menu={{ items: actionItems }} trigger={["click"]}>
          <Button shape="circle" size="small" icon={<BsThreeDotsVertical />}></Button>
        </Dropdown>
      }
    }
  ]

  const data: DataType[] = [
    {
      key: "1",
      order: 1,
      id: "E001",
      name: "Nguyễn Văn Nam",
      phone: "+84901234567",
      email: "nguyenvannam@gmail.com",
      role: "Quản trị viên",
      gender: "Nam",
      status: "active",
    }
  ]
  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          footerBg: colorBgContainer,
          footerPadding: "10px 6px"
        }
      }
    }}>
      <Content>
        <div className="flex px-2 mt-[10px] items-center gap-x-2">
          <Button size="large" className="ms-auto" icon={<LuChartBarIncreasing />}><Text strong>Bộ lọc</Text></Button>
          <Input style={{ maxWidth: "300px", width: "100%" }} size="large" placeholder="Tìm kiếm" prefix={<CiSearch className="text-xl" />} />
          <Button size="large" color="primary" variant="solid" icon={<FaPlus />}>Thêm mới</Button>
        </div>
        <div className="px-2 mt-[20px]">
          <Checkbox.Group onChange={onCheckedChange}>
            <Table<DataType> bordered  columns={columns} size = "small" dataSource={data} />
          </Checkbox.Group>
        </div>
      </Content>
      <Footer>Footer</Footer>
    </ConfigProvider>
  )
}

export default CustomersPage
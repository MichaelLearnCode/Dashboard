import { FormProps, Form, Input, Typography, Button, Checkbox, notification } from "antd";
import { useState } from "react";
import axiosApi from "@/services/api/axiosApi";
import useAuthStore from "@/store/AuthStore";
import type UserType from "@/types/UserType";
import { useNavigate } from "react-router-dom";
const { Link } = Typography;

const LoginPage = () => {
  const setAccessToken = useAuthStore((state)=>state.setAccessToken);
  const navigate = useNavigate();
  const setUser = useAuthStore((state)=>state.setUser);
  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description
    });
  };
  type FieldType = {
    email: string,
    password: string,
    remember: boolean
  }
  const [isLoading, setIsLoading] = useState(false);
  const onFinish:FormProps<FieldType>['onFinish'] = async (values)=>{
    console.log(1);
    setIsLoading(true);
    const response = await axiosApi.get('/users');
    setIsLoading(false);
    const users = response.data as UserType[];
    const user = users.find(user=>user.email === values.email && user.password === values.password);
    if (!user){
      return openNotificationWithIcon('error', 'Lỗi', 'Tài khoản hoặc mật khẩu không đúng');
    }
    setAccessToken(user.access_token);
    setUser(user);
    localStorage.setItem('access_token', user.access_token);
    openNotificationWithIcon('success', 'Thành công', `Chào mừng ${user.name}`);
    navigate('/dashboard/overall', {replace: true})
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      {contextHolder}
      <div className="flex p-[50px] w-[500px] md:w-[600px] rounded-sm shadow-lg flex-col items-center">
        <img className="w-[100px] mb-5" src="/image/img_logo.png" alt="" />
        <h1 className="mb-4 text-3xl font-semibold">Đăng nhập</h1>
        <p className="w-full text-center text-black/90 mb-6">Chào mừng bạn quay trở lại với TopDev! Hãy nhập thông tin bên dưới để đăng nhập</p>
        <Form initialValues={{remember: true, email: "t1@gmail.com", password: "pas"}} onFinish={onFinish} layout="vertical" className="w-[100%]">
          <Form.Item<FieldType> label="Email" name="email"
            rules={[{ required: true, message: "Email là bắt buộc" }, {type: "email", message: "Email không hợp lệ"}]}>
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Mật khẩu" name="password"
            rules={[{ required: true, message: "Mật khẩu là bắt buộc" }]}>
            <Input/>
          </Form.Item>
          <div className="flex items-center mb-4 justify-between">
            <Form.Item<FieldType> name="remember" style={{ marginBottom: 0 }} valuePropName="checked" label={null}>
              <Checkbox>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <Link>Quên mật khẩu?</Link>
          </div>
          <Form.Item<FieldType> label={null}>
            <Button htmlType= "submit" className="w-full" variant="solid" loading= {isLoading} type="primary">Đăng nhập</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
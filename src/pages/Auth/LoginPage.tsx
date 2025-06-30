import { FormProps, Form, Input, Typography, Button, Checkbox, notification } from "antd";
import useAuthStore from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
const { Link } = Typography;

const LoginPage = () => {
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
  const onFinish:FormProps<FieldType>['onFinish'] = async ()=>{
    setUser({email: 'michael@gmail.com', password: '123456', access_token: '2323', name: 'Michael', avatar: '/image/img_avatar.png'});
    localStorage.setItem('access_token', 'sdsdsdsd');
    openNotificationWithIcon('success', 'Thành công', `Chào mừng Michael`);
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
            <Button htmlType= "submit" className="w-full" variant="solid" type="primary">Đăng nhập</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
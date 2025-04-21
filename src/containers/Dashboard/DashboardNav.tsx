import { Typography, Select, SelectProps, Grid, GetProp, Dropdown, Badge, Button, Avatar } from "antd";
import type { MenuProps } from "antd";
import useConfigStore from "@/store/ConfigStore";
import { FiBell } from "react-icons/fi";


const { Title, Text } = Typography;
const { useBreakpoint } = Grid;
type DashboardNavProps = {
  title: string
}
type SelectOptionType = GetProp<SelectProps, 'options'>[number];
const DashboardNav = (props: DashboardNavProps) => {
  const {md, lg} = useBreakpoint();
  // Langugage
  const languageOptions: SelectOptionType[] = [
    { value: 'vi', label: <span className="flex items-center"><img className="w-[20px] rounded-sm aspect-[4/3] me-2" src="/image/img_flag_vi.webp" alt="" /><span className="hidden md:block">Tiếng Việt</span></span> },
    { value: 'en', label: <span className="flex items-center"><img className="w-[20px] rounded-sm aspect-[4/3] me-2" src="/image/img_flag_en.webp" alt="" /><span className="hidden md:block">English</span></span> }
  ]
  const language = useConfigStore((state) => state.language);
  const setLanguage = useConfigStore((state) => state.setLanguage);
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  }
  // Notification
  const notiMenu: MenuProps['items'] = [
    { key: '1', label: "Thông báo 1" },
    { key: '2', label: "Thông báo 2" }
  ]
  const userMenu: MenuProps['items'] = [
    { key: 'profile', label: 'Thông tin cá nhân' },
    { key: 'logout', label: 'Đăng xuất' }
  ];

  const { title } = props;
  return (
    <div className="flex items-center h-full justify-between">
      <Title level={5}>{title}</Title>
      <div className="flex justify-between items-center">
        <Select style={{ width: lg? '160px' : md? '120px' : 'auto', marginRight: "8px" }} defaultValue={language} options={languageOptions} onChange={handleLanguageChange} />
        <Dropdown menu={{ items: notiMenu }}>
          <Badge count={100} offset={[0, 7]}>
            <Button type="text" icon={<FiBell className="text-xl" />}></Button>
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items: userMenu }}>
          <div className="ms-[32px] flex items-center cursor-pointer">
            <Avatar shape="circle" src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/28.jpg" />
            <Text strong className="ms-1 text-lg hidden md:block">Test User</Text>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default DashboardNav
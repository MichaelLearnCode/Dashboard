import DashboardMenu from "./DashboardMenu";
import DashboardNav from "./DashboardNav";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Layout, ConfigProvider, theme, Button, App } from "antd";
const { Sider, Header } = Layout;

const DashboardCommon = () => {
  const [collasped, setCollasped] = useState<boolean>(false);
  const [currentHeader, setCurrentHeader] = useState<string>('');
  const headerHeight: number = 48;

  const { token: { colorBgContainer, colorSplit } } = theme.useToken();
  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          headerBg: colorBgContainer,
          siderBg: colorBgContainer,
          headerHeight: headerHeight,
          headerPadding: "0 28px",
          footerBg: colorBgContainer,
          footerPadding: "8px 6px"
        },
        Typography: {
          titleMarginBottom: 0
        }
      }
    }}>
      <App>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collasped} collapsedWidth={50}>
            <div className="border-r-[0.8px] w-full relative flex items-center" style={{ borderColor: colorSplit, height: headerHeight }}>
              {!collasped && <img className="w-[135px] ps-[28px]" src="/image/img_logo.png" alt="" />}
            </div>
            <DashboardMenu setTitle={setCurrentHeader} />
          </Sider>
          <Layout>
            <Header className="relative">
              <DashboardNav title={currentHeader} />
              <Button onClick={() => { setCollasped((collasped) => !collasped) }} icon={collasped ? <AiOutlineRight /> : <AiOutlineLeft />} size="small" className="left-0 translate-x-[-50%] top-[50%] translate-y-[-50%]" style={{ position: "absolute" }} variant="outlined"></Button>
            </Header>
            <Outlet />
          </Layout>
        </Layout>
      </App>

    </ConfigProvider>
  )
}

export default DashboardCommon
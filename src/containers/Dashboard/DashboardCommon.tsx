import DashboardMenu from "./DashboardMenu";
import DashboardNav from "./DashboardNav";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose, AiOutlineBars } from "react-icons/ai";
import { Layout, ConfigProvider, theme, Button, App, Grid, Drawer } from "antd";
const { Sider, Header } = Layout;
const { useBreakpoint } = Grid;

const DashboardCommon = () => {
  const [siderCollasped, setSiderCollasped] = useState<boolean>(false);
  const [drawerCollasped, setDrawerCollasped] = useState<boolean>(true);
  const [currentHeader, setCurrentHeader] = useState<string>('');
  const url = new URL(window.location.href);
  const currentLocation = url.pathname.split('/')[url.pathname.split('/').length - 1];
  const [current, setCurrent] = useState(currentLocation);
  const headerHeight: number = 48;
  const { md, sm } = useBreakpoint();
  const { token: { colorBgContainer, colorSplit } } = theme.useToken();
  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          headerBg: colorBgContainer,
          siderBg: colorBgContainer,
          headerHeight: headerHeight,
          headerPadding: md ? "0 28px" : '0 8px',
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
          <Sider trigger={null} collapsed={siderCollasped} breakpoint="md" collapsedWidth={sm? 50: 0} onCollapse={() => { setSiderCollasped(true) }}>
            <div className="border-r-[0.8px] w-full relative flex items-center" style={{ borderColor: colorSplit, height: headerHeight }}>
              {!siderCollasped && <img className="w-[135px] ps-[28px]" src="/image/img_logo.png" alt="" />}
            </div>
            <DashboardMenu current = {current} setCurrent = {setCurrent} menuHeight="100vh" setTitle={setCurrentHeader} />
          </Sider>
          <Layout>
            <ConfigProvider theme = {{token: {paddingLG: 0, colorSplit: colorBgContainer}}}>
              <Drawer
                width={200}
                placement="left"
                closable={false}
                onClose={()=>{setDrawerCollasped(true)}}
                open={!drawerCollasped}
              >
                <div className="flex"><Button type="text" icon={<AiOutlineClose />} className="ms-auto" onClick={() => { setDrawerCollasped(true) }}></Button></div>
                <DashboardMenu current = {current} setCurrent = {setCurrent} menuHeight="calc(100vh - 48px)" setTitle={setCurrentHeader} />
              </Drawer>
            </ConfigProvider>
            <Header className="relative">
              <DashboardNav drawerTrigger={<div className="sm:hidden me-2"><Button icon={<AiOutlineBars />} onClick={() => { setDrawerCollasped(false) }}></Button></div>} title={currentHeader} />
              <div className="hidden md:inline-block"><Button onClick={() => { setSiderCollasped((collasped) => !collasped) }} icon={siderCollasped ? <AiOutlineRight /> : <AiOutlineLeft />} size="small" className="left-0 translate-x-[-50%] top-[50%] translate-y-[-50%]" style={{ position: "absolute" }} variant="outlined"></Button></div>
            </Header>
            <Outlet />
          </Layout>
        </Layout>
      </App>

    </ConfigProvider>
  )
}

export default DashboardCommon
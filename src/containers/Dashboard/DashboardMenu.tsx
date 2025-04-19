import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import {Menu} from "antd";
import { AiOutlinePieChart , AiOutlineUser, AiOutlineTeam, AiOutlineInbox, AiOutlineTruck, AiOutlineDollar, AiOutlineBell  } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuHouse, LuTicketPercent  } from "react-icons/lu";
import { Link } from "react-router-dom";


type DashboardMenuProps = {
    setHeader: (value:string)=>void;
}

const DashboardMenu = (props: DashboardMenuProps) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const itemsLabel:Record<string,string>[] = [
        {key: "overall", label:"Tổng quan"},
        {key: "staff", label:"Nhân viên"},
        {key: "customers", label:"Khách hàng"},
        {key: "orders", label:"Đơn hàng"},
        {key: "storage", label:"Kho hàng"},
        {key: "shipping", label:"Đơn vận"},
        {key: "finance", label:"Tài chính"},
        {key: "finance1", label:"Tài chính 1"},
        {key: "finance2", label:"Tài chính 2"},
        {key: "finance3", label:"Tài chính 3"},
        {key: "discount", label:"Khuyến mại"},
        {key: "notification", label:"Thông báo"},
        {key: "categories", label:"Danh mục"},
        {key: "category1", label:"Danh mục 1"},
        {key: "category2", label:"Danh mục 2"},
        {key: "category3", label:"Danh mục 3"}
    ]
    const items:MenuItem[] = [
        {
            key: 'overall',
            label: <Link to = "overall">Tổng quan</Link>,
            icon: <AiOutlinePieChart  style = {{fontSize: "1.2rem"}}/>
        },
        {
            key: 'staff',
            label: <Link to="staff">Nhân viên</Link>,
            icon: <AiOutlineUser style = {{fontSize: "1.2rem"}}/>
        },
        {
            key: 'customers',
            label: <Link to = "customers">Khách hàng</Link>,
            icon: <AiOutlineTeam style = {{fontSize: "1.2rem"}}/>,
            
        },
        {
            key: 'orders',
            label: <Link to = "orders">Đơn hàng</Link>,
            icon: <AiOutlineInbox  style = {{fontSize: "1.2rem"}}/>,
            
        },
        {
            key: 'storage',
            label: <Link to = "storage">Kho hàng</Link>,
            icon: <LuHouse style = {{fontSize: "1.2rem"}}/>,
            
        },
        {
            key: 'shipping',
            label: <Link to = "shipping">Đơn vận</Link>,
            icon: <AiOutlineTruck  style = {{fontSize: "1.2rem"}}/>,
        },
        {
            key: 'finance',
            label: "Tài chính",
            icon: <AiOutlineDollar style = {{fontSize: "1.2rem"}}/>,
            children: [
                {key:'finance1', label: 'Tài chính 1'},
                {key:'finance2', label: 'Tài chính 2'},
                {key:'finance3', label: 'Tài chính 3'}
            ]
        },
        {
            key: 'discount',
            label: <Link to = "discount">Khuyến mại</Link>,
            icon: <LuTicketPercent style = {{fontSize: "1.2rem"}}/>,
            
        },
        {
            key: 'notification',
            label: <Link to = "notification">Thông báo</Link>,
            icon: <AiOutlineBell style = {{fontSize: "1.2rem"}}/>,
            
        },
        {
            key: 'categories',
            label: "Danh mục",
            icon: <HiOutlineMenuAlt2 style = {{fontSize: "1.2rem"}}/>,
            children: [
                {key: "category1", label: 'Danh mục 1'},
                {key: "category2", label: 'Danh mục 2'},
                {key: "category3", label: 'Danh mục 3'}
            ]
        }
    ]
    const {setHeader} = props;
    const [current, setCurrent] = useState("overall");
    
    useEffect(()=>{
        setHeader(itemsLabel.find((item)=>item.key === current)?.label as string);
    },[setHeader, current])
    const onClick:MenuProps['onClick'] = (e)=>{
        setCurrent(e.key);
    }
    
    return (
        <Menu style={{ height: "100vh"}} onClick = {onClick} mode = "inline" selectedKeys={[current]} items = {items}/>
    )
}

export default DashboardMenu
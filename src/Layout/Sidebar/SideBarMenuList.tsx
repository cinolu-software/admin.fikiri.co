import { useAppSelector } from "@/Redux/Hooks";
import { Fragment, useState, useEffect } from "react";
import { MenuList } from "@/Data/Layout/Menu";
import { MenuItem } from "@/Types/LayoutTypes";
import Menulist from "./Menulist";
import { useTranslation } from "react-i18next";
import Link from 'next/link';

const SidebarMenuList = () => {

  const [activeMenu, setActiveMenu] = useState([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const { t } = useTranslation("common");
  const {userData} = useAppSelector(state => state.authentication);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(()=>{
    setUserRoles(userData?.roles?.map((role:string) => role) || []);
  }, [userData]);

  const hasAccess = (requiredRoles?: string[]) => {
    if (!requiredRoles) return true; 
    if (requiredRoles.length === 0) return userRoles.length === 0; 
    return requiredRoles.some((role) => userRoles.includes(role));
  };
  
  const visibleMenuList = MenuList?.filter((menuItem) => hasAccess(menuItem.requiredRoles));

  const shouldHideMenu = (mainMenu: MenuItem) => {
    return mainMenu?.Items?.map((data) => data.title).every((titles) => pinedMenu.includes(titles || ""));
  };

  return (
    <>
      {
        visibleMenuList &&
          visibleMenuList.map((mainMenu: MenuItem, index) => (
            <Fragment key={index}>
              <li className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>
                <div>
                  <h6 className={mainMenu.lanClass ? mainMenu.lanClass : ""}>{t(mainMenu.title)}</h6>
                </div>
              </li>
              <Menulist menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
            </Fragment>
          ))
      }
      <Link
          href={'http://localhost:4000/'}
          className="text-white ms-4 mt-5 link-offset-2 link-underline link-underline-opacity-100"
          target="_blank"
      >
        Dashboard Fikiri V1
      </Link>
    </>
  );
};

export default SidebarMenuList;
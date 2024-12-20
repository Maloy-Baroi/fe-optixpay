"use client"

import { menuItems } from "@/features/route-list";
import { Button } from "antd";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuProps {
  toggle?: () => void;
}

const Menu = ({ toggle }: MenuProps) => {
  const pathname = usePathname();
  const activeLink = "/" + pathname?.split("/")[1];

  const [permissions, setPermissions] = useState<string | null>(null);

  //   fetch permission or get it from userlog in info

    useEffect(() => {
      const getUserPermissions = async () => {
        // Get the role from cookies
        const user_groups: string | undefined = Cookies.get("role"); // Changed to `string | undefined`

        // Set the user group only if a valid value exists in the cookie
        if (user_groups) {
          setPermissions(user_groups);
        }

        // try {
        //   const response = await fetch(
        //     "https://raw.githubusercontent.com/abdarker/qrcode-gen/refs/heads/master/permissions.json"
        //   );
        //   const data = await response.json();

        // } catch (error) {
        //   console.error("Failed to fetch permissions:", error);
        // }
      };

      getUserPermissions();
    }, []);

  return (
    <div className="flex flex-col h-auto">
      {menuItems.map((group, index) => (
        <div key={index}>
          {group.items
            .filter((item) => permissions && item.permission.includes(permissions))
            .map((item, idx) => (
              <Button
                key={idx}
                className={`hover:!bg-blue-50 !border-none !p-3 !shadow-none ${activeLink === item.path ? "!text-[#FF4D00]" : "text-[#919eab]"}`}
              >
                <Link
                  className="nav-link flex items-center font-medium py-1 px-6 transition-all duration-500 whitespace-nowrap hover:text-[#FF4D00]"
                  href={item.path}
                  onClick={toggle}
                >
                  <item.icon className="mr-1"/>
                  {item.label}
                </Link>
              </Button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;

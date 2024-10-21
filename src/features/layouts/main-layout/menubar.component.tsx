"use client"

import { menuItems } from "@/features/route-list";
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
    <div className="flex flex-col">
      {menuItems.map((group, index) => (
        <div key={index}>
          {group.group !== "Dashboard" && (
            <div className="text-[#454f5b] px-6 py-4 text-sm uppercase tracking-widest font-bold">
              {group.group}
            </div>
          )}

          {group.items
            .filter((item) => permissions && item.permission == 'admin')
            .map((item, idx) => (
              <Link
                key={idx}
                className={`nav-link flex items-center text-[#919eab] ${
                  activeLink == item.path ? "text-[#FF4D00]" : "text-[#919eab]"
                } font-medium py-2 px-6 transition-all duration-500 whitespace-nowrap hover:text-[#FF4D00]`}
                href={item.path}
                onClick={toggle}
              >
                <item.icon className="mr-2" />
                {item.label}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;

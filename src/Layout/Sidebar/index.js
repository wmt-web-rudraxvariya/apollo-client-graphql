import React from "react";

const Sidebar = () => {
  const sidebarMenu = [
    "Home",
    "About",
    "Contact",
    "Login",
    "Signup",
    "Post",
    "Settings",
    "Logout",
  ];
  return (
    <div className="px-2">
      <ul>
        {sidebarMenu.map((item, i) => {
          return (
            <div className="flex justify-items-start items-center gap-2 py-3">
              <div>
                <img
                  src={`https://picsum.photos/800/450?random=${i}`}
                  className="rounded-full w-8 h-8"
                  alt=""
                />
              </div>
              <div>
                <p className="text-sm">{item}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";

const RightBar = () => {
  const sidebarMenu = [
    "Rahul",
    "Raj",
    "Ravi",
    "Rajesh",
    "Raju",
    "Rajesh",
    "Raju",
    "Rajesh",
    "Raju",
    "Rajesh",
  ];
  return (
    <div className="px-2 flex flex-col justify-end">
      <span className="font-large py-5">Chats</span>
      <hr />
      <ul>
        {sidebarMenu.map((item, i) => {
          return (
            <div className="flex justify-items-start items-center gap-2 py-2">
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

export default RightBar;

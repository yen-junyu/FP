import React, { useState } from "react";
import CustomDropdownButton from "../dropdown2";
import Table from "../table2";
import { Button, Space, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const Page: React.FC = () => {
  const [mode, setMode] = useState("Edit");

  return (
    <>
      <Tooltip title="這是一個按鈕和圖標">
        <Button className="flex items-center">
          <svg
            className="w-[20px] h-[20px] text-gray-800 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M15.5 10.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0a2.225 2.225 0 0 0-1.666.75H12m3.5-.75a2.225 2.225 0 0 1 1.666.75H19V7m-7 4V3h5l2 4m-7 4H6.166a2.225 2.225 0 0 0-1.666-.75M12 11V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v9h1.834a2.225 2.225 0 0 1 1.666-.75M19 7h-6m-8.5 3.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
            />
          </svg>
          <span>按鈕</span>
        </Button>
      </Tooltip>

      <div className="text-black">{mode}</div>
      <CustomDropdownButton mode={mode} setMode={setMode} />
      <Table mode={mode}></Table>
    </>
  );
};

export default Page;

import React, { useState } from "react";
import { Dropdown, Button } from "antd";
import { EditOutlined, LeftSquareOutlined } from "@ant-design/icons";

import styled from "styled-components";
import type { MenuProps } from "antd";
import "./index.css";

// 創建自定義的 Button 元件
const CustomButton = styled(Button)`
  /* 在這裡添加您的自定義樣式 */
  background-color: red;
  color: white;
  /* ... */
`;

const ButtonContainer = styled.div`
  .ant-btn-default {
    color: #ffffff;
    background-color: darkgreen;
  }
  .ant-btn-default:not(:disabled):hover {
    color: #ffffff;
    background-color: yellow;
  }
`;

type Props = {
  mode: string;
  setMode: (mode: string) => void;
};

const CustomDropdownButton: React.FC<Props> = ({ mode, setMode }) => {
  //const [mode, setMode] = useState("Edit");

  const handleButtonClick = () => {
    console.log("btn click");
  };
  const handleMenuClick: MenuProps["onClick"] = (info) => {
    setMode(info.key);
    console.log(info);
  };
  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "Edit",
    },
    {
      label: "Dispatch",
      key: "Dispatch",
    },
    {
      label: "Release",
      key: "Release",
    },
  ];
  const changeIcon = (mode: string) => {
    if (mode === "Dispatch") {
      return (
        <svg
          className="w-[20px] h-[20px] text-gray-800 text-white"
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
      );
    } else if (mode === "Release") {
      return <LeftSquareOutlined />;
    }
    return <EditOutlined />;
  };
  return (
    <ButtonContainer>
      <Dropdown.Button
        onClick={handleButtonClick}
        menu={{ items: items, onClick: handleMenuClick }}
      >
        <div className="flex items-center">
          {changeIcon(mode)}
          &nbsp;
          {mode}
        </div>
      </Dropdown.Button>
    </ButtonContainer>
  );
};

export default CustomDropdownButton;

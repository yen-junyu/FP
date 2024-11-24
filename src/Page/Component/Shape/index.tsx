import React from "react";
import { Handle } from "react-flow-renderer";
import { Position } from "reactflow";

const InitialNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      width: 100,
      height: 100,
      borderRadius: "50%",
      backgroundColor: "#4CAF50",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {data.label}
  </div>
);

const TriggerNode222 = ({ data }: { data: { label: string } }) => {
  console.log("trigger");
  return (
    <div
      style={{
        width: 100,
        height: 100,
        backgroundColor: "#FF9800",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.label}
    </div>
  );
};

const AssertNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      width: 100,
      height: 100,
      backgroundColor: "#2196F3",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {data.label}
  </div>
);

const TriggerNode = ({ data }: { data: { label: string } }) => {
  
  return (
    <div
      style={{
        backgroundColor: "#9ca8b3",
        padding: "14px",
        borderRadius: "50%", // 圓形樣式
        width: "100px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Target handle 左側連接點 */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${data}.left`}
        style={{
          borderRadius: "0", // 設置無圓角，避免影響連接線
          width: "10px", // 可以調整連接點的大小
          height: "10px",
        }}
      />
      {/* 顯示節點的名稱 */}
      <div id={`${data}.id`} style={{ color: "white", fontWeight: "bold" }}>
        {data.label}
      </div>
      {/* 右側的兩個 Source handle 連接點 */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${data}.right1`}
        style={{
          top: "30%", // 第一個連接點位置
          borderRadius: 0,
          width: "10px", // 調整連接點大小
          height: "10px",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${data}.right2`}
        style={{
          top: "70%", // 第二個連接點位置
          borderRadius: 0,
          width: "10px",
          height: "10px",
        }}
      />
    </div>
  );
};

export { InitialNode, TriggerNode, AssertNode };

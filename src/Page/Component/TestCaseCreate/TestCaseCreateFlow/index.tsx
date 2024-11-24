import React, { useCallback, useState } from "react";
import { Button } from "antd";
import ReactFlow, { addEdge, MiniMap, Controls } from "react-flow-renderer";
import { TriggerNode } from "../../Shape";
import DynamicTabs from "../../DynamicTab";
import DynamicTab from "../../DynamicTab";
import { useAtom } from "jotai";
import { testCaseAtom } from "../../../../Atom/TestCaseAtom";

// 節點類型對應到不同的節點組件
const InitialNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      width: 100,
      height: 100,
      borderRadius: "50%", // 圓形
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

// 節點類型
const nodeTypes = {
  initial: InitialNode,
  trigger: TriggerNode,
  assert: AssertNode,
};

const CreateTestCase: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [nodeId, setNodeId] = useState(0);

  //const [clickedNode, setClickedNode] = useState(0);
  const [testCase, setTestCase] = useAtom(testCaseAtom);
  const [clickedNode, setClickedNode] = useState<any>(null);

  const addNode = useCallback(
    (type: "initial" | "trigger" | "assert", label: string) => {
      setNodeId((prevNodeId) => {
        const newNodeId = `node-${prevNodeId}`;
        const newNode = {
          id: newNodeId,
          data: {
            label: label,
          },
          position: { x: 150, y: 50 + 75 * prevNodeId },
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);

        if (prevNodeId > 0) {
          const newEdge = {
            id: `edge-${prevNodeId - 1}-${prevNodeId}`,
            source: `node-${prevNodeId - 1}`,
            target: newNodeId,
            animated: true,
          };
          setEdges((prevEdges) => addEdge(newEdge, prevEdges));
        }

        return prevNodeId + 1; // 返回更新後的 nodeId
      });
    },
    [setNodes, setEdges] // 不依賴 nodeId，直接使用函數式更新
  );

  const handleNodeClick = (_event: any, node: any) => {
    setClickedNode(node);
    console.log("Clicked node:", node);
    // You can access node data here
  };
  return (
    <div style={{ display: "flex" }}>
      <DynamicTabs addNode={addNode} clickNode={clickedNode} ></DynamicTabs>
      {/* 右側流程圖區域 */}
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        <div
          style={{
            width: "400px",
            height: "100%",
            border: "1px solid #ddd",
            overflow: "auto", // 启用滚动条
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            style={{ width: "100%", height: "100%" }}
            //nodeTypes={nodeTypes}
            zoomOnScroll={false}
            panOnDrag={true}
            nodesDraggable={false}
            elementsSelectable={false}
            connectionLineStyle={{ strokeWidth: 2, stroke: "#000" }}
            onNodeClick={handleNodeClick}
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default CreateTestCase;

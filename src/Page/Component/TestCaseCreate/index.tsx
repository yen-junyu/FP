import React, { useState } from "react";
import { Modal, Input, Button, Card, Layout } from "antd";
import ReactFlow, { Controls, MiniMap, addEdge } from "reactflow";
import { AssertNode, InitialNode, TriggerNode } from "../Shape";
import CreateTestCaseFlow from "./TestCaseCreateFlow";
import { useAtom } from "jotai";
import { testCaseAtom } from "../../../Atom/TestCaseAtom";

interface TestCaseCreateProps {
  //onConfirm: (testCase: { name: string; description: string }) => void;
  onCancel: () => void;
}

// const nodeTypes = {
//   initial: InitialNode,
//   trigger: TriggerNode,
//   assert: AssertNode,
// };

// const CreateTestCase: React.FC = () => {
//   // 儲存流程圖的節點與邊
//   const [nodes, setNodes] = useState<any[]>([]);
//   const [edges, setEdges] = useState<any[]>([]);
//   const [nodeId, setNodeId] = useState(0); // 節點ID自增

//   // 添加節點函數
//   const addNode = (type: "initial" | "trigger" | "assert") => {
//     // 為每個節點創建唯一ID並設置屬性
//     const newNode = {
//       id: `node-${nodeId}`,
//       type: nodeTypes[type],
//       data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
//       position: { x: 250, y: 100 * nodeId }, // 使節點從上到下排列
//       style: {
//         border: "2px solid #000", // 顯示邊框
//         borderRadius: "5px", // 圓角
//         padding: "10px", // 內邊距
//       },
//     };

//     // 更新節點與邊
//     setNodes((prevNodes) => [...prevNodes, newNode]);
//     if (nodeId > 0) {
//       // 連接到上一個節點
//       const newEdge = {
//         id: `edge-${nodeId - 1}-${nodeId}`,
//         source: `node-${nodeId - 1}`,
//         target: `node-${nodeId}`,
//         animated: true, // 動態箭頭
//       };
//       setEdges((prevEdges) => addEdge(newEdge, prevEdges));
//     }

//     setNodeId(nodeId + 1);
//   };

//   return (
//     <Layout style={{ height: "100vh" }}>
//       {/* 左側創建區域 */}
//       <Layout.Sider width={200} style={{ background: "#fff" }}>
//         <Button
//           type="primary"
//           onClick={() => addNode("initial")}
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           Add Initial
//         </Button>
//         <Button
//           type="default"
//           onClick={() => addNode("trigger")}
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           Add Trigger
//         </Button>
//         <Button
//           type="default"
//           onClick={() => addNode("assert")}
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           Add Assert
//         </Button>
//       </Layout.Sider>

//       {/* 右側流程圖區域 */}
//       <Layout.Content
//         style={{ padding: "20px", display: "flex", justifyContent: "center" }}
//       >
//         <div
//           style={{ width: "100%", height: "100%", border: "1px solid #ddd" }}
//         >
//           <ReactFlow
//             nodes={nodes} // 傳遞節點
//             edges={edges} // 傳遞邊
//             style={{ width: "100%", height: "100%" }}
//             nodeTypes={nodeTypes} // 添加節點類型
//           >
//             <MiniMap />
//             <Controls />
//           </ReactFlow>
//         </div>
//       </Layout.Content>
//     </Layout>
//   );
// };

const TestCaseCreate: React.FC<TestCaseCreateProps> = ({ onCancel }) => {
  const [testCaseName, setTestCaseName] = useState("");
  const [description, setDescription] = useState("");
  //   const [savedTestCase, setSavedTestCase] = useState<{
  //     name: string;
  //     description: string;
  //   } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [testCase, setTestCase] = useAtom(testCaseAtom);

  const handleConfirm = () => {
    if (!testCaseName.trim() || !description.trim()) {
      return Modal.error({
        title: "Error",
        content: "Test Case Name and Description is required",
      });
    }
    setIsModalVisible(false);
    setTestCase({ testCaseName, description });
    //setSavedTestCase({ name, description });
  };

  return (
    <div>
      <Modal
        title="Create New Test Case"
        open={isModalVisible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Confirm
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Test Case Name:
          </label>
          <Input
            placeholder="Enter test case name"
            value={testCaseName}
            onChange={(e) => setTestCaseName(e.target.value)}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: 8 }}>
            Description:
          </label>
          <Input.TextArea
            rows={4}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal>
      {testCase.testCaseName != "" && testCase.description != "" && (
        <Card title="Saved Test Case" style={{ marginBottom: 16 }}>
          {/* <p>
            <strong>Name:</strong> {savedTestCase.name}
          </p>
          <p>
            <strong>Description:</strong> {savedTestCase.description}
          </p> */}
          <CreateTestCaseFlow></CreateTestCaseFlow>
        </Card>
      )}
    </div>
  );
};

export default TestCaseCreate;

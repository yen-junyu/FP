import React, { useEffect, useState } from "react";
import { Tabs, Button, Space, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AddFlowNode from "../TestCaseCreate/AddFlowNode";

const { TabPane } = Tabs;
interface DynamicTabsProps {
  addNode: (type: "initial" | "trigger" | "assert", label: string) => void;
  clickNode: any;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({ addNode, clickNode }) => {
  const [tabs, setTabs] = useState<
    { key: string; title: string; content: React.ReactNode }[]
  >([
    {
      key: "default",
      title: "Add Step",
      content: <AddFlowNode addNode={addNode} />,
    },
  ]);
  const [activeKey, setActiveKey] = useState<string>("default");
  const [tabId, setTabId] = useState<number>(1); // Counter for unique tab keys
  useEffect(() => {
    console.log(clickNode);
    if (clickNode && clickNode.data) {
      const label = clickNode.data.label;
      addTab(label);
    }
  }, [clickNode]);
  // Function to add a new tab
  const addTab = (label: string) => {
    const newTabKey = label;
    const newTab = {
      key: newTabKey,
      title: label,
      content: `This is the content of Tab ${tabId}`,
    };

    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveKey(newTabKey); // Set the new tab as active
    setTabId(tabId + 1);
  };

  // Function to remove a tab
  const removeTab = (targetKey: string) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.key !== targetKey));

    // If the removed tab is active, set the active tab to another tab
    if (activeKey === targetKey && tabs.length > 1) {
      const nextActiveKey =
        tabs[0]?.key !== targetKey ? tabs[0]?.key : tabs[1]?.key;
      setActiveKey(nextActiveKey ?? "default");
    }
  };

  // Callback when the active tab changes
  const onTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <Tabs
        activeKey={activeKey}
        onChange={onTabChange}
        type="editable-card" // Allow tabs to be closable
        onEdit={(targetKey, action) => {
          if (action === "remove") {
            removeTab(targetKey as string);
          }
        }}
        hideAdd // Hide the "+" button
      >
        {tabs.map((tab) => (
          <TabPane
            tab={tab.title}
            key={tab.key}
            closable={tab.key !== "default"} // Default tab cannot be closed
          >
            {tab.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default DynamicTabs;

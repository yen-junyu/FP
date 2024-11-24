import React, { useState } from "react";
import { Button, Form, Input, Select, Upload, Space, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isCreatingAtom, testCaseAtom } from "../../../../Atom/TestCaseAtom";
import { useAtom } from "jotai";

const { Option } = Select;
const { TextArea } = Input;

interface DynamicTabsProps {
  addNode: (type: "initial" | "trigger" | "assert", label: string) => void;
  //handleNodeClick: () => void;
}
const AddFlowNode: React.FC<DynamicTabsProps> = ({ addNode }) => {
  const [currentForm, setCurrentForm] = useState<string>("initial");
  const [channels] = useState(["Email", "SMS", "Push Notification"]);
  const [methods] = useState(["GET", "POST", "PUT", "DELETE"]);
  const [resultType, setResultType] = useState<string | null>(null);
  const [testCase] = useAtom(testCaseAtom);
  const [resultTypes, setResultTypes] = useState<string[]>([
    "DB",
    "Log",
    "Metric",
    "Alert",
  ]);
  const [dbOptions, setDbOptions] = useState<string[]>(["DB1", "DB2", "DB3"]);
  const [tables, setTables] = useState<string[]>([
    "Table1",
    "Table2",
    "Table3",
  ]);
  const [aps, setAps] = useState<string[]>(["AP1", "AP2", "AP3"]);
  const [metrics, setMetrics] = useState<string[]>([
    "CPU Usage",
    "Memory Usage",
    "Disk Usage",
  ]);
  const [alertFiringOptions, setAlertFiringOptions] = useState<string[]>([
    "true",
    "false",
  ]);

  const onResultTypeChange = (value: string) => {
    setResultType(value);
  };

  const onPing = () => {
    console.log("Ping button clicked!");
  };

  // 動態選單選項的狀態
  const [typeOptions, setTypeOptions] = useState<string[]>([
    "Type 1",
    "Type 2",
    "Type 3",
  ]);
  const [channelOptions, setChannelOptions] = useState<string[]>([
    "Channel 1",
    "Channel 2",
    "Channel 3",
  ]);
  const [methodOptions, setMethodOptions] = useState<string[]>([
    "GET",
    "POST",
    "PUT",
    "DELETE",
  ]);
  const [isCreating, setIsCreating] = useAtom(isCreatingAtom); // 控制顯示哪個頁面

  // 表單提交處理
  const onFinish = (values: any) => {
    console.log("Submitted values:", values);
    addNode("initial", values.stepName);
  };

  const options = [
    { label: "Initial", value: "initial" },
    { label: "Trigger", value: "trigger" },
    { label: "Assert", value: "assert" },
  ];

  const handleFormChange = (e: any) => {
    setCurrentForm(e.target.value);
  };

  const FinishButtonHandle = (e: any) => {
    setIsCreating(false);
  };

  return (
    <div style={{ padding: 20, width: "800px" }}>
      {/* 上方按鈕 */}
      <div>
        <Form layout="vertical">
          {/* Test Case Name */}
          <Form.Item label="Test Case Name">
            <div>{testCase.testCaseName || "N/A"}</div>
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description">
            <div>{testCase.description || "N/A"}</div>
          </Form.Item>
        </Form>
      </div>
      <Radio.Group
        options={options}
        onChange={handleFormChange}
        value={currentForm}
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: 20 }}
      />

      {/* 表單區域 */}
      {currentForm === "initial" && (
        <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 600 }}>
          {/* Step Name 單獨一行 */}
          <Form.Item
            label="Step Name"
            name="stepName"
            rules={[{ required: true, message: "Step Name is required" }]}
          >
            <Input placeholder="Enter Step Name" />
          </Form.Item>

          {/* Type 和 DB Name 在同一行 */}
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Type is required" }]}
              style={{ flex: 1, marginRight: 10, width: "200px" }}
            >
              <Select placeholder="Select Type">
                {typeOptions.map((type, index) => (
                  <Option key={index} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="DB Name"
              name="dbName"
              rules={[{ required: true, message: "DB Name is required" }]}
              style={{ flex: 1, width: "380px" }}
            >
              <Input placeholder="Enter DB Name" />
            </Form.Item>
          </Space>

          {/* Tables 單獨一行 */}
          <Form.Item
            label="Tables"
            name="tables"
            rules={[{ required: true, message: "Tables are required" }]}
          >
            <Input placeholder="Enter Tables" />
          </Form.Item>

          {/* SQL File 單獨一行 */}
          <Form.Item
            label="SQL File"
            name="sqlFile"
            rules={[{ required: true, message: "SQL File is required" }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload SQL File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Test Run
              </Button>
              <Button type="primary" htmlType="submit">
                Add Step
              </Button>
              <Button type="primary" htmlType="submit">
                Finish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}

      {currentForm === "trigger" && (
        <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 600 }}>
          {/* Step Name 單獨一行 */}
          <Form.Item
            label="Step Name"
            name="stepName"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Step Name is required" }]}
          >
            <Input placeholder="Enter Step Name" />
          </Form.Item>

          {/* Channel 和 Server 一行 */}
          <Space style={{ display: "flex", width: "100%" }} size="middle">
            <Form.Item
              label="Channel"
              name="channel"
              style={{ flex: 1, width: "200px" }}
              rules={[{ required: true, message: "Channel is required" }]}
            >
              <Select placeholder="Select Channel">
                {channels.map((channel) => (
                  <Select.Option key={channel} value={channel}>
                    {channel}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Server"
              name="server"
              style={{ flex: 1, width: "380px" }}
              rules={[{ required: true, message: "Server is required" }]}
            >
              <Input placeholder="Enter Server" />
            </Form.Item>
          </Space>

          {/* Path 和 Method 一行 */}
          <Space style={{ display: "flex", width: "100%" }} size="middle">
            <Form.Item
              label="Method"
              name="method"
              style={{ flex: 1, width: "200px" }}
              rules={[{ required: true, message: "Method is required" }]}
            >
              <Select placeholder="Select Method">
                {methods.map((method) => (
                  <Select.Option key={method} value={method}>
                    {method}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Path"
              name="path"
              style={{ flex: 1, width: "380px" }}
              rules={[{ required: true, message: "Path is required" }]}
            >
              <Input placeholder="Enter Path" />
            </Form.Item>
          </Space>

          {/* Full Path 單獨一行，附帶 Ping 按鈕 */}
          <Form.Item
            label="Full Path"
            name="fullPath"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Full Path is required" }]}
          >
            <Space style={{ display: "flex", width: "100%" }} size="middle">
              <Input
                placeholder="Enter Full Path"
                style={{ flex: 1, width: "525px" }}
              />
              <Button type="primary" onClick={onPing}>
                Ping
              </Button>
            </Space>
          </Form.Item>

          {/* Input 單獨一行 */}
          <Form.Item
            label="Input"
            name="input"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Input is required" }]}
          >
            <TextArea rows={4} placeholder="Enter Input" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Test Run
              </Button>
              <Button type="primary" htmlType="submit">
                Add Step
              </Button>
              <Button type="primary" onClick={FinishButtonHandle}>
                Finish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}

      {currentForm === "assert" && (
        <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 600 }}>
          {/* Step Name 單獨一行 */}
          <Form.Item
            label="Step Name"
            name="stepName"
            rules={[{ required: true, message: "Step Name is required" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Enter Step Name" />
          </Form.Item>

          {/* Result Type 單獨一行 */}
          <Form.Item
            label="Result Type"
            name="resultType"
            rules={[{ required: true, message: "Result Type is required" }]}
            style={{ width: 200 }}
          >
            <Select
              placeholder="Select Result Type"
              onChange={onResultTypeChange}
            >
              {resultTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* 動態表單內容 */}
          {resultType === "DB" && (
            <>
              {/* DB 和 Tables 一行 */}
              <Space style={{ display: "flex", width: "100%" }} size="middle">
                <Form.Item
                  label="DB"
                  name="db"
                  rules={[{ required: true, message: "DB is required" }]}
                  style={{ flex: 1, width: "200px" }}
                >
                  <Select placeholder="Select DB">
                    {dbOptions.map((db) => (
                      <Select.Option key={db} value={db}>
                        {db}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tables"
                  name="tables"
                  rules={[{ required: true, message: "Tables is required" }]}
                  style={{ flex: 1, width: "390px" }}
                >
                  <Select placeholder="Select Table">
                    {tables.map((table) => (
                      <Select.Option key={table} value={table}>
                        {table}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Space>

              {/* SQL File 單獨一行 */}
              <Form.Item
                label="SQL File"
                name="sqlFile"
                rules={[{ required: true, message: "SQL File is required" }]}
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload SQL File</Button>
                </Upload>
              </Form.Item>
            </>
          )}

          {resultType === "Log" && (
            <>
              {/* AP 單獨一行 */}
              <Form.Item
                label="AP (Virtual Service)"
                name="ap"
                rules={[{ required: true, message: "AP is required" }]}
                style={{ width: "100%" }}
              >
                <Select placeholder="Select AP">
                  {aps.map((ap) => (
                    <Select.Option key={ap} value={ap}>
                      {ap}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Keyword 單獨一行 */}
              <Form.Item
                label="Keyword"
                name="keyword"
                rules={[{ required: true, message: "Keyword is required" }]}
                style={{ width: "100%" }}
              >
                <Input placeholder="Enter Keyword" />
              </Form.Item>
            </>
          )}

          {resultType === "Metric" && (
            <>
              {/* Metric Name 和 Value 一行 */}
              <Space style={{ display: "flex", width: "100%" }} size="middle">
                <Form.Item
                  label="Metric Name"
                  name="metricName"
                  rules={[
                    { required: true, message: "Metric Name is required" },
                  ]}
                  style={{ flex: 1, width: "200px" }}
                >
                  <Select placeholder="Select Metric">
                    {metrics.map((metric) => (
                      <Select.Option key={metric} value={metric}>
                        {metric}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Value"
                  name="value"
                  rules={[{ required: true, message: "Value is required" }]}
                  style={{ flex: 1, width: "390px" }}
                >
                  <Input placeholder="Enter Value" />
                </Form.Item>
              </Space>
            </>
          )}

          {resultType === "Alert" && (
            <>
              {/* Alert Name 和 Firing 一行 */}
              <Space style={{ display: "flex", width: "100%" }} size="middle">
                <Form.Item
                  label="Alert Name"
                  name="alertName"
                  rules={[
                    { required: true, message: "Alert Name is required" },
                  ]}
                  style={{ flex: 1, width: "200px" }}
                >
                  <Input placeholder="Enter Alert Name" />
                </Form.Item>
                <Form.Item
                  label="Firing"
                  name="firing"
                  rules={[{ required: true, message: "Firing is required" }]}
                  style={{ flex: 1, width: "390px" }}
                >
                  <Select placeholder="True/False">
                    {alertFiringOptions.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Space>
            </>
          )}

          {/* 提交按鈕 */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Test Run
              </Button>
              <Button type="primary" htmlType="submit">
                Add Step
              </Button>
              <Button type="primary" onClick={FinishButtonHandle}>
                Finish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AddFlowNode;

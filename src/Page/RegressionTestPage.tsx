import React, { useState } from "react";
import {
  Steps,
  Form,
  Input,
  Button,
  Select,
  Card,
  Space,
  Table,
  message,
} from "antd";

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const TestCaseGUI: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [testCaseData, setTestCaseData] = useState<any>({
    name: "",
    description: "",
    initial: [],
    trigger: null,
    assertions: [],
  });

  const [form] = Form.useForm();

  const steps = [
    {
      title: "新增 Test Case",
      content: (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setTestCaseData((prev: any) => ({ ...prev, ...values }));
            message.success("Test Case Created!");
            setCurrentStep(1);
          }}
        >
          <Form.Item
            label="Test Case 名稱"
            name="name"
            rules={[{ required: true, message: "請輸入 Test Case 名稱!" }]}
          >
            <Input placeholder="請輸入名稱" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea rows={3} placeholder="可選描述" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "加入 Initial",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setTestCaseData((prev: any) => ({
                ...prev,
                initial: [...prev.initial, values],
              }));
              form.resetFields();
              message.success("Initial 條件已添加!");
            }}
          >
            <Form.Item
              label="條件名稱"
              name="conditionName"
              rules={[{ required: true, message: "請輸入條件名稱!" }]}
            >
              <Input placeholder="請輸入條件名稱" />
            </Form.Item>
            <Form.Item
              label="條件值"
              name="conditionValue"
              rules={[{ required: true, message: "請輸入條件值!" }]}
            >
              <Input placeholder="請輸入條件值" />
            </Form.Item>
            <Form.Item>
              <Button type="dashed" htmlType="submit">
                添加條件
              </Button>
            </Form.Item>
          </Form>
          <Table
            dataSource={testCaseData.initial}
            columns={[
              {
                title: "條件名稱",
                dataIndex: "conditionName",
                key: "conditionName",
              },
              {
                title: "條件值",
                dataIndex: "conditionValue",
                key: "conditionValue",
              },
            ]}
            rowKey="conditionName"
          />
          <Button type="primary" onClick={() => setCurrentStep(2)}>
            下一步
          </Button>
        </Space>
      ),
    },
    {
      title: "加入 Trigger 點",
      content: (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setTestCaseData((prev: any) => ({ ...prev, trigger: values }));
            message.success("Trigger 點已保存!");
            setCurrentStep(3);
          }}
        >
          <Form.Item
            label="Trigger 類型"
            name="triggerType"
            rules={[{ required: true, message: "請選擇 Trigger 類型!" }]}
          >
            <Select placeholder="選擇 Trigger 類型">
              <Option value="api">API 呼叫</Option>
              <Option value="event">事件觸發</Option>
              <Option value="cron">定時觸發</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="參數配置"
            name="triggerConfig"
            rules={[{ required: true, message: "請輸入參數配置!" }]}
          >
            <TextArea rows={3} placeholder="請輸入參數配置" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存並下一步
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "加入 Assertion",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setTestCaseData((prev: any) => ({
                ...prev,
                assertions: [...prev.assertions, values],
              }));
              form.resetFields();
              message.success("Assertion 已添加!");
            }}
          >
            <Form.Item
              label="檢查條件"
              name="assertCondition"
              rules={[{ required: true, message: "請輸入檢查條件!" }]}
            >
              <Input placeholder="請輸入檢查條件" />
            </Form.Item>
            <Form.Item
              label="期望值"
              name="expectedValue"
              rules={[{ required: true, message: "請輸入期望值!" }]}
            >
              <Input placeholder="請輸入期望值" />
            </Form.Item>
            <Form.Item>
              <Button type="dashed" htmlType="submit">
                添加 Assertion
              </Button>
            </Form.Item>
          </Form>
          <Table
            dataSource={testCaseData.assertions}
            columns={[
              {
                title: "檢查條件",
                dataIndex: "assertCondition",
                key: "assertCondition",
              },
              {
                title: "期望值",
                dataIndex: "expectedValue",
                key: "expectedValue",
              },
            ]}
            rowKey="assertCondition"
          />
          <Button
            type="primary"
            onClick={() => message.success("測試案例已完成!")}
          >
            完成
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Test Case 管理">
      <Steps current={currentStep}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 24 }}>{steps[currentStep].content}</div>
    </Card>
  );
};

export default TestCaseGUI;

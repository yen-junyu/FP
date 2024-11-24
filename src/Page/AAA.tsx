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
  Tag,
  message,
  Modal,
} from "antd";

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const TestCaseGUI: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [testCases, setTestCases] = useState<any[]>([]);
  const [currentTestCase, setCurrentTestCase] = useState<any>({
    name: "",
    description: "",
    initial: [],
    trigger: null,
    assertions: [],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editType, setEditType] = useState<
    "initial" | "trigger" | "assertions" | null
  >(null);
  const [selectedTestCase, setSelectedTestCase] = useState<any | null>(null);
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Add Test Case",
      content: (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setCurrentTestCase((prev: any) => ({ ...prev, ...values }));
            setCurrentStep(1);
          }}
        >
          <Form.Item
            label="Test Case Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the test case name!" },
            ]}
          >
            <Input placeholder="Enter test case name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Optional description" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      ),
    },
    {
      title: "Add Initial Conditions",
      content: (
        <>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setCurrentTestCase((prev: { initial: any }) => ({
                ...prev,
                initial: [...prev.initial, values],
              }));
              form.resetFields();
            }}
          >
            <Form.Item
              label="Condition Name"
              name="conditionName"
              rules={[
                { required: true, message: "Please enter the condition name!" },
              ]}
            >
              <Input placeholder="Enter condition name" />
            </Form.Item>
            <Form.Item
              label="Condition Value"
              name="conditionValue"
              rules={[
                {
                  required: true,
                  message: "Please enter the condition value!",
                },
              ]}
            >
              <Input placeholder="Enter condition value" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add Condition
            </Button>
          </Form>
          <Table
            dataSource={currentTestCase.initial}
            columns={[
              {
                title: "Condition Name",
                dataIndex: "conditionName",
                key: "conditionName",
              },
              {
                title: "Condition Value",
                dataIndex: "conditionValue",
                key: "conditionValue",
              },
            ]}
            rowKey="conditionName"
          />
          <Button type="primary" onClick={() => setCurrentStep(2)}>
            Next
          </Button>
        </>
      ),
    },
    {
      title: "Add Trigger",
      content: (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setCurrentTestCase((prev: any) => ({ ...prev, trigger: values }));
            setCurrentStep(3);
          }}
        >
          <Form.Item
            label="Trigger Type"
            name="triggerType"
            rules={[
              { required: true, message: "Please select the trigger type!" },
            ]}
          >
            <Select>
              <Option value="api">API Call</Option>
              <Option value="event">Event</Option>
              <Option value="cron">Cron Job</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      ),
    },
    {
      title: "Add Assertions",
      content: (
        <>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setCurrentTestCase((prev: { assertions: any }) => ({
                ...prev,
                assertions: [...prev.assertions, values],
              }));
              form.resetFields();
            }}
          >
            <Form.Item
              label="Assertion Condition"
              name="assertCondition"
              rules={[
                {
                  required: true,
                  message: "Please enter the assertion condition!",
                },
              ]}
            >
              <Input placeholder="Enter assertion condition" />
            </Form.Item>
            <Form.Item
              label="Expected Value"
              name="expectedValue"
              rules={[
                { required: true, message: "Please enter the expected value!" },
              ]}
            >
              <Input placeholder="Enter expected value" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add Assertion
            </Button>
          </Form>
          <Table
            dataSource={currentTestCase.assertions}
            columns={[
              {
                title: "Assertion Condition",
                dataIndex: "assertCondition",
                key: "assertCondition",
              },
              {
                title: "Expected Value",
                dataIndex: "expectedValue",
                key: "expectedValue",
              },
            ]}
            rowKey="assertCondition"
          />
          <Button
            type="primary"
            onClick={() => {
              setTestCases((prev) => [...prev, currentTestCase]);
              setCurrentTestCase({
                name: "",
                description: "",
                initial: [],
                trigger: null,
                assertions: [],
              });
              setIsModalVisible(false);
            }}
          >
            Finish
          </Button>
        </>
      ),
    },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Initial",
      dataIndex: "initial",
      key: "initial",
      render: (initial: any[]) =>
        initial.map((item) => (
          <Tag
            key={item.conditionName}
            color="blue"
            onClick={() => handleEdit("initial", item)}
          >
            {item.conditionName}
          </Tag>
        )),
    },
    {
      title: "Trigger",
      dataIndex: "trigger",
      key: "trigger",
      render: (trigger: {
        triggerType:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) =>
        trigger ? (
          <Tag color="geekblue" onClick={() => handleEdit("trigger", trigger)}>
            {trigger.triggerType}
          </Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Assertions",
      dataIndex: "assertions",
      key: "assertions",
      render: (assertions: any[]) =>
        assertions.map((item) => (
          <Tag
            key={item.assertCondition}
            color="green"
            onClick={() => handleEdit("assertions", item)}
          >
            {item.assertCondition}
          </Tag>
        )),
    },
    {
      title: "Execution Result",
      dataIndex: "result",
      key: "result",
      render: (result: string) => (
        <Tag color={result === "success" ? "green" : "red"}>
          {result || "Not Run"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { name: any }) => (
        <Space>
          <Button
            onClick={() => {
              const success = Math.random() > 0.5; // Random success/failure
              const updatedTestCases = testCases.map((item) =>
                item.name === record.name
                  ? { ...item, result: success ? "success" : "failure" }
                  : item
              );
              setTestCases(updatedTestCases);
              message.info(
                `Test Case "${record.name}" ${success ? "passed" : "failed"}.`
              );
            }}
          >
            Run
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (
    type: "initial" | "trigger" | "assertions",
    item: any
  ) => {
    setEditType(type);
    setSelectedTestCase(item);
    setEditModalVisible(true);
  };

  return (
    <Card title="Test Case Management">
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Test Case
      </Button>
      <Table dataSource={testCases} columns={columns} rowKey="name" />
      <Modal
        title="Create New Test Case"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width="1000px"
        footer={null}
        destroyOnClose
      >
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item, index) => (
            <Step key={index} title={item.title} />
          ))}
        </Steps>
        {steps[currentStep].content}
      </Modal>
      <Modal
        title={`Edit ${editType?.toUpperCase()}`}
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <p>Edit functionality is under construction...</p>
      </Modal>
    </Card>
  );
};

export default TestCaseGUI;

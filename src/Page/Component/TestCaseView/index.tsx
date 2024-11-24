import React, { useState } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined, PlayCircleOutlined } from "@ant-design/icons";

interface TestCase {
  key: string;
  no: number;
  name: string;
  description: string;
}

const TestCaseView: React.FC = () => {
  const [dataSource] = useState<TestCase[]>([
    {
      key: "1",
      no: 1,
      name: "Login Test",
      description: "Test login functionality",
    },
    {
      key: "2",
      no: 2,
      name: "Signup Test",
      description: "Test signup functionality",
    },
    {
      key: "3",
      no: 3,
      name: "Payment Test",
      description: "Test payment workflow",
    },
  ]);

  const handleEdit = (record: TestCase) => {
    console.log("Edit:", record);
    message.info(`Editing Test Case: ${record.name}`);
  };

  const handleRun = (record: TestCase) => {
    console.log("Run:", record);
    message.success(`Running Test Case: ${record.name}`);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 100,
    },
    {
      title: "Test Case Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TestCase) => (
        <Space>
          {/* Edit 按鈕：白底，hover 時變藍 */}
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          {/* Run 按鈕：默認樣式 */}
          <Button
            type="default"
            icon={<PlayCircleOutlined />}
            onClick={() => handleRun(record)}
            style={{ color: "#1890ff", borderColor: "#1890ff" }}
          >
            Run
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default TestCaseView;

import React, { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, Form, Input, Space } from "antd";

type Task = {
  id: number;
  name: string;
};
type Trigger = {
  id: number;
  name: string;
};

type TableItem = {
  key: number;
  caseName: string;
  initial: Task[];
  trigger: Trigger[];
  assertion: [];
};

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableItem[]>([
    {
      key: 1,
      caseName: "ADC Initial",
      initial: [],
      trigger: [],
      assertion: [],
    },
    {
      key: 2,
      caseName: "Start Print Check Flow",
      initial: [],
      trigger: [],
      assertion: [],
    },
  ]);
  const [editingCell, setEditingCell] = useState<{
    key: number;
    field: string;
  } | null>(null);
  const [currentKey, setCurrentKey] = useState<number | null>(null); // 当前处理任务的行
  const [formVisible, setFormVisible] = useState(false); // 控制表单显示

  const handleSaveCell = (key: number, field: string, value: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
    setEditingCell(null); // 退出编辑模式
  };

  const handleAddTask = (key: number, task: Task) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, trigger: [...item.trigger, task] } : item
      )
    );
    setFormVisible(false); // 提交后隐藏表单
  };

  const handleAddRow = () => {
    const newRow: TableItem = {
      key: Date.now(),
      caseName: `新增项 ${dataSource.length + 1}`,
      initial: [],
      trigger: [],
      assertion: [],
    };
    setDataSource((prev) => [...prev, newRow]);
  };
  const renderRowSpan = (x: any, record: TableItem, index: number) => {
    const rowSpan = (() => {
      return record.assertion.length;
    })();
    console.log(x);
    return {
      children: x,
      props: { rowSpan },
    };
  };

  const columns: any = [
    {
      title: "Test Case",
      children: [
        {
          title: "Case Name",
          dataIndex: "caseName",
          key: "caseName",
          render: (text: string, record: TableItem) => {
            const isEditing =
              editingCell?.key === record.key &&
              editingCell?.field === "caseName";
            return isEditing ? (
              {
                childen: (
                  <Input
                    defaultValue={text}
                    onBlur={(e) =>
                      handleSaveCell(record.key, "caseName", e.target.value)
                    }
                    onPressEnter={(e) =>
                      handleSaveCell(
                        record.key,
                        "caseName",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    autoFocus
                  />
                ),
                props: { rowSpan: record.assertion.length },
              }
            ) : (
              <div
                onDoubleClick={() =>
                  setEditingCell({ key: record.key, field: "caseName" })
                }
              >
                {text}
              </div>
            );
          },
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          render: (text: string, record: TableItem) => {
            const isEditing =
              editingCell?.key === record.key &&
              editingCell?.field === "description";
            return isEditing ? (
              <Input
                defaultValue={text}
                onBlur={(e) =>
                  handleSaveCell(record.key, "description", e.target.value)
                }
                onPressEnter={(e) =>
                  handleSaveCell(
                    record.key,
                    "description",
                    (e.target as HTMLInputElement).value
                  )
                }
                autoFocus
              />
            ) : (
              <div
                onDoubleClick={() =>
                  setEditingCell({ key: record.key, field: "description" })
                }
              >
                {text}
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Initial",
      key: "initial",
      render: (x: any, record: TableItem) => (
        <Space>
          {record.trigger.map((task) => (
            <span
              key={task.id}
              style={{
                background: "#e6f7ff",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {task.name}
            </span>
          ))}
          <Button
            type="link"
            onClick={() => {
              setCurrentKey(record.key); // 设置当前行的 key
              setFormVisible(true); // 显示表单
            }}
          >
            ＋
          </Button>
        </Space>
      ),
    },
    {
      title: "Trigger",
      key: "trigger",
      render: (x: any, record: TableItem) => (
        <Space>
          {record.trigger.map((task) => (
            <span
              key={task.id}
              style={{
                background: "#e6f7ff",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {task.name}
            </span>
          ))}
          <Button
            type="link"
            onClick={() => {
              setCurrentKey(record.key); // 设置当前行的 key
              setFormVisible(true); // 显示表单
            }}
          >
            ＋
          </Button>
        </Space>
      ),
    },
    {
      title: "Assertion",
      key: "assertion",
      render: (x: any, record: TableItem) => (
        <Space>
          {record.trigger.map((task) => (
            <span
              key={task.id}
              style={{
                background: "#e6f7ff",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {task.name}
            </span>
          ))}
          <Button
            type="link"
            onClick={() => {
              setCurrentKey(record.key); // 设置当前行的 key
              setFormVisible(true); // 显示表单
            }}
          >
            ＋
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableItem>
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
        search={false}
        headerTitle="任务管理表格"
        toolBarRender={() => [
          <Button type="primary" onClick={handleAddRow} key="add">
            Add
          </Button>,
        ]}
      />
      {formVisible && (
        <div
          style={{
            marginTop: 20,
            borderTop: "1px solid #f0f0f0",
            paddingTop: 20,
          }}
        >
          <h3>新增任务</h3>
          <Form
            layout="inline"
            onFinish={(values: { taskName: string }) => {
              const newTask: Task = { id: Date.now(), name: values.taskName };
              if (currentKey !== null) {
                handleAddTask(currentKey, newTask);
              }
            }}
          >
            <Form.Item
              name="taskName"
              rules={[{ required: true, message: "请输入任务名称" }]}
            >
              <Input placeholder="任务名称" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                添加
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  setFormVisible(false); // 隐藏表单
                  setCurrentKey(null);
                }}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default App;

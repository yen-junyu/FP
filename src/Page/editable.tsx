import React, { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Button, Space } from "antd";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

type Task = {
  id: number;
  name: string;
};

type TableItem = {
  key: number;
  name: string;
  tasks: Task[];
};

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableItem[]>([
    {
      key: 1,
      name: "张三",
      tasks: [
        { id: 1, name: "任务1" },
        { id: 2, name: "任务2" },
      ],
    },
    { key: 2, name: "李四", tasks: [{ id: 3, name: "任务3" }] },
  ]);

  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

  const [nodes, setNodes, onNodesChange] = useNodesState<any[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const generateFlowData = (tasks: Task[]) => {
    const newNodes: any = tasks.map((task, index) => ({
      id: `task-${task.id}`,
      data: { label: task.name },
      position: { x: 100 + index * 150, y: 50 },
    }));

    const newEdges = tasks.slice(1).map((task, index) => ({
      id: `edge-${tasks[index].id}-${task.id}`,
      source: `task-${tasks[index].id}`,
      target: `task-${task.id}`,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleRowClick = (record: TableItem) => {
    setSelectedTasks(record.tasks);
    generateFlowData(record.tasks);
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "任务数量",
      key: "taskCount",
      render: (x: any, record: TableItem) => record.tasks.length,
    },
  ];

  const handleAddRow = () => {
    const newRow: TableItem = {
      key: Date.now(),
      name: `新增项 ${dataSource.length + 1}`,
      tasks: [],
    };
    setDataSource((prev) => [...prev, newRow]);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: "300px",
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      <ProTable<TableItem>
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={false}
        search={false}
        headerTitle="任务管理表格"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAddRow} key="add">
            Add
          </Button>,
        ]}
      />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Table, Switch } from 'antd';

interface DataSourceItem {
  key: string;
  name: string;
  age: number;
  sex: string;
}

const dataSource: DataSourceItem[] = [
  {
    key: '1',
    name: 'John Doe',
    age: 28,
    sex: 'Male',
  },
  {
    key: '2',
    name: 'Jane Smith',
    age: 8,
    sex: 'Female',
  },
];

const App: React.FC = () => {
  const [showCheckbox, setShowCheckbox] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setShowCheckbox(checked);
  };

  const handleRowSelect = (selectedRowKeys: React.Key[], selectedRows: DataSourceItem[]) => {
    console.log('Selected Row Keys:', selectedRowKeys);
    console.log('Selected Rows:', selectedRows);
  };

  const getCheckboxProps = (record: DataSourceItem) => {
    return {
      disabled: record.age <= 10,
    };
  };

  const rowSelection = showCheckbox
    ? {
        onChange: handleRowSelect,
        getCheckboxProps,
      }
    : undefined;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Switch checked={showCheckbox} onChange={handleSwitchChange} />
        <span style={{ marginLeft: '8px' }}>顯示 Checkbox</span>
      </div>
      <Table<DataSourceItem>
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default App;

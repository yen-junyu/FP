import React, { useState } from "react";
import { Table, Switch } from "antd";
import type { TableColumnsType } from "antd";
interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
interface Dispatch {
  key: string;
  parentStatus: string;
  product: string;
  releaseDate?: string;
}
interface DataSourceItem {
  parentStatus?: string;
  key: string;
  name: string;
  memberStatus: string;
  joinDate: string;
  product: string;
  releaseDate?: string;
  wish?: string;
  action?: string;
  hidden?: string[];
  children?: Dispatch[];
}

const dataSource: DataSourceItem[] = [
  {
    key: "1",
    name: "Hello",
    memberStatus: "TalentPool",
    joinDate: "2022/12/03",
    product: "SOP",
    wish: "BBQ",
    action: "a",
  },
  {
    key: "2",
    name: "Hello2",
    memberStatus: "GG",
    joinDate: "2022/12/03",
    product: "SOP",
    wish: "BBQ",
    action: "a",
  },
];

type Props = {
  mode: string;
};

enum Mode {
  Edit = "Edit",
  Dispatch = "Dispatch",
  Release = "Release",
  View = "View",
}

type Visibility = "visible" | "hidden" | "collapse";

const talentTable: React.FC<Props> = ({ mode }) => {
  const [showCheckbox, setShowCheckbox] = useState(true);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Member Status",
      dataIndex: "memberStatus",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
    },
    Table.EXPAND_COLUMN,
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
    },
    {
      title: "Wish",
      dataIndex: "wish",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const handleSwitchChange = (checked: boolean) => {
    setShowCheckbox(checked);
  };

  const handleRowSelect = (
    selectedRowKeys: React.Key[],
    selectedRows: DataSourceItem[]
  ) => {
    console.log("Selected Row Keys:", selectedRowKeys);
    console.log("Selected Rows:", selectedRows);
  };

  const getCheckboxProps = (record: DataSourceItem) => {
    let visibility: Visibility;
    if (mode == "Dispatch" && record.name == undefined) {
      visibility = "hidden";
    } else {
      visibility = "visible";
    }
    let disabled: boolean;
    if (
      record.memberStatus === "TalentPool" ||
      record.parentStatus === "TalentPool"
    )
      disabled = false;
    else {
      disabled = true;
    }
    return {
      style: { visibility },
      disabled: disabled,
    };
  };
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Member Status",
        dataIndex: "memberStatus",
      },
      {
        title: "Join Date",
        dataIndex: "joinDate",
      },
      Table.EXPAND_COLUMN,
      {
        title: "Product",
        dataIndex: "product",
      },
      {
        title: "Release Date",
        dataIndex: "releaseDate",
      },
      {
        title: "Wish",
        dataIndex: "wish",
      },
      {
        title: "Action",
        dataIndex: "action",
      },
    ];

    const dataSource: DataSourceItem[] = [
      {
        key: "1",
        name: "Hello",
        memberStatus: "TalentPool",
        joinDate: "2022/12/03",
        product: "SOP",
        wish: "BBQ",
        action: "a",
      },
      {
        key: "2",
        name: "Hello2",
        memberStatus: "GG",
        joinDate: "2022/12/03",
        product: "SOP",
        wish: "BBQ",
        action: "a",
      },
    ];
    return (
      <Table
        style={{ margin: 0 }}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
      />
    );
  };
  const rowSelection =
    mode == "Dispatch" || mode == "Release"
      ? {
          onChange: handleRowSelect,
          getCheckboxProps: getCheckboxProps,
        }
      : undefined;

  return (
    <div>
      {/*<div style={{ marginBottom: "16px" }}>
        <Switch checked={showCheckbox} onChange={handleSwitchChange} />
        <span style={{ marginLeft: "8px" }}>顯示 Checkbox</span>
  </div>*/}
      <Table<DataSourceItem>
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
      />
    </div>
  );
};

export default talentTable;

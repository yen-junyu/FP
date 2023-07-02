import React, { useState } from "react";
import { Table, Switch } from "antd";

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
    children: [
      {
        key: "11",
        parentStatus: "TalentPool",
        product: "SOP",
        releaseDate: "2022/12/03",
      },
    ],
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
      />
    </div>
  );
};

export default talentTable;

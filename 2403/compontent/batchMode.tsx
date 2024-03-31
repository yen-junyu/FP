import React, { useMemo, useState } from "react";
import styled from "styled-components";
import BatchTable from "./BatchTable";
import { Table } from "antd";

interface Props {}

const StyledTable = styled(Table)`
  /* 新的样式规则 */
  .ant-table-tbody .ant-table-row.ant-table-row-selected > .ant-table-cell {
    background-color: transparent; /* 设置新的背景颜色 */
  }
`;
const BatchMode: React.FC<Props> = () => {
  // =============== Hooks =========================

  // =============== Function ======================

  // =============== Render ========================
  const dataSource = [
    {
      key: "1",
      batch: "2024-03-27 12:00:00",
      maskCount: 80,
      riskFreeMaskCount: 40,
      waferCount: 240,
    },
    {
      key: "2",
      batch: "2024-03-27 12:00:01",
      maskCount: 80,
      riskFreeMaskCount: 40,
      waferCount: 240,
    },
  ];
  const columns = [
    {
      title: "Key",
      dataIndex: "key",
    },
    {
      title: "AI AMQC Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Mask  Count",
      dataIndex: "maskCount",
      key: "maskCount",
    },
    {
      title: "Risk Free Mask Count",
      dataIndex: "riskFreeMaskCount",
      key: "riskFreeMaskCount",
    },
    {
      title: "To-Be Released Wafer Count",
      dataIndex: "waferCount",
      key: "waferCount",
    },
  ];

  const handleRowClick = (record: any) => {
    console.log(record);
    console.log("1234");
    setSelectedRowKeys(record.key);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <StyledComponent>
      <StyledTable
        dataSource={dataSource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleRowClick(record);
            },
          };
        }}
        size="middle"
        pagination={false}
        // onRow={(record, rowIndex) => ({
        //   onClick: () => {
        //     console.log(record);
        //   },
        // })}
        // rowClassName={rowClassName}
        // rowClassName={getRowClassName} // 设置rowClassName属性为自定义函数
        //rowSelection={rowSelection} // 设置rowSelection属性
      ></StyledTable>
      <div className="mt-5" style={{ marginTop: "30px" }}>
        <BatchTable data={["a", "b"]}></BatchTable>
      </div>
    </StyledComponent>
  );
};

export default BatchMode;

// =============== Styled-Components ==============
const StyledComponent = styled.div``;

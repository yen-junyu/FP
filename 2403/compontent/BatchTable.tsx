import { Table, TableColumnsType } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";

interface Props {
  data: any[];
}

const BatchTable: React.FC<Props> = ({ data }: Props) => {
  const dataSource = [
    {
      key: 1,
      batch: "Batch 1",
      priority: 1,
      icrr: "ICRR 1",
      releaseLot: "Lot 1",
      mask: "Mask 1",
      accuWaferCount: 100,
      maxWaferCountSpec: 200,
      hint: "Hint 1",
    },
    {
      key: 2,
      batch: "Batch 2",
      priority: 2,
      icrr: "ICRR 2",
      releaseLot: "Lot 2",
      mask: "Mask 2",
      accuWaferCount: 150,
      maxWaferCountSpec: 250,
      hint: "Hint 2",
    },
    // 可以继续添加更多数据条目
  ];
  const columns = useMemo(
    () => [
      {
        title: "AI AMQC Batch",
        dataIndex: "batch",
        key: "batch",
      },
      {
        title: "AI Priority",
        dataIndex: "priority",
        key: "priority",
      },
      {
        title: "ICRR",
        dataIndex: "icrr",
        key: "icrr",
      },
      {
        title: "Release Lot",
        dataIndex: "releaseLot",
        key: "releaseLot",
      },
      {
        title: "Mask",
        dataIndex: "mask",
        key: "ask",
      },
      {
        title: "Accu Wafer Count",
        dataIndex: "accuWaferCount",
        key: "accuWaferCount",
      },
      {
        title: "Max Wafer Count Spec",
        dataIndex: "maxWaferCountSpec",
        key: "maxWaferCountSpec",
      },
      {
        title: "Hint",
        dataIndex: "hint",
        key: "hint",
      },
    ],
    []
  );
  const innerColumns = useMemo(
    () => [
      { title: "#", dataIndex: "key", key: "date" },
      { title: "Lot Id", dataIndex: "lotId", key: "lotId" },
      { title: "Wafer Cnt", dataIndex: "waferCnt", key: "waferCnt" },
      { title: "EUV Proc Time", dataIndex: "euvProcTime", key: "euvProcTime" },
      { title: "Hold Oper No", dataIndex: "holdOperNo", key: "holdOperNo" },
      { title: "Hold Memo", dataIndex: "holdMemo", key: "holdMemo" },
      { title: "Hold Time", dataIndex: "holdTime", key: "holdTime" },
    ],
    []
  );

  const subData = [
    [
      {
        key: 1,
        lotId: "Lot123",
        waferCnt: 100,
        euvProcTime: "2024-03-25 09:30:00",
        holdOperNo: "Oper456",
        holdMemo: "Hold due to defect",
        holdTime: "2024-03-25 10:00:00",
      },
    ],
    [
      {
        key: 2,
        lotId: "Lot456",
        waferCnt: 150,
        euvProcTime: "2024-03-25 10:00:00",
        holdOperNo: "Oper789",
        holdMemo: "Hold for quality check",
        holdTime: "2024-03-25 11:00:00",
      },
    ],
  ];
  const expandedRowRender = (record: any) => {
    return (
      <Table
        columns={innerColumns}
        dataSource={subData[record.key - 1]}
        pagination={false}
      />
    );
  };

  return (
    <StyledComponent>
      <Table
        dataSource={dataSource}
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        pagination={false}
      ></Table>
    </StyledComponent>
  );
};

export default BatchTable;

// =============== Styled-Components ==============
const StyledComponent = styled.div``;

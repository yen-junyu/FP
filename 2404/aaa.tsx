import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styled from "styled-components";
import {
  Button,
  Col,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
import BatchTable from "./compontnet/BatchTable";
import BatchMode from "./compontnet/BatchMode";
import { EditOutlined } from "@ant-design/icons";
import AAAA from "./compontnet/modal/AAA";

const StyledInput = styled(Input)`
  width: 200px;
  border-color: red;
`;
const StyledAgGridContainer = styled.div`
  height: 300px;
  width: 1000px;
  .ag-header-cell {
    background-color: #3498db; /* 设置背景色为蓝色 */
  }
`;

const StyledTable = styled(Table)`
  /* 新的样式规则 */
  .ant-table-tbody .ant-table-row.ant-table-row-selected > .ant-table-cell {
    background-color: transparent; /* 设置新的背景颜色 */
  }
`;

class DeltaIndicator {
  eGui: HTMLSpanElement | undefined;
  init(params: any) {
    const element = document.createElement("span");
    element.style.color = "black";
    element.style.fontWeight = "bold";
    element.appendChild(document.createTextNode(params.value));
    this.eGui = element;
  }
  getGui() {
    return this.eGui;
  }
}

const test = (params: any) => {
  // console.log(params.api);
  // console.log(params.columnApi.getAllGridColumns());
  // console.log(params.node.rowIndex);

  const colDef = params.colDef;
  const column = params.column;
  // console.log(colDef);

  // 获取列的索引
  // const colIndex = params.columnApi.getColumnIndex(column);

  return <></>;
};
function PriorityCellRenderer(props: any) {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    alert(`${cellValue} medals won!`);
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      <button onClick={() => buttonClicked()}>Push For Total</button>
    </span>
  );
}
const MyGrid = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  //const dataContext = React.useContext(DataContext);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      width: 100,
      headerName: "",
      cellRenderer: DeltaIndicator,
      cellStyle: function (params: any) {
        return { backgroundColor: "#f8f8f8" };
      },
    },
    { field: "1A", cellRenderer: test },
    { field: "1B" },
    { field: "1C" },
    { field: "2C" },
    { field: "2D" },
    { field: "3C" },
    { field: "3D" },
    { field: "4C" },
    { field: "4D" },
  ]);

  const a = {
    backgroundColor: "black",
  };

  const [rowData, setRowDate] = useState<any>([]);

  const onGridReady = (params: any) => {
    console.log("hello");
    setRowDate([
      { name: "1A", "1A": 0, "1B": 1 },
      { name: "1B", "1A": 0, "1B": 2 },
    ]);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const onSelectChange = (selectedKeys: any) => {
    console.log(selectedKeys);
    setSelectedRowKeys(selectedKeys);
  };

  // 自定义行样式的函数
  const getRowClassName = (record: any, index: any) => {
    // 判断行是否被选中，应用相应的类名
    console.log("hello");
    console.log(
      selectedRowKeys.includes(index as never) ? "selected-row-color" : ""
    );
    return "selected-row-color";
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
  const defaultPanes = [
    {
      label: `Tab 1`,
      children: <BatchMode></BatchMode>,
      key: "1",
    },
    {
      label: `Tab 2`,
      children: <div>2</div>,
      key: "2",
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
  const rowClassName = (record: any) => {
    console.log(record.age);
    console.log(selectedRowKeys.indexOf(record.key) !== -1);
    //console.log(selectedRowKeys.find(record.key));
    //return selectedRowKeys.find(record.key) ? "selected-row" : "";
    console.log(
      selectedRowKeys.indexOf(record.key) !== -1 ? "selected-row" : ""
    );
    return selectedRowKeys.indexOf(record.key) !== -1 ? "selected-row" : "";
  };
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: any) => {
    setActiveKey(key);
  };
  const add = () => {
    //const newActiveKey = `newTab${newTabIndex.current++}`;
    //setItems([...items]);
    //setActiveKey(newActiveKey);
  };

  const remove = (targetKey: any) => {
    // const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    // const newPanes = items.filter((pane) => pane.key !== targetKey);
    // if (newPanes.length && targetKey === activeKey) {
    //   const { key } =
    //     newPanes[
    //       targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
    //     ];
    //   setActiveKey(key);
    // }
    // setItems(newPanes);
  };

  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  // const renderBoxes = () => {
  //   return [
  //     { title: "Max AI AMQC", value: "20" },
  //     { title: "123", value: "simaggfds" },
  //     { title: "123", value: "simaggfds" },
  //     { title: "123", value: "simaggfds" },
  //     { title: "123", value: "simaggfds" },
  //     { title: "123", value: "simaggfds" },
  //     { title: "123", value: "simaggfds" },
  //     { title: "123", value: "simaggfdsaasasasasasasasasa" },
  //     { title: "123", value: "simaggfdsaasasasasasasasasa" },
  //     { title: "123", value: "simaggfdsaasasasasasasasasa" },
  //     { title: "123", value: "simaggfdsaasasasasasasasasa" },
  //     { title: "123", value: "simaggfdsaasasasasasasasasa" },
  //   ].map((obj, index) => (
  //     <div className="box" key={index}>
  //       <EditOutlined
  //         className="edit-icon"
  //         onClick={() => console.log("hello")}
  //       />
  //       <div className="title">{obj.title}</div>
  //       <div className="value">{obj.value}</div>
  //     </div>
  //   ));
  // };
  const CreatList = (title: string, type: string) => {
    return (
      <div
        className="box"
        style={{
          margin: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <EditOutlined
          className="edit-icon"
          onClick={() => console.log("hello")}
        />
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
            fontSize: "18px",
          }}
        >
          {title}
        </div>
        <div>
          {type == "black"
            ? blackList.map((item, index) => (
                <Tag
                  color="blue"
                  key={index}
                  style={{
                    marginBottom: "10px",
                    marginRight: "10px",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </Tag>
              ))
            : whiteList.map((item, index) => (
                <Tag
                  color="blue"
                  key={index}
                  style={{
                    marginBottom: "10px",
                    marginRight: "10px",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </Tag>
              ))}
        </div>
      </div>
    );
  };
  type LooseObject = {
    [key: string]: any;
  };
  const [typeList, setTypeList] = useState<string[]>([]);
  const [queryType, setQueryTypeList] = useState<string>("");
  const [blackList, setBlackList] = useState<string[]>([]);
  const [whiteList, setWhiteList] = useState<string[]>([]);

  const mapping: LooseObject = {
    "Type A": "A",
    "Type B": "B",
    "Type C": "C",
  };

  useEffect(() => {
    setTypeList(["Type A", "Type B", "Type C"]);
  }, []);

  const handleClick = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setQueryTypeList(e.target.value);

    if (e.target.value == "Type A") {
      setBlackList(["tool1", "tool2"]);
    } else {
      setBlackList([
        "tool1",
        "tool2",
        "tool3",
        "tool4",
        "tool5",
        "tool6",
        "tool7",
        "tool8",
        "tool9",
        "tool10",
        "tool10",
        "tool6",
        "tool7",
        "tool8",
        "tool9",
        "tool10",
      ]);
    }
    // query type

    setWhiteList(["tool6", "tool7", "tool8", "tool9", "tool10"]);
    //console.log(type);
  };

  return (
    <>
      <Radio.Group
        onChange={handleClick}
        style={{
          marginBottom: 8,
        }}
      >
        {typeList.map((type) => {
          return (
            <Radio.Button key={type} type="primary" value={type}>
              {mapping[type]}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      {queryType != "" ? (
        <>
          <Row>
            <Col span={12}>
              {CreatList(mapping[queryType] + " Black List", "black")}
            </Col>
            <Col span={12}>
              {CreatList(mapping[queryType] + " White List", "white")}
            </Col>
          </Row>
          <AAAA list={blackList}></AAAA>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyGrid;

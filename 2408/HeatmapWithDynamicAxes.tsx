import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Select, Row, Col } from "antd";
import { SelectValue } from "antd/lib/select";

const { Option } = Select;

interface DataPoint {
  x: string;
  y: string;
  value: number;
}

const HeatmapWithDynamicAxes: React.FC = () => {
  // 示例数据
  const data: DataPoint[] = [
    { x: "Jan", y: "A", value: 10 },
    { x: "Jan", y: "B", value: 15 },
    { x: "Feb", y: "A", value: 5 },
    { x: "Feb", y: "B", value: 25 },
    { x: "Mar", y: "A", value: 12 },
    { x: "Mar", y: "B", value: 30 },
    // 其他数据...
  ];

  // x 和 y 轴的选项
  const xAxisOptions = ["Jan", "Feb", "Mar"];
  const yAxisOptions = ["A", "B", "C"];

  // 选择的 x 和 y 轴
  const [selectedX, setSelectedX] = useState<string>(xAxisOptions[0]);
  const [selectedY, setSelectedY] = useState<string>(yAxisOptions[0]);

  // 处理 x 轴和 y 轴的改变
  const handleXAxisChange = (value: SelectValue) =>
    setSelectedX(value as string);
  const handleYAxisChange = (value: SelectValue) =>
    setSelectedY(value as string);

  // 过滤数据以适应当前选择的 x 和 y 轴
  const filteredData = data.filter(
    (item) => item.x === selectedX || item.y === selectedY
  );

  // 将过滤的数据转换为 ECharts 所需的格式
  const seriesData = filteredData.map((item) => [item.x, item.y, item.value]);

  // ECharts 的配置项
  const option = {
    tooltip: {
      position: "top",
    },
    grid: {
      height: "50%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: filteredData.map((item) => item.x),
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: filteredData.map((item) => item.y),
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 30,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
    },
    series: [
      {
        name: "Data",
        type: "heatmap",
        data: seriesData,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Row gutter={16}>
        <Col>
          <Select
            defaultValue={selectedX}
            onChange={handleXAxisChange}
            style={{ width: 120 }}
          >
            {xAxisOptions.map((x) => (
              <Option key={x} value={x}>
                {x}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            defaultValue={selectedY}
            onChange={handleYAxisChange}
            style={{ width: 120 }}
          >
            {yAxisOptions.map((y) => (
              <Option key={y} value={y}>
                {y}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <ReactECharts
        option={option}
        style={{ height: "400px", marginTop: "20px" }}
      />
    </div>
  );
};

export default HeatmapWithDynamicAxes;

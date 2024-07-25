import { Table, TableColumnsType } from "antd";
import React, { useMemo } from "react";
import styled from "styled-components";
import ReactECharts from "echarts-for-react";

interface Props {
  data: any[];
}

const Chart: React.FC<Props> = ({ data }: Props) => {
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50,
  };
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320],
  ];
  const totalData: number[] = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  const series = [
    "Direct",
    "Mail Ad",
    "Affiliate Ad",
    "Video Ad",
    "Search Engine",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      yAxisIndex: 0,

      label: {
        show: true,
        formatter: (params: { value: number }) =>
          Math.round(params.value * 1000) / 10 + "%",
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      ),
    };
  });

  const options = {
    grid: grid,
    legend: {
      selectedMode: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月", "6月"],
        axisLine: { onZero: false },
        axisTick: { alignWithLabel: true },
        position: "bottom", // 默认位置，底部
      },
      // {
      //   type: "category",
      //   data: ["A", "B", "C", "D", "E", "F"],
      //   axisLine: { onZero: false },
      //   axisTick: { alignWithLabel: true },
      //   position: "top", // 第二个 X 轴位置，顶部
      // },
    ],

    yAxis: [
      {
        type: "value",
      },
      // {
      //   type: "value",
      //   name: "Temperature",
      //   min: 0,
      //   max: 25,
      //   interval: 5,
      //   axisLabel: {
      //     formatter: "{value} °C",
      //   },
      // },
    ],
    series: [
      ...series,
      // {
      //   name: "Temperature",
      //   type: "line",
      //   yAxisIndex: 1,
      //   tooltip: {
      //     valueFormatter: function (value: string) {
      //       return value + " °C";
      //     },
      //   },
      //   data: [
      //     2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
      //   ],
      // },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  const onChartClick = (params: {
    seriesType: string;
    seriesName: any;
    name: any;
    value: any;
  }) => {
    if (params.seriesType === "bar") {
      console.log("点击的系列:", params.seriesName);
      console.log("点击的类目:", params.name);
      console.log("点击的值:", params.value);
      alert(
        `你点击了${params.seriesName}中的${params.name}，数值是${params.value}`
      );
    }
  };

  // const handleLegendChange = (params: { selected: { [x: string]: boolean; }; }) => {
  //   // 更新数据的逻辑
  //   if (chartRef.current) {
  //     const updatedSeries = chartData.series.map((item) => {
  //       if (params.selected[item.name] === false) {
  //         // 图例未选中，隐藏数据
  //         return { ...item, data: [] };
  //       } else {
  //         // 图例选中，显示原数据
  //         if (item.name === '销量') {
  //           return { ...item, data: [5, 20, 36, 10, 10, 20] };
  //         } else if (item.name === '利润') {
  //           return { ...item, data: [15, 25, 26, 20, 15, 30] };
  //         }
  //         return item;
  //       }
  //     });
  //     setChartData({ series: updatedSeries });
  //     chartRef.current.getEchartsInstance().setOption({ series: updatedSeries });
  //   }
  // };
  const handleLegendChange = (p: any) => {
    console.log(p);
  };
  return (
    <ReactECharts
      option={options}
      onEvents={{
        click: onChartClick,
        legendselectchanged: handleLegendChange,
      }}
    />
  );
};

export default Chart;

// =============== Styled-Components ==============
const StyledComponent = styled.div``;

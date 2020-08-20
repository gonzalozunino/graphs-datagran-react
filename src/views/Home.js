import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { message, Button, Input, Select, Typography } from "antd";
import { readString } from "react-papaparse";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const Home = () => {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: "Line chart",
    },
    xAxis: {
      categories: [],
    },
    series: [],
  });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [columnNames, setColumnNames] = useState(null);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  const sleep = (time = 2500) => {
    message.loading("Action in progress..");
    return new Promise((r) => setTimeout(r, time));
  };

  const setAxisValues = async () => {
    const columnNames = readString(textAreaValue, {
      delimiter: ",",
      preview: 1,
    });

    // Simulating loading
    await sleep();
    setColumnNames(columnNames);
  };
  const updateSeries = async () => {
    const results = readString(textAreaValue, {
      delimiter: ",",
      header: true,
    });
    const xCategories = results.data.map((result) => result[xAxis]);
    const ySeries = results.data.map((result) => Number(result[yAxis]));

    // Simulating loading
    await sleep();

    if (xCategories.length && ySeries.length) {
      setChartOptions({
        ...chartOptions,
        yAxis: {
          title: {
            text: yAxis,
          },
        },
        xAxis: {
          categories: xCategories,
        },
        series: [{ name: yAxis, data: ySeries, showInLegend: false }],
      });
    } else {
      message.error("There was an error, please try again...");
    }
  };
  const handleTextAreaChange = ({ target: { value } }) => {
    setTextAreaValue(value);
  };
  const handleXAxisChange = (value) => {
    setXAxis(value);
  };
  const handleYAxisChange = (value) => {
    setYAxis(value);
  };

  return (
    <>
      <Title>CSV file content:</Title>
      <TextArea
        value={textAreaValue}
        onChange={handleTextAreaChange}
        placeholder="Insert series data..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <Button
        style={{ margin: "32px 0" }}
        type="primary"
        disabled={!textAreaValue}
        onClick={setAxisValues}
      >
        Process
      </Button>

      {columnNames && !columnNames.error && columnNames.data.length > 0 && (
        <div style={{ margin: "30px 0" }}>
          <Title>Select X AXIS</Title>
          <Select
            style={{ width: "100%" }}
            placeholder="X AXIS"
            onChange={handleXAxisChange}
          >
            {columnNames.data[0].map((result, i) => (
              <Option key={i} value={result}>
                {result}
              </Option>
            ))}
          </Select>
          <Title style={{ marginTop: 30 }}>Select Y AXIS</Title>
          <Select
            style={{ width: "100%" }}
            placeholder="Y AXIS"
            onChange={handleYAxisChange}
          >
            {columnNames.data[0].map((result, i) => (
              <Option key={i} value={result}>
                {result}
              </Option>
            ))}
          </Select>
        </div>
      )}

      {xAxis && yAxis && (
        <Button
          style={{ margin: "32px 0" }}
          type="primary"
          onClick={updateSeries}
        >
          Apply
        </Button>
      )}

      {chartOptions.xAxis.categories.length > 0 &&
        chartOptions.series.length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
    </>
  );
};

export default Home;

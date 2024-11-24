import React, { useState } from "react";
import { Form, Select, Button, Card } from "antd";

const { Option } = Select;

const QueryForm: React.FC = () => {
  // 定義狀態
  const [releasePackages] = useState(["maskControl", "adc"]);
  const [releaseVersions] = useState(["2024.440.0", "2024.448.0"]);

  const handleQuery = (values: {
    releasePackage: string;
    releaseVersion: string;
  }) => {
    console.log("Selected Values:", values);
  };

  return (
    <Card>
      <Form
        layout="inline"
        onFinish={handleQuery}
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* Release Package 下拉選單 */}
        <Form.Item
          name="releasePackage"
          label="Release Package"
          rules={[
            { required: true, message: "Please select a release package!" },
          ]}
          style={{ marginRight: 16 }}
        >
          <Select placeholder="Select a package" style={{ width: 200 }}>
            {releasePackages.map((pkg) => (
              <Option key={pkg} value={pkg}>
                {pkg}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Release Version 下拉選單 */}
        <Form.Item
          name="releaseVersion"
          label="Release Version"
          rules={[
            { required: true, message: "Please select a release version!" },
          ]}
          style={{ marginRight: "auto" }}
        >
          <Select placeholder="Select a version" style={{ width: 200 }}>
            {releaseVersions.map((version) => (
              <Option key={version} value={version}>
                {version}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Query 按鈕 */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Query
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QueryForm;

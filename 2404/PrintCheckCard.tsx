import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  TabPaneProps,
  Tabs,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface Tab extends Omit<TabPaneProps, "tab"> {
  key: string;
  label: React.ReactNode;
}
interface Props {}

const BasicInformationTab = () => {
  const [controlWafer, setControlWafer] = useState<string>("UX125012.01");
  const [reasonOption, setReasonOption] = useState<string[]>([]);
  const [euvScannerOption, setEuvScannerOption] = useState<string[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setReasonOption(["Reason1", "Reason2"]);
    setEuvScannerOption(["NPE6*", "PPPE6*"]);
    form.setFieldValue("controlWafer", "UX125012.01");
  }, []);

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{
        flex: "120px",
      }}
      labelAlign="right"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Reason"
        name="reason"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: "200px" }}>
          {reasonOption.map((reason) => {
            return (
              <Select.Option value={reason} key={reason}>
                {reason}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Reticle ID"
        name="reticleId"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder="Enter something"
          style={{ width: "200px", marginRight: "10px" }}
        />
        <Button type="primary">Find CW</Button>
      </Form.Item>
      <Form.Item
        label="Control Wafer"
        name="controlWafer"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: "200px", marginRight: "10px" }} readOnly />
      </Form.Item>
      <Form.Item
        label="Reticle Grade"
        name="reticleGrade"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <div style={{ display: "flex" }}>
          <Radio.Group style={{ width: "200px", marginRight: "10px" }}>
            <Radio value="A"> A </Radio>
            <Radio value="B"> B </Radio>
          </Radio.Group>
          <div>
            <InfoCircleOutlined
              style={{ marginRight: "8px", color: "#1890ff" }}
            />
            <span>Info | Current Mask Grade is A</span>
          </div>
        </div>
      </Form.Item>
      <Form.Item
        label="EUV Scanner"
        name="euvScanner"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: "200px" }}>
          {euvScannerOption.map((reason) => {
            return (
              <Select.Option value={reason} key={reason}>
                {reason}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Energy"
        name="energy"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item
        label="Focus"
        name="focus"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item
        label="RC Note"
        name="rcNote"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea
          style={{
            width: 200,
            height: 60,
            resize: "none",
          }}
        />
      </Form.Item>
      <Divider />
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="small">
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Space>
      </div>
    </Form>
  );
};

const Coater = () => {
  const [form] = Form.useForm();
  const [workAreaOption, setWorkAreaOption] = useState<string[]>([]);
  useEffect(() => {
    form.setFieldValue("coaterRecipe", "$COATER_RECIPE");
  }, []);

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{
        flex: "120px",
      }}
      labelAlign="right"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Work Area"
        name="workArea"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: "200px" }}>
          {workAreaOption.map((workArea) => {
            return (
              <Select.Option value={workArea} key={workArea}>
                {workArea}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Recipe Group"
        name="reticleId"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder="Enter something"
          style={{ width: "200px", marginRight: "10px" }}
        />
      </Form.Item>
      <Form.Item
        label="Coater Recipe"
        name="coaterRecipe"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: "200px", marginRight: "10px" }} readOnly />
      </Form.Item>

      <Form.Item label="EQP 1" name="eqp1">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 2" name="eqp2">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 3" name="eqp3">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 4" name="eqp4">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 5" name="eqp5">
        <Input style={{ width: "200px" }} />
      </Form.Item>

      <Divider />
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="small">
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Space>
      </div>
    </Form>
  );
};

const Scanner = () => {
  const [form] = Form.useForm();
  const [workAreaOption, setWorkAreaOption] = useState<string[]>([]);
  useEffect(() => {
    form.setFieldValue("coaterRecipe", "$COATER_RECIPE");
  }, []);

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{
        flex: "120px",
      }}
      labelAlign="right"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Work Area"
        name="workArea"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select style={{ width: "200px" }}>
          {workAreaOption.map((workArea) => {
            return (
              <Select.Option value={workArea} key={workArea}>
                {workArea}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Recipe Group"
        name="reticleId"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder="Enter something"
          style={{ width: "200px", marginRight: "10px" }}
        />
      </Form.Item>
      <Form.Item
        label="Coater Recipe"
        name="coaterRecipe"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{ width: "200px", marginRight: "10px" }} readOnly />
      </Form.Item>

      <Form.Item label="EQP 1" name="eqp1">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 2" name="eqp2">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 3" name="eqp3">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 4" name="eqp4">
        <Input style={{ width: "200px" }} />
      </Form.Item>
      <Form.Item label="EQP 5" name="eqp5">
        <Input style={{ width: "200px" }} />
      </Form.Item>

      <Divider />
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="small">
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Space>
      </div>
    </Form>
  );
};
const PrintCheckCard: React.FC<Props> = () => {
  const [tabItems, setTabItems] = useState<Tab[]>([]);

  useEffect(() => {
    setTabItems([
      {
        label: "Basic Information",
        key: "basicInformation",
        children: <BasicInformationTab></BasicInformationTab>,
      },
      {
        label: "Coater",
        key: "coater",
        children: <Coater></Coater>,

        //disabled: true,
      },
      {
        label: "Scanner",
        key: "scanner",
        children: <Scanner></Scanner>,
      },
    ]);
  }, []);
  // =============== Hooks =========================

  // =============== Function ======================

  // =============== Render ========================
  return (
    <StyledComponent>
      <Card>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
    </StyledComponent>
  );
};

export default PrintCheckCard;

// =============== Styled-Components ==============
const StyledComponent = styled.div`
  min-width: 200px; /* 這裡的值可以是您想要的任何數字，表示最小寬度的像素值 */
  width: 600px;
  max-width: 600px;
`;

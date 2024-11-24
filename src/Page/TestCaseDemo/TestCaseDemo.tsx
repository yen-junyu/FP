import React from "react";
import styled from "styled-components";
import QueryForm from "../Component/QueryForm";
import { Card } from "antd";
import TestCaseView from "../Component/TestCaseView";
import TestCaseRoot from "../Component/TestCaseRoot";

interface Props {}

const TestCaseDemo: React.FC<Props> = () => {
  // =============== Hooks =========================

  // =============== Function ======================

  // =============== Render ========================
  return (
    <StyledComponent>
      <Card>
        <QueryForm></QueryForm>
      </Card>
      <Card className="mt-1">
        <TestCaseRoot></TestCaseRoot>
      </Card>

      <p>TestCaseDemo</p>
    </StyledComponent>
  );
};

export default TestCaseDemo;

// =============== Styled-Components ==============
const StyledComponent = styled.div``;

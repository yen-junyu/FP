import React, { useState } from "react";
import CustomDropdownButton from "../dropdown2";
import Table from "../table";

const Page: React.FC = () => {
  const [mode, setMode] = useState("Edit");

  return (
    <>
      <div className="text-black">{mode}</div>
      <CustomDropdownButton mode={mode} setMode={setMode} />
      <Table mode={mode}></Table>
    </>
  );
};

export default Page;

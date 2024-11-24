import React, { useState } from 'react';
import { Button, message } from 'antd';
import TestCaseCreate from '../TestCaseCreate';
import TestCaseView from '../TestCaseView';
import { useAtom } from 'jotai';
import { isCreatingAtom } from '../../../Atom/TestCaseAtom';


const TestCaseRoot: React.FC = () => {
  const [isCreating, setIsCreating] = useAtom(isCreatingAtom); // 控制顯示哪個頁面

  const [testCases, setTestCases] = useState([
    { key: '1', no: 1, name: 'Login Test', description: 'Test login functionality' },
    { key: '2', no: 2, name: 'Signup Test', description: 'Test signup functionality' },
  ]);

  const handleCreateNew = () => {
    setIsCreating(true);
  };

//   const handleConfirmCreate = (testCase: { name: string; description: string }) => {
//     const newTestCase = {
//       key: (testCases.length + 1).toString(),
//       no: testCases.length + 1,
//       ...testCase,
//     };

//     setTestCases([...testCases, newTestCase]);
//     setIsCreating(false);
//     message.success('Test case created successfully!');
//   };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  return (
    <div>
      {!isCreating && (
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleCreateNew}>
            Create New
          </Button>
        </div>
      )}

      {isCreating ? (
        <TestCaseCreate onCancel={handleCancelCreate} />
      ) : (
        <TestCaseView />
      )}
    </div>
  );
};

export default TestCaseRoot;

const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('http://example.com/api/data');

    // 根据响应状态码执行不同的处理函数
    if (response.status === 200) {
      handleSuccess(response.data);
    } else {
      handleOtherError(response.status);
    }
  } catch (error) {
    // 捕获请求失败的情况，并执行错误处理函数
    handleRequestError(error);
  }
}

// 成功处理函数
function handleSuccess(data) {
  console.log('请求成功:', data);
}

// 其他错误处理函数
function handleOtherError(status) {
  if (status === 404) {
    handleNotFound();
  } else {
    console.log(`发生了一个错误，状态码：${status}`);
  }
}

// 404 处理函数
function handleNotFound() {
  console.log('404 Not Found');
}

// 请求失败处理函数
function handleRequestError(error) {
  console.error('请求失败:', error);
}

// 调用 fetchData 函数以触发请求
fetchData();

function fetchData() {
  return new Promise((resolve, reject) => {
    // 使用 Axios 发送 GET 请求
    axios.get('http://example.com/api/data')
      .then(response => {
        // 请求成功时，将数据传递给 resolve 函数
        resolve(response.data);
      })
      .catch(error => {
        // 请求失败时，将错误信息传递给 reject 函数
        reject(error);
      });
  });
}

// 定义一个 async 函数来处理异步操作
async function processRequest() {
  try {
    // 使用 await 等待 fetchData 函数返回数据
    const data = await fetchData();
    // 在获取数据后进行处理
    console.log('获取到的数据:', data);
  } catch (error) {
    // 捕获请求失败的情况，并输出错误信息
    console.error('请求失败:', error);
  }
}

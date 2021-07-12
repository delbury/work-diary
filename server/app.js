const http = require('http');

const server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('content-type', 'application/json');
  const data = {
    code: 200,
    data: [
      { desc: '一个任务', months: [1, 2, 3], year: 2021 },
    ],
  };
  res.write(JSON.stringify(data));
  res.end();
});

server.listen(4000, function() {
  console.log('server started !');
});

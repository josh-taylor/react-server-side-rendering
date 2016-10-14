require('babel-register');

const server = require('./server');
const PORT = 8888;

server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}!`);
});

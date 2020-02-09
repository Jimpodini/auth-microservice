const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/validation')();
require('./startup/middleware')(app)
require('./startup/routes')(app);

const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`listening on port ${port}...`));
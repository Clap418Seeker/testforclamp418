const appGenerator = require('./gameserver');
const app = appGenerator();
const port = 2000;
app.listen(port, () => {console.log('Listen port 2000')});
const app = require('./app');
const connectDatabase = require('./config/database');


connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`)
    console.log('Environment:', process.env.NODE_ENV);
});
export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    password: process.env.DB_PASWORD,
    username: process.env.DB_USERNAME,
  },
});

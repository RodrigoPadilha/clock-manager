export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    type: process.env.DATABASE_TYPE,
  },
});

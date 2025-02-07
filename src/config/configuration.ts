export default () => ({
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost',

  postgres: {
    host: String(process.env.POSTGRES_HOST),
    port: parseInt(String(process.env.POSTGRES_PORT), 10) || 5432,
    username: String(process.env.POSTGRES_USER_NAME),
    password: String(process.env.POSTGRES_PASSWORD),
    name: String(process.env.POSTGRES_DATABASE_NAME),
  },
});

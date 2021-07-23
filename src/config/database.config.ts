export default {
  uri: process.env.MONGOURI,
  dbName: process.env.DB_NAME,
  useFindAndModify: false,
  useCreateIndex: true,
};

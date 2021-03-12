// import path from 'path'

module.exports = {
  client: 'mysql',
  connection: {
    database: 'pshape',
    user: 'root',
    password: 'password',
    timezone: 'UTC',
    dateStrings: true
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    // dirctory: path.resolve(__dirname, 'src', 'database', 'migrations')
    directory: './src/database/migrations'
  },
  useNullAsDefault: true
};

// import path from 'path'

module.exports = {
  client: 'mysql',
  connection: {
    database: 'PShape',
    user: 'root',
    password: 'katriel'
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

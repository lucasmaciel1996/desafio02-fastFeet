module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  logging: true,
  define: {
    timesStamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

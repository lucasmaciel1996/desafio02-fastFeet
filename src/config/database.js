module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  logging: false,
  define: {
    timesStamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

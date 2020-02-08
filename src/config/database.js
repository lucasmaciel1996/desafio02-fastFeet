module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timesStamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

import Sequlize, { Model } from 'sequelize';

class Recipients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequlize.STRING,
        street: Sequlize.STRING,
        number: Sequlize.INTEGER,
        city: Sequlize.STRING,
        state: Sequlize.STRING,
        cep: Sequlize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Recipients;

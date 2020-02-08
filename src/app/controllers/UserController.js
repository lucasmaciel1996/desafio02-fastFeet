import * as yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const Schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(401).json({ error: 'User already exist' });
    }

    const { id, name, email, admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }

  async update(req, res) {
    const Schema = yup.object().shape({
      name: yup.string(),
      email: yup.string(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: yup
        .string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && user.email !== email) {
      const userExist = User.findOne({ where: { email } });

      if (userExist) {
        return res.status(401).json({ error: 'User already exist' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, admin } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();

import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    const recipients = await Recipients.findAll();
    return res.json({ recipients });
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .min(2)
        .required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .max(2)
        .required(),
      cep: Yup.string(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails ' });
    }
    const recipientsExist = await Recipients.findOne({
      where: { name: req.body.name },
    });

    if (recipientsExist) {
      return res.status(400).json({ error: ' Recipients already exist' });
    }
    const {
      id,
      name,
      street,
      number,
      city,
      state,
      cep,
    } = await Recipients.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      city,
      state,
      cep,
    });
  }

  async update(req, res) {
    const recipients = await Recipients.findByPk(req.params.id);

    if (!recipients) {
      return res.status(400).json({ error: 'Recipients not foud' });
    }
    const Schema = Yup.object().shape({
      name: Yup.string(2).required(),
      street: Yup.string(),
      number: Yup.number(),
      city: Yup.string(),
      state: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;
    if (name && name !== recipients.name) {
      const recipientsExist = await Recipients.findOne({ where: { name } });

      if (recipientsExist) {
        return res.status(400).json({ error: 'Recipients already exist' });
      }
    }

    const { id, street, number, city, state, cep } = await recipients.update(
      req.body
    );

    return res.json({
      id,
      name,
      street,
      number,
      city,
      state,
      cep,
    });
  }
}

export default new RecipientsController();

import User from '../models/User';

export default async (req, res, next) => {
  const userHasPrevileges = await User.findByPk(req.userId);

  if (!userHasPrevileges.admin) {
    return res.status(401).json({ error: 'Access Denied' });
  }
  return next();
};

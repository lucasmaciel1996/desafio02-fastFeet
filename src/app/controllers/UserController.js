class UserController {
  async store(req, res) {
    res.json({ msg: 'Crate user' });
  }

  async update(req, res) {
    res.json({ user: req.userId });
  }
}

export default new UserController();

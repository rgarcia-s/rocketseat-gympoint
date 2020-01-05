import Student from '../models/Student';

class StudentLogInController {
  async index(req, res) {
    const { id } = req.query;

    const response = await Student.findByPk(id);

    if (!response) return res.json(null);

    return res.json(response.id);
  }
}

export default new StudentLogInController();

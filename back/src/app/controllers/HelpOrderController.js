import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const orders = await HelpOrder.findAll({
      where: { student_id: student.id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(orders);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found. ' });
    }

    const order = await HelpOrder.create({
      student_id: student.id,
      question: req.body.question,
    });

    return res.json(order);
  }
}

export default new HelpOrderController();

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class HelpOrderAnswerController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const toAnswerOrders = await HelpOrder.findAll({
      where: { answer: null },
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

    return res.json(toAnswerOrders);
  }

  async update(req, res) {
    const order = await HelpOrder.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const answeredOrder = await order.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    const student = await Student.findByPk(order.student_id);

    await Queue.add(HelpOrderAnswerMail.key, {
      student,
      question: order.question,
      answer: answeredOrder.answer,
      answer_at: answeredOrder.answer_at,
    });

    return res.json(answeredOrder);
  }
}

export default new HelpOrderAnswerController();

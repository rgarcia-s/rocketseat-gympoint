import { subDays, startOfDay } from 'date-fns';
import CheckIn from '../schemas/checkIn';
import Student from '../models/Student';

class CheckInController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const checkIns = await CheckIn.find({
      student: student.id,
    })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });

    return res.json(checkIns);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const day = startOfDay(subDays(new Date(), 6));

    const checkIns = await CheckIn.find({
      student: student.id,
      createdAt: { $gte: day },
    });

    if (checkIns.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Check-ins limit exceeded. (5 in 7 days)' });
    }

    const checkIn = await CheckIn.create({ student: student.id });

    return res.json(checkIn);
  }
}

export default new CheckInController();

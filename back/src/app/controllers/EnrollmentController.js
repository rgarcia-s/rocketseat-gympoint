import * as Yup from 'yup';
import { addMonths, startOfDay, parseISO, isBefore } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Queue from '../../lib/Queue';
import EnrollmentMail from '../jobs/EnrollmentMail';
import EnrollmentUpdateMail from '../jobs/EnrollmentUpdateMail';

class EnrollmentController {
  async index(req, res) {
    const { id, page = 1, limit = 10 } = req.query;

    if (id) {
      const enrollments = await Enrollment.findAll({
        where: { id },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['title'],
          },
        ],
        limit,
        offset: (page - 1) * limit,
      });

      return res.json(enrollments);
    }
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student: Yup.number()
        .integer()
        .required(),
      plan: Yup.number()
        .integer()
        .required(),
      startDate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findByPk(req.body.student);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await Plan.findByPk(req.body.plan);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const isEnrolled = await Enrollment.findOne({
      where: { student_id: student.id },
    });

    if (isEnrolled) {
      return res.status(400).json({ error: 'Student is already enrolled' });
    }

    const today = startOfDay(new Date());
    const firstDay = startOfDay(parseISO(req.body.startDate));
    const lastDay = addMonths(firstDay, plan.duration);
    const fullPrice = plan.price * plan.duration;

    if (isBefore(firstDay, today)) {
      return res
        .status(400)
        .json({ error: 'Start date cannot be a past date' });
    }

    const enrollment = await Enrollment.create({
      student_id: student.id,
      plan_id: plan.id,
      start_date: firstDay,
      end_date: lastDay,
      price: fullPrice,
    });

    await Queue.add(EnrollmentMail.key, {
      student,
      plan,
      fullPrice,
      firstDay,
      lastDay,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student: Yup.number().integer(),
      plan: Yup.number().integer(),
      startDate: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    const student = await Student.findByPk(req.body.student);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await Plan.findByPk(req.body.plan);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const firstDay = startOfDay(parseISO(req.body.startDate));
    const lastDay = addMonths(firstDay, plan.duration);
    const fullPrice = plan.price * plan.duration;

    await enrollment.update({
      student_id: student.id,
      plan_id: plan.id,
      start_date: firstDay,
      end_date: lastDay,
      price: fullPrice,
    });

    await Queue.add(EnrollmentUpdateMail.key, {
      student,
      plan,
      fullPrice,
      firstDay,
      lastDay,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    await enrollment.destroy();

    return res.json({ Success: `Enrollment ${enrollment.id} deleted` });
  }
}

export default new EnrollmentController();

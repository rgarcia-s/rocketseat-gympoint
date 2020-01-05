import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class StudentController {
  async index(req, res) {
    const { id, name = '', page = 1, limit = null } = req.query;

    if (id) {
      const response = await Student.findAll({
        where: { id, name: { [Op.iLike]: `%${name}%` } },
        order: [['name']],
      });

      return res.json(response);
    }
    if (limit !== null) {
      const response = await Student.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        offset: (page - 1) * limit,
        limit,
        order: [['name']],
      });

      return res.json(response);
    }

    const response = await Student.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      order: [['name']],
    });

    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed' });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.params.id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'E-mail already in use' });
      }
    }

    const updatedStudent = await student.update(req.body);

    return res.json(updatedStudent);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findOne({
      where: { student_id: req.params.id },
    });

    if (enrollment) {
      await enrollment.destroy();
    }

    const student = await Student.findByPk(req.params.id);

    await student.destroy();

    return res.json({ Success: `Student ${student.name} deleted` });
  }
}

export default new StudentController();

import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { id, page = 1, limit = 10 } = req.query;

    if (id) {
      const plans = await Plan.findAll({
        where: { id },
        limit,
        offset: (page - 1) * limit,
        order: [['duration']],
      });

      return res.json(plans);
    }

    const plans = await Plan.findAll({
      limit,
      offset: (page - 1) * limit,
      order: [['duration']],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.findByPk(req.params.id);

    const updatedPlan = await plan.update(req.body);

    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.destroy();

    return res.json({ Success: `Plan ${plan.title} deleted` });
  }
}

export default new PlanController();

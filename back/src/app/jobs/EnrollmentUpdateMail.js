import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class EnrollmentUpdateMail {
  get key() {
    return 'EnrollmentUpdateMail';
  }

  async handle({ data }) {
    const { student, plan, fullPrice, firstDay, lastDay } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula atualizada',
      template: 'enrollmentUpdate',
      context: {
        student: student.name,
        first_day: format(parseISO(firstDay), "dd'/'MM'/'yy"),
        last_day: format(parseISO(lastDay), "dd'/'MM'/'yy"),
        duration: plan.duration,
        price: fullPrice,
      },
    });
  }
}

export default new EnrollmentUpdateMail();

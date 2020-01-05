import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { student, question, answer, answer_at } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Questão respondida',
      template: 'helpOrderAnswer',
      context: {
        student: student.name,
        question,
        answer,
        answer_at: format(parseISO(answer_at), "dd'/'MM'/'yy' 'HH':'mm"),
      },
    });
  }
}

export default new HelpOrderAnswerMail();

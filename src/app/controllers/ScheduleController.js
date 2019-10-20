import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Apointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const userIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!userIsProvider) {
      return res.status(400).json({ error: 'User is not a provider.' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const apointments = await Apointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      orde: date,
    });

    return res.json(apointments);
  }
}

export default new ScheduleController();

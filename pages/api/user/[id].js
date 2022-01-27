import { getById } from '../../../services/user';

export default async function handler (req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const user = await getById(id);
        delete user.project_views;
        res.status(200).json({ success: true, data: user });
      } catch(err) {
        res.status(400).json({ success: false, errors: [err.message] });
      }
      break

    default:
      res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
      break
  }
}
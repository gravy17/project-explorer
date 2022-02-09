import { getAll } from '../../../services/project';

export default async function handler (req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      try {
        const projects = await getAll();
        res.status(200).json({ success: true, data: projects });
      } catch(err) {
        res.status(400).json({ success: false, errors: [err.message] });
      }
      break

    default:
      res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
      break
  }
}
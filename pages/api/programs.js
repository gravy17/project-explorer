import { getPrograms  } from '../../services/school';

export default async function handler (req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      try {
        const programs = await getPrograms();
        res.status(200).json({ success: true, data: programs });
      } catch(err) {
        res.status(400).json({ success: false, errors: [err.message] });
      }
      break

    default:
      res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
      break
  }
}
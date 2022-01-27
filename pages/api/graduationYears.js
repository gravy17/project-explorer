import { getGradYears  } from '../../services/school';

export default async function handler (req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      try {
        const years = await getGradYears();
        res.status(200).json({ success: true, data: years });
      } catch(err) {
        res.status(400).json({ success: false, errors: [err.message] });
      }
      break

    default:
      res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
      break
  }
}
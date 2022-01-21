import dbConnect from '../../../lib/dbConnect';
import {getById} from '../../../services/project';
import {trackView, getViewHistory} from '../../../services/user';

export default async function handler (req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect()

  switch (method) {
    case 'GET':
        try {
          const project = await getById(id);
          if(req.session.user) {
            const project_view = {project_id: projectData._id, last_view: new Date()};
            if(await trackView(req.session.user._id, project_view)){
              const trackedData = await getViewHistory(req.session.user._id);
              req.session.user['project_views'] = trackedData.project_views;
            }
          }
          res.status(200).json({ success: true, data: project });
        } catch(err) {
          res.status(400).json({ success: false, errors: [err.message] });
        }
        break
    default:
        res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
        break
  }
}
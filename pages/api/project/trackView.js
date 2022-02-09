import {trackView, getViewHistory} from '../../../services/user';
import baseHandler from '../../../lib/middleware/common';

export default baseHandler().get(async(req, res) => {
  try {
    const { id } = req.query;
    if(req.session.user) {
      const project_view = {project_id: id, last_view: new Date()};
      if(await trackView(req.session.user._id, project_view)){
        const trackedData = await getViewHistory(req.session.user._id);
        req.session.user['project_views'] = trackedData.project_views;
        res.status(200).json({ success: true, data: trackedData.project_views });
      }
    } else {
      throw new Error('Not logged in');
    }
  } catch(err) {
    res.status(400).json({ success: false, errors: [err.message] });
  }
})

export const config = {
  api: {
    externalResolver: true,
  },
}
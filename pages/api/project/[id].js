import {getById} from '../../../services/project';
import {trackView, getViewHistory} from '../../../services/user';
// import { getSession } from '../../../lib/middleware/session';
import baseHandler from '../../../lib/middleware/common';

export default baseHandler().get(async(req, res) => {
  try {
    const { id } = req.query;
    const project = await getById(id);
    if(!project) {
      throw new Error("Couldn't find the project");
    }
    res.status(200).json({ success: true, data: project });

    // const session = await getSession(req, res);
    // if(session.user) {
    //   const project_view = {project_id: id, last_view: new Date()};
    //   if(await trackView(session.user._id, project_view)){
    //     const trackedData = await getViewHistory(session.user._id);
    //     session.user['project_views'] = trackedData.project_views;
    //   }
    // }
    if(req.session.user) {
      const project_view = {project_id: id, last_view: new Date()};
      if(await trackView(req.session.user._id, project_view)){
        const trackedData = await getViewHistory(req.session.user._id);
        req.session.user['project_views'] = trackedData.project_views;
      }
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
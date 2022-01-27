import { create } from '../../../services/project';
// import { getSession } from '../../../lib/middleware/session';
import baseHandler from '../../../lib/middleware/common';

function sanitizeProjectData({name, abstract, authors, tags, createdBy}) {
  if(!tags || !authors) {
    throw 'Project must have at least a tag and an author';
  }
  let formattedTags=[], formattedAuthors=[];
  if(tags.length){
    formattedTags = tags.split('#')
    .map(tag => tag.trim()).filter(word => word.length);
  }
  if(authors.length){
    formattedAuthors = req.body.authors.split(',')
    .map(name => name.trim()).filter(word => word.length);
  }
  return {name, abstract, authors: formattedAuthors, tags: formattedTags, createdBy};
};

export default baseHandler().post(async(req, res) => {
  // const session = await getSession(req, res);
  // if(!session.user){ 
  //   res.status(401).json({ success: false, errors: [new Error('Unauthorized. Login to submit projects').message] })
  // }
  if(!req.session.user){ 
    res.status(401).json({ success: false, errors: [new Error('Unauthorized. Login to submit projects').message] })
  }
  let project = req.body;
  // project['createdBy'] = session.user._id;
  project['createdBy'] = req.session.user._id;
  project = sanitizeProjectData(project);
  try {
    const [isCreated, result] = await create(project);
    if(!isCreated){
      throw new Error(result);  
    } 
    res.status(200).json({ success: true, data: result });
  } catch(err) {
    res.status(400).json({ success: false, errors: [err.message] });
  }
});

export const config = {
  api: {
    externalResolver: true,
  },
}
import dbConnect from '../../../lib/dbConnect';
import {create} from '../../../services/project';

const sanitizeProjectData = ({name, abstract, authors, tags}) => {
    let formattedTags=[], formattedAuthors=[];
    if(tags.length){
        formattedTags = tags.split('#')
        .map(tag => tag.trim()).filter(word => word.length);
    }
    if(authors.length){
        formattedAuthors = req.body.authors.split(',')
        .map(name => name.trim()).filter(word => word.length);
    }
    return {name, abstract, authors: formattedAuthors, tags: formattedTags};
};

export default async function handler (req, res) {
    const { method } = req;

    await dbConnect()

    switch (method) {
        case 'POST':
            try {
                let project = req.body;
                if(project.tags || project.authors){
                    project = sanitizeProjectData(project);
                }
                project['createdBy'] = req.session.user._id;
                
                const [isCreated, result] = await create(project);
                if(isCreated){
                    res.status(200).json({ success: true, data: result });
                } else {
                    throw new Error(JSON.stringify(result));
                }
            } catch(err) {
                res.status(400).json({ success: false, errors: [err.message] });
            }
            break
        default:
            res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
            break
    }
}  
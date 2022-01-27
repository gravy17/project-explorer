import { searchByCriteria } from '../../../services/project';
const PAGE_SIZE = parseInt(process.env.PAGE_SIZE);

export default async function handler (req, res) {
  const { method } = req;
  const { term, criteria, page } = req.query;

  switch (method) {
    case 'POST':
    case 'GET':
      try {
        if(!query.term) {
          throw new Error("No Search Term Provided");
        }
        const queryAdapter = {
          searchTerm: term,
          criteria: criteria || "name",
          page: parseInt(page) || 1 ,
          page_size: PAGE_SIZE 
        };
        const [isFound, results] = await searchByCriteria(queryAdapter);
        if(!isFound) {
          throw new Error("Nothing was found");
        } 
        res.status(200).json({ success: true, query: queryAdapter, data: results });    
      } catch (err) {
        res.status(400).json({ success: false, errors: [err.message] });
      }
      break
    default:
      res.status(400).json({ success: false, errors: [new Error('Invalid API Method').message] });
      break
  }
}
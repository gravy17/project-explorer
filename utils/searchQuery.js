

const generatePipeline = ({criteria, searchTerm, page, page_size}) => {
  //The pipeline uses a regex for a case insensitive search for the string
  //It will return a page of results based on input parameter and constants
  //Also includes a total count of the results
  return ([
    {
      '$match': {
        [criteria]: {
          '$regex': searchTerm, 
          '$options': 'i'
        }
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }, {
      '$facet': {
        'data': [
          {
            '$skip': (page-1)*page_size
          }, {
            '$limit': page_size
          }
        ], 
        'total': [
          {
            '$count': 'projects'
          }
        ]
      }
    }, {
      '$unwind': {
        'path': '$total', 
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$project': {
        'data': 1, 
        'total': '$total.projects'
      }
    }
  ]);
} 

module.exports = {
  generatePipeline
};
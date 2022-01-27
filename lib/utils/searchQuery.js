export default function generatePipeline({criteria, searchTerm, page, page_size}) {
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
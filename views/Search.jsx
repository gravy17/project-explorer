import React from 'react';
import Layout from './shared/Layout';
import ProjectInfo from './shared/ProjectInfo';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Search = ({results, user, errors, currentSearch}) => {
    let hits=null, totalHits=0, totalPages=0;
    if(results && results[0]){
        hits = [...results[0].data];
        totalHits = results[0].total;
        const PAGE_SIZE = currentSearch?.page_size || 8;
        // Calculates total num of pages based on result count and page size: 
        // the floor expression calculates the number of pages filled to the limit
        // the ceiling expression adds for the last page when it contains less results than the limit 
        totalPages = Math.floor(totalHits/PAGE_SIZE) + Math.ceil((totalHits % PAGE_SIZE)/PAGE_SIZE); 
    }    

    return (
        <Layout user={user}>
        <>
            <h2 className="mt-4">Search</h2>
            <Form method='get' action='/search' id='searchForm' className="form-row mb-5">
                <Form.Row className="w-100">
                    <Form.Control required type="text" name='term' defaultValue={currentSearch?.searchTerm} className="col-sm-12 col-lg-6 form-control-lg mb-2 px-2" placeholder="Search project name, abstract, authors, or tags"/>

                    <InputGroup className="col-sm-12 col-md-8 col-lg-3 mb-2 px-1">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Search by</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" name="criteria" required defaultValue={currentSearch?.criteria} className="form-control-lg">
                            <option value="name">Name</option> 
                            <option value="abstract">Abstract</option>
                            <option value="authors">Authors</option>
                            <option value="tags">Tags</option>   
                        </Form.Control>
                    </InputGroup>
                
                    <Button type='submit' className="col-sm-12 col-md-4 col-lg-3 p-2 mb-2 px-1">Search</Button>
                </Form.Row>
                {errors? 
                <Form.Control.Feedback type="invalid">
                    {errors.join(', ')}
                </Form.Control.Feedback>: null}
            </Form>
            <Container fluid className='d-flex flex-row align-items-baseline mb-4 justify-content-between'>
                <h3>All Projects <span className="ml-2 text-secondary small">{`(${totalHits} result${totalHits===1?"":"s"})`}</span></h3>
                <span>
                    {currentSearch?.page > 1? 
                    <a className='btn btn-secondary rounded-2 small' href={`/search?term=${currentSearch.searchTerm}&criteria=${currentSearch.criteria}&page=${currentSearch.page-1}`}>
                        Previous
                    </a>: null
                    }
                    <span className='ml-2 small'>page {totalPages>0?currentSearch?.page:0} of {totalPages}</span>
                    {currentSearch?.page < totalPages? 
                    <a className='btn btn-secondary rounded-2 ml-2 small' href={`/search?term=${currentSearch.searchTerm}&criteria=${currentSearch.criteria}&page=${currentSearch.page+1}`} >
                        Next
                    </a>: null
                    }
                </span>
            </Container>
            <Container fluid bg='light' className='card-group'>
                {hits? 
                hits.map((project) => <ProjectInfo key={String(project._id)} pastVisit={user?.project_views?.find((view) => view.project_id === project._id)|| {}} {...project} />)
                :<p>No matches found</p>}
            </Container>
        </>
        </Layout>
    );
}

export default Search;
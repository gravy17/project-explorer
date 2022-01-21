import React from 'react';
import Layout from '../../views/shared/Layout';
import ProjectInfo from '../../views/shared/ProjectInfo';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Search({results, user, errors, currentSearch}){
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
            <h2 className="mt-4 mx-4 themed">Search</h2>
            <Form method='get' action='/search' id='searchForm' className="mb-5 mx-4 text-white">
                <Form.Row>
                    <Form.Control size='sm' required type="text" name='term' defaultValue={currentSearch?.searchTerm} className="col-sm-12 col-lg-6 mb-2 px-2" placeholder="Search project name, abstract, authors, or tags"/>

                    <InputGroup size='sm' className="col-sm-12 col-md-8 col-lg-3 mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text for="searchCriteriaSelect" id='searchCriteriaInputGroup' style={{opacity: '0.7'}}>Search by</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" id="searchCriteriaSelect" name="criteria" required defaultValue={currentSearch?.criteria}>
                            <option value="name">Name</option> 
                            <option value="abstract">Abstract</option>
                            <option value="authors">Authors</option>
                            <option value="tags">Tags</option>   
                        </Form.Control>
                    </InputGroup>
                
                    <Button type='submit' size='sm' className="col-sm-12 col-md-4 col-lg-3 mb-3">Search</Button>
                </Form.Row>
                {errors? 
                <Form.Control.Feedback type="invalid">
                    {errors.join(', ')}
                </Form.Control.Feedback>: null}
            </Form>
            <Container className='d-flex flex-row align-items-baseline mb-4 mx-4 justify-content-between strong-text'>
                <h3>All Projects <span className="ml-2 weak-text small">{`(${totalHits} result${totalHits===1?"":"s"})`}</span></h3>
                <span>
                    {currentSearch?.page > 1? 
                    <a className='btn btn-outline-light themed-outline rounded-2 small' href={`/search?term=${currentSearch.searchTerm}&criteria=${currentSearch.criteria}&page=${currentSearch.page-1}`}>
                        Previous
                    </a>: null
                    }
                    <span className='ml-2 small weak-text'>page {totalPages>0?currentSearch?.page:0} of {totalPages}</span>
                    {currentSearch?.page < totalPages? 
                    <a className='btn btn-outline-light themed-outline rounded-2 ml-2 small' href={`/search?term=${currentSearch.searchTerm}&criteria=${currentSearch.criteria}&page=${currentSearch.page+1}`} >
                        Next
                    </a>: null
                    }
                </span>
            </Container>
            <Container fluid className='card-group'>
                {hits? 
                hits.map((project) => <ProjectInfo key={String(project._id)} pastVisit={user?.project_views?.find((view) => view.project_id === project._id)|| {}} {...project} />)
                :<p className='weak-text m-4 p-5 small border border-muted rounded w-100 text-center'>No matches found</p>}
            </Container>
        </>
        </Layout>
    );
}
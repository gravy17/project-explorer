import React, { useState, useContext, useEffect } from 'react';
import Layout from '../../components/shared/Layout';
import ProjectInfo from '../../components/shared/ProjectInfo';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Head from 'next/head';
import { UserContext } from '../../components/UserContext';
import { useRouter } from 'next/router';
import { MessageContext } from '../../components/MessageContext';

export default function Search({results, currentSearch}){

  let hits=null, totalHits=0, totalPages=0, project_views;
  if(results && results[0]){
    hits = [...results[0].data];
    totalHits = results[0].total;
    const PAGE_SIZE = currentSearch?.page_size || 8;
    totalPages = Math.floor(totalHits/PAGE_SIZE) + Math.ceil((totalHits % PAGE_SIZE)/PAGE_SIZE); 
  }    
  const { user } = useContext(UserContext);
  if(user.project_views){
    project_views = user.project_views;
  }

  const { notify } = useContext(MessageContext);
  const [nextSearch, setNextSearch] = useState({});
  const handleSearchInput = (event) => {
    let newSearch = { ...nextSearch };
    newSearch[event.target.name] = event.target.value;
    setNextSearch(newSearch);
  }
  useEffect(() => {
    if(currentSearch.searchTerm){
      if(!results || !results[0]){
        notify("The search failed to turn up anything", 'error')
      }
      let defaults = {};
      defaults['newSearchTerm'] = currentSearch.searchTerm;
      defaults['newCriteria'] = currentSearch.criteria;
      setNextSearch(defaults);
    }
  }, [currentSearch.searchTerm])

  const router = useRouter();
  const startNewSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/search/${nextSearch.newSearchTerm||''}?criteria=${nextSearch.newCriteria||'name'}`, undefined, {shallow: false, scroll: false, getServerSideProps: true});
  }

  return (
    <Layout>
    <>
      <Head>
          <title>Search- {currentSearch.searchTerm} | Project-Explorer</title>
      </Head>
      <h2 className="mt-4 mx-4 themed">Search</h2>
      <Form method='get' onSubmit={startNewSearch} className="mb-5 mx-4 text-white">
        <Form.Row>
          <Form.Control size='sm' required type="text" name='newSearchTerm' value={nextSearch['newSearchTerm']} onChange={handleSearchInput} className="col-sm-12 col-lg-6 mb-2 px-2" placeholder="Search project name, abstract, authors, or tags"/>

          <InputGroup size='sm' className="col-sm-12 col-md-8 col-lg-3 mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text for="searchCriteriaSelect" id='searchCriteriaInputGroup' style={{opacity: '0.7'}}>Search by</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" id="searchCriteriaSelect" name="newCriteria" required value={nextSearch['newCriteria']} onChange={handleSearchInput}>
              <option value="name">Name</option> 
              <option value="abstract">Abstract</option>
              <option value="authors">Authors</option>
              <option value="tags">Tags</option>   
            </Form.Control>
          </InputGroup>
      
          <Button type='submit' size='sm' className="col-sm-12 col-md-4 col-lg-3 mb-3">Search</Button>
        </Form.Row>
      </Form>
      <Container className='d-flex flex-row align-items-baseline mb-4 mx-4 justify-content-between strong-text'>
        <h3>All Projects <span className="ml-2 weak-text small">{`(${totalHits} result${totalHits===1?"":"s"})`}</span></h3>
        <span>
          {currentSearch?.page > 1? 
          <a className='btn btn-outline-light themed-outline rounded-2 small' href={`/search/${currentSearch.searchTerm}?criteria=${currentSearch.criteria}&page=${currentSearch.page-1}`}>
            Previous
          </a>: null
          }
          <span className='ml-2 small weak-text'>page {totalPages>0?currentSearch?.page:0} of {totalPages}</span>
          {currentSearch?.page < totalPages? 
          <a className='btn btn-outline-light themed-outline rounded-2 ml-2 small' href={`/search/${currentSearch.searchTerm}?criteria=${currentSearch.criteria}&page=${currentSearch.page+1}`} >
            Next
          </a>: null
          }
        </span>
      </Container>
      <Container fluid className='card-group'>
        {hits? 
        hits.map((project) => {
          let last_view = project_views?.find((view) => view.project_id === project._id)?.last_view || null;
          return(<ProjectInfo key={String(project._id)} {...project} last_view={last_view}/>);
        })
        :<p className='weak-text m-4 p-5 small border border-muted rounded w-100 text-center'>No matches found</p>}
      </Container>
    </>
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const { term, criteria, page } = req.query;
  try {
    const data = await fetch(`${process.env.BASE_URL}/api/search/${term}?criteria=${criteria || 'name'}&page=${page}`);
    const searchRes = await data.json();
    return {
      props: {
        results: searchRes.data,
        currentSearch: searchRes.query
      }
    }
  } catch (e) {
    console.log(e)
  }
}
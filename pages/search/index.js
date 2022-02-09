import Search from "./[term]";
export default Search;

export async function getServerSideProps(req) {
  const { term, criteria, page } = req.query;
  if(!term){
    return {
      props: {
        results: [],
        currentSearch: {}
      }
    }
  }
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
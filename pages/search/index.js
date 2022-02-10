import Search from "./[term]";
export default Search;

export async function getServerSideProps(req) {
  const { criteria, page } = req.query;
  const { term } = req.params || { term: '' };
  if(!term){
    return {
      props: {
        results: [],
        currentSearch: {}
      }
    }
  }
  try {
    const data = await fetch(`https://${process.env.VERCEL_URL}/api/search/${term}?criteria=${criteria || 'name'}&page=${page}`);
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
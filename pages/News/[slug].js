import Article from '../../Components/Article';
import HomeBar from '../../Components/HomeBar';

//import { Article } from '../../Component/article';
const API_KEY = process.env.API_KEY;

export const Feed = ({ articles, pageNumber }) => {
    return articles.length ? (
         <div className="bg-black text-gray-50 ">
            <HomeBar/>
            <div className="m-5">
            {articles.map((article, index) => (
                <Article key = {index} article = {article} index ={index}/>
             ))}
             </div>
          </div>
          ) 
          : (
        <div >
          <h1>Oops! No articles for this page</h1>
        </div>
    );
  };
  
  export const getServerSideProps = async (pageContext) => {
    const pageNumber = pageContext.query.slug;
  
    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
      return {
        props: {
          articles: [],
          pageNumber: 1,
        },
      };
    }
    const apiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=(business||technology)&pageSize=5&page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        },
    ).then(res =>res.json());
    
      const { articles } = apiResponse;
    
      return {
        props: {
          articles: articles,
          pageNumber: Number.parseInt(pageNumber),
        },
      };
  };

export default Feed;
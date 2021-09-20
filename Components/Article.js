const Article = (props)=>{
    console.log(props.article);
    return (<div className=" p-5 flex rounded-lg flex-col  m-auto cursor-pointer  mb-20 max-w-3xl hover:underline border-4 "  onClick={() => (window.location.href = props.article.url)}>
                <h1 className="font-bold text-center text-xl mb-2 " >{props.article.title}</h1>
                <p className="text-center mb-2">{props.article.description}</p>
                <div className="text-center">
                {!!props.article.urlToImage && <img  src={props.article.urlToImage} width ={700} height={700}/>}
                </div>
                
              </div>)
}
export default Article;
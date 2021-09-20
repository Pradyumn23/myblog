import Youtube from "./Youtube";
import Markdown from 'markdown-to-jsx'
import Link from 'next/link'
const Blogs= ({blog})=>{
 


    return (
    <div>
    <Link href={`/posts/${blog.slug}`}>
      <div className="p-5 flex rounded-lg flex-col  m-auto cursor-pointer  mb-20 max-w-3xl hover:underline border-4  "  >
        <h1 className="font-bold text-center text-3xl mb-2 " >{blog.title}</h1>
          <Markdown
          options={{
            overrides: {
            Youtube: { component: Youtube }
             }
           }}>
          {blog.slug}
        </Markdown>
        <div className="title">
      </div>
    </div>
    </Link>
    </div>)
}
export default Blogs;
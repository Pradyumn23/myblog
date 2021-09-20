import HomeBar from '../../Components/HomeBar.js'
import githubCms from '../../lib/github-cms'
import Markdown from 'markdown-to-jsx'
import Youtube from '../../Components/Youtube.js'
import { useRouter} from 'next/router'
import Comments from '../../components/Comments'



export default function Post({blog}) {
const router = useRouter();

if (router.isFallback) {
  return (
    <Theme>
      loading...
    </Theme>
  )
}

if (!blog) {
  return (
    <Theme>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      404 - Page not found!
    </Theme>
  )
}
  return (
    <div>
    <HomeBar/>
      <div className="p-5 flex rounded-lg flex-col  m-auto cursor-pointer  mb-20 max-w-3xl hover:underline border-4  "  >
        <h1 className="font-bold text-center text-3xl mb-2 " >{blog.title}</h1>
          <Markdown
          options={{
            overrides: {
            Youtube: { component: Youtube }
             }
           }}>
          {blog.content}
        </Markdown>
        <b>Comments</b>
            <Comments slug={blog}/>
        
        <div className="title">
      </div>
    </div>
    </div>

  )
}
export async function getStaticPaths() {
  const postList = await githubCms.getPostList()
  const paths = postList.map(post => ({
    params: {
      slug: post.slug
    }
  }))

  return {
    paths,
    fallback: true
  }
}
export async function getStaticProps ({ params }) {
const post = await githubCms.getPost(params.slug)


  return {
    props: {
      blog:post
    },
    revalidate: 2
  }
}
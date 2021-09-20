import Head from 'next/head'
import Image from 'next/image'
import HomeBar from '../Components/HomeBar.js'
import Blogs from '../Components/Blogs.js'
import githubCms from '../lib/github-cms'


export default function Home({blogs}) {
  return (
    <div >
          <HomeBar/>
      {blogs.map((blog,index)=><Blogs key = {index} blog={blog}/>)}
    </div>

  )
}

export const getStaticProps = async(page)=>{
  const blogs = await githubCms.getPostList()



  return {
    props: {
      blogs
    },
    revalidate: 5
  }
}

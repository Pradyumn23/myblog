import { useRouter } from "next/dist/client/router"
import { signIn, signOut,useSession } from "next-auth/client";

const HomeBar = ()=>{
    const router = useRouter();
    const [session] = useSession()
    console.log(session);

  const handleLogin = (e) => {
    e.preventDefault()
    signIn('github')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut()
  }
    return(
        <div className='bg-black flex   items-center h-auto text-black text-3xl pt-6 pb-6'>
        <div className='flex flex-grow sm:justify-center justify-left ' >
        <button className='mr-5 bg-gray-50 p-2 mb-5 rounded-md cursor-pointer hover:bg-blue-100  ' onClick={()=>{router.push('/')}}>HOME</button>
        <button className='mr-5 bg-gray-50 p-2 mb-5 rounded-md cursor-pointer hover:bg-blue-100  ' onClick={()=>{router.push('/News/1')}}>News</button>
        <div className="userInfor mr-5 bg-gray-50 p-2 mb-5 rounded-md cursor-pointer hover:bg-blue-100 ">
        {session? (
          <>
            <a href="#" onClick={handleLogout} className="logout">Logout</a>
          </>
        ) : (
          <a href="#" onClick={handleLogin} className="logout">Login</a>
        )}
        </div>
        </div>
        </div>
    )
}

export default HomeBar
import Markdown from 'markdown-to-jsx'
import ms from 'ms'
import useSWR from 'swr'
import AddCommentBox from './AddCommentBox'

async function swrFetcher(path) {
    const res = await fetch(path)
    return res.json()
}

export default function Comments({slug}) {
    const {data: comments, mutate} = useSWR(`/api/comments?slug=${slug.slug}`, swrFetcher)

    const handleAddComment = async (content) => {
        console.log(content)
        const fetchRes = await fetch(`/api/comments?slug=${slug.slug}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
    
        if (!fetchRes.ok) {
            alert(`Error: ${fetchRes.text()}`)
        }
    
        mutate()
    }


    if (!comments) {
        return (
            <div className="comments">
                <div className="comments-info">
                    loading...
                </div>
            </div>
        )
    }

    return (
        <div>
            {comments && comments.length > 0 ? (
                <div className="comments">
                    {comments.map(c => (
                        <div key={c.id} >
                            <div >
                                <Markdown>{c.content || ''}</Markdown>
                            </div>
                            <div >
                                <div>{c.name} ({ms(Date.now() - c.createdAt)} ago)</div>
                            </div>
                        </div>
                        ))}
                      </div>
            ) : (
                <div className="comments">
                    <div className="comments-info">
                        No comments so far.
                    </div>
                </div>
            )}
            <AddCommentBox className="m-4" onSubmit={handleAddComment}/>
        </div>
    )
}

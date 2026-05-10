import {useEffect, useState} from 'react'
import {apiStatusConstants, images} from '../../utils/constants.js'
import {fetchWithAuth} from '../../utils/api.js'
import FailureView from '../FailureView/FailureView.jsx'
import LoaderView from '../LoaderView/LoaderView.jsx'
import Post from '../Post/Post.jsx'

const PostsList = ({search = ''}) => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const path = search ? `/insta-share/posts?search=${encodeURIComponent(search)}` : '/insta-share/posts'
      const data = await fetchWithAuth(path)
      setPosts(data.posts || [])
      setApiStatus(apiStatusConstants.success)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getPosts()
  }, [search])

  if (apiStatus === apiStatusConstants.inProgress) {
    return <LoaderView label="Loading posts" />
  }

  if (apiStatus === apiStatusConstants.failure) {
    return <FailureView onRetry={getPosts} />
  }

  if (apiStatus === apiStatusConstants.success && posts.length === 0 && search) {
    return (
      <section className="empty-search">
        <img src={images.searchNotFound} alt="search not found" />
        <h1>Search Not Found</h1>
        <p>Try different keywords or search again.</p>
      </section>
    )
  }

  return (
    <section className="posts-section">
      {search && <h1 className="section-title">Search Results</h1>}
      {posts.map(post => (
        <Post key={post.post_id} post={post} />
      ))}
    </section>
  )
}

export default PostsList

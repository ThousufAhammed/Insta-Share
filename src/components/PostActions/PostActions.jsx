import {useState} from 'react'
import {BiShareAlt} from 'react-icons/bi'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {fetchWithAuth} from '../../utils/api.js'

const PostActions = ({postId, initialLikes = 0}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleLike = async () => {
    if (isUpdating) return
    const nextLiked = !isLiked
    setIsUpdating(true)
    try {
      await fetchWithAuth(`/insta-share/posts/${postId}/like`, {
        method: 'POST',
        body: JSON.stringify({like_status: nextLiked}),
      })
      setIsLiked(nextLiked)
      setLikesCount(count => count + (nextLiked ? 1 : -1))
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <div className="post-actions">
        <button type="button" onClick={toggleLike} aria-label={isLiked ? 'Unlike post' : 'Like post'}>
          {isLiked ? <FcLike /> : <BsHeart />}
        </button>
        <button type="button" aria-label="Comment">
          <FaRegComment />
        </button>
        <button type="button" aria-label="Share">
          <BiShareAlt />
        </button>
      </div>
      <p className="likes-count">{likesCount} likes</p>
    </>
  )
}

export default PostActions

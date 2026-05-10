import {Link} from 'react-router-dom'
import AppImage from '../AppImage/AppImage.jsx'
import CommentSection from '../CommentSection/CommentSection.jsx'
import PostActions from '../PostActions/PostActions.jsx'

const Post = ({post}) => (
  <article className="post-card">
    <div className="post-user-row">
      <AppImage src={post.profile_pic} alt={`${post.user_name} profile`} fallbackVariant="avatar" />
      <Link to={`/users/${post.user_id}`} className="post-username">
        {post.user_name}
      </Link>
    </div>
    <AppImage src={post.post_details?.image_url} alt="post" className="post-image" />
    <div className="post-body">
      <PostActions postId={post.post_id} initialLikes={post.likes_count} />
      <p className="post-caption">{post.post_details?.caption}</p>
      <CommentSection comments={post.comments || []} />
      <p className="created-at">{post.created_at}</p>
    </div>
  </article>
)

export default Post

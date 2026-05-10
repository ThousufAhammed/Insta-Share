const CommentSection = ({comments}) => (
  <div className="comments-list">
    {comments.map(comment => (
      <p key={`${comment.user_id}-${comment.comment}`} className="comment">
        <span>{comment.user_name}</span> {comment.comment}
      </p>
    ))}
  </div>
)

export default CommentSection

import {BiCamera} from 'react-icons/bi'

const normalizeProfile = profile => ({
  id: profile.id || profile.user_id,
  userId: profile.user_id,
  userName: profile.user_name,
  profilePic: profile.profile_pic,
  bio: profile.user_bio,
  followers: profile.followers_count,
  following: profile.following_count,
  postsCount: profile.posts_count,
  stories: profile.stories || [],
  posts: profile.posts || [],
})

const Profile = ({profile, title}) => {
  const user = normalizeProfile(profile)

  return (
    <section className="profile-layout">
      <div className="profile-header">
        <img src={user.profilePic} alt={user.userName} className="profile-avatar" />
        <div className="profile-info">
          <h1>{title || user.userName}</h1>
          <div className="profile-stats">
            <p>
              <span>{user.postsCount}</span> posts
            </p>
            <p>
              <span>{user.followers}</span> followers
            </p>
            <p>
              <span>{user.following}</span> following
            </p>
          </div>
          <p className="profile-name">{user.userName}</p>
          <p className="profile-bio">{user.bio}</p>
        </div>
      </div>

      {user.stories.length > 0 && (
        <div className="profile-stories">
          {user.stories.map(story => (
            <img key={story.id} src={story.image} alt="user story" />
          ))}
        </div>
      )}

      <h2 className="posts-heading">Posts</h2>
      {user.posts.length === 0 ? (
        <div className="no-posts">
          <BiCamera />
          <h2>No Posts Yet</h2>
        </div>
      ) : (
        <div className="posts-grid">
          {user.posts.map(post => (
            <img key={post.id} src={post.image} alt="user post" />
          ))}
        </div>
      )}
    </section>
  )
}

export default Profile

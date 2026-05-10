const UserStory = ({story, onOpen}) => (
  <button type="button" className="story-item" onClick={onOpen}>
    <img src={story.story_url} alt={story.user_name} />
    <span>{story.user_name}</span>
  </button>
)

export default UserStory

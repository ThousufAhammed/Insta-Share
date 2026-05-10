import AppImage from '../AppImage/AppImage.jsx'

const UserStory = ({story, onOpen}) => (
  <button type="button" className="story-item" onClick={onOpen}>
    <AppImage src={story.story_url} alt={story.user_name} fallbackVariant="avatar" />
    <span>{story.user_name}</span>
  </button>
)

export default UserStory

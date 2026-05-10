import {FiX} from 'react-icons/fi'
import AppImage from '../AppImage/AppImage.jsx'

const UserStoriesModal = ({story, onClose}) => (
  <div className="modal-backdrop" role="dialog" aria-modal="true">
    <div className="story-modal">
      <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close story">
        <FiX />
      </button>
      <AppImage src={story.story_url} alt={story.user_name} />
      <h2>{story.user_name}</h2>
    </div>
  </div>
)

export default UserStoriesModal

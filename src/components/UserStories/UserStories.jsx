import {useEffect, useState} from 'react'
import {apiStatusConstants} from '../../utils/constants.js'
import {fetchWithAuth} from '../../utils/api.js'
import FailureView from '../FailureView/FailureView.jsx'
import LoaderView from '../LoaderView/LoaderView.jsx'
import UserStory from '../UserStory/UserStory.jsx'
import UserStoriesModal from '../UserStoriesModal/UserStoriesModal.jsx'

const UserStories = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [stories, setStories] = useState([])
  const [activeStory, setActiveStory] = useState(null)

  const getStories = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const data = await fetchWithAuth('/insta-share/stories')
      setStories(data.users_stories || [])
      setApiStatus(apiStatusConstants.success)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getStories()
  }, [])

  return (
    <section className="stories-section">
      {apiStatus === apiStatusConstants.inProgress && <LoaderView label="Loading stories" />}
      {apiStatus === apiStatusConstants.failure && <FailureView onRetry={getStories} />}
      {apiStatus === apiStatusConstants.success && (
        <div className="stories-track" aria-label="User stories">
          {stories.map(story => (
            <UserStory key={story.user_id} story={story} onOpen={() => setActiveStory(story)} />
          ))}
        </div>
      )}
      {activeStory && <UserStoriesModal story={activeStory} onClose={() => setActiveStory(null)} />}
    </section>
  )
}

export default UserStories

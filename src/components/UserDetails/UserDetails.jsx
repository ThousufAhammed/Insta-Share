import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {apiStatusConstants} from '../../utils/constants.js'
import {fetchWithAuth} from '../../utils/api.js'
import FailureView from '../FailureView/FailureView.jsx'
import Header from '../Header/Header.jsx'
import LoaderView from '../LoaderView/LoaderView.jsx'
import Profile from '../Profile/Profile.jsx'

const UserDetails = () => {
  const {userId} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profile, setProfile] = useState(null)

  const getProfile = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const data = await fetchWithAuth(`/insta-share/users/${userId}`)
      setProfile(data.user_details)
      setApiStatus(apiStatusConstants.success)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProfile()
  }, [userId])

  return (
    <>
      <Header />
      <main className="page-shell">
        {apiStatus === apiStatusConstants.inProgress && <LoaderView label="Loading user profile" />}
        {apiStatus === apiStatusConstants.failure && <FailureView onRetry={getProfile} />}
        {apiStatus === apiStatusConstants.success && profile && <Profile profile={profile} />}
      </main>
    </>
  )
}

export default UserDetails

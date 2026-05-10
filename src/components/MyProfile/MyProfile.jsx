import {useEffect, useState} from 'react'
import {apiStatusConstants} from '../../utils/constants.js'
import {fetchWithAuth} from '../../utils/api.js'
import FailureView from '../FailureView/FailureView.jsx'
import Header from '../Header/Header.jsx'
import LoaderView from '../LoaderView/LoaderView.jsx'
import Profile from '../Profile/Profile.jsx'

const MyProfile = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profile, setProfile] = useState(null)

  const getProfile = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const data = await fetchWithAuth('/insta-share/my-profile')
      setProfile(data.profile)
      setApiStatus(apiStatusConstants.success)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <Header />
      <main className="page-shell">
        {apiStatus === apiStatusConstants.inProgress && <LoaderView label="Loading profile" />}
        {apiStatus === apiStatusConstants.failure && <FailureView onRetry={getProfile} />}
        {apiStatus === apiStatusConstants.success && profile && <Profile profile={profile} title="My Profile" />}
      </main>
    </>
  )
}

export default MyProfile

import {useSearchParams} from 'react-router-dom'
import Header from '../Header/Header.jsx'
import UserStories from '../UserStories/UserStories.jsx'
import PostsList from '../PostsList/PostsList.jsx'

const Home = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  return (
    <>
      <Header />
      <main className="page-shell">
        {!search && <UserStories />}
        <PostsList search={search} />
      </main>
    </>
  )
}

export default Home

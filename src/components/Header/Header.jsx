import {useState} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {FiMenu, FiX} from 'react-icons/fi'
import {Link, NavLink, useNavigate, useSearchParams} from 'react-router-dom'
import {cookieName} from '../../utils/constants.js'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const navigate = useNavigate()

  const submitSearch = event => {
    event.preventDefault()
    const query = searchInput.trim()
    navigate(query ? `/?search=${encodeURIComponent(query)}` : '/')
    setIsMenuOpen(false)
  }

  const logout = () => {
    Cookies.remove(cookieName)
    navigate('/login', {replace: true})
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-link" onClick={() => setIsMenuOpen(false)}>
          <span className="app-logo" role="img" aria-label="website logo">
            Insta Share
          </span>
        </Link>

        <button
          type="button"
          className="icon-button menu-button"
          onClick={() => setIsMenuOpen(value => !value)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <form className="search-form" onSubmit={submitSearch}>
            <input
              type="search"
              placeholder="Search Caption"
              value={searchInput}
              onChange={event => setSearchInput(event.target.value)}
            />
            <button type="submit" aria-label="Search" data-testid="searchIcon">
              <FaSearch />
            </button>
          </form>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/my-profile" onClick={() => setIsMenuOpen(false)}>
            Profile
          </NavLink>
          <button type="button" className="logout-button" onClick={logout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header

import {Link} from 'react-router-dom'
import {images} from '../../utils/constants.js'

const NotFound = () => (
  <main className="not-found-page">
    <img src={images.notFound} alt="page not found" />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found.</p>
    <Link to="/" className="primary-button">
      Home Page
    </Link>
  </main>
)

export default NotFound

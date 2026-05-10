import {images} from '../../utils/constants.js'
import AppImage from '../AppImage/AppImage.jsx'

const FailureView = ({onRetry, message = 'Something went wrong. Please try again'}) => (
  <div className="failure-view">
    <AppImage src={images.failure} alt="failure view" className="failure-image" fallbackVariant="illustration" />
    <p>{message}</p>
    <button type="button" className="primary-button" onClick={onRetry}>
      Try again
    </button>
  </div>
)

export default FailureView

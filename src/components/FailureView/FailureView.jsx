import {images} from '../../utils/constants.js'

const FailureView = ({onRetry, message = 'Something went wrong. Please try again'}) => (
  <div className="failure-view">
    <img src={images.failure} alt="failure view" className="failure-image" />
    <p>{message}</p>
    <button type="button" className="primary-button" onClick={onRetry}>
      Try again
    </button>
  </div>
)

export default FailureView

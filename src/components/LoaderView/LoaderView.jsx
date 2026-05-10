const LoaderView = ({label = 'Loading'}) => (
  <div className="loader-view" role="status" aria-label={label}>
    <span className="loader-ring" />
  </div>
)

export default LoaderView

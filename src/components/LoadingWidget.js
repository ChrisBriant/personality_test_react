const LoadingWidget = () => {
  return (
    <div className="spin-container">
        <div className="spin lds-dual-ring"></div>
        <p className="center-text">Loading, please wait...</p>
    </div>
  );
}

export default LoadingWidget;
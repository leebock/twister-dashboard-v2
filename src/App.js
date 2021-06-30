import './App.css';

//const FEATURE_SERVICE_URL = "http://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/Tornados_Points/FeatureServer/0";

function App() {
  return (
      <div className="container-fluid vh-100 d-flex flex-column">
      
          <header className="row mt-4 mb-3">
              <h1 className="h2 d-none d-md-block text-truncate">
              Twister Dashboard: Exploring Three Decades of Violent Storms
              </h1>
              <h1 className="h3 d-md-none">
              Twister Dashboard
              </h1>
              <h2 className="h6 fw-light d-none d-md-block">
              Although tornadoes can occur throughout the year, prime time for twisters in the U.S. is spring and early summer. Larger symbols show more violent tornadoes. Zoom into the map to see approximate tornado tracks.
              </h2>
          </header>
          
          <div className="row flex-grow-1 d-flex flex-column flex-md-row overflow-hidden">

              <div className="flex-shrink-0 col col-xl-4 h-100 d-flex flex-column overflow-hidden bg-warning">
                <h3 className="h4">Chart</h3>
              </div>
              
              <div className="col d-flex flex-column position-relative overflow-hidden bg-info">
                <h3 className="h4">Numbers</h3>
              </div>
              
              <div className="col d-flex flex-column position-relative overflow-hidden bg-success">
                <h3 className="h4">Map</h3>
              </div>
              
          </div>
          
          <footer className="row mt-3 mb-5 mb-md-3">
              <small className="text-muted">This is the footer.</small>
          </footer>

      </div>
  );
}

export default App;

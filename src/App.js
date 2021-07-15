import './App.css';
import {useState, useEffect} from "react";
import {Chart} from './components/Chart/Chart';
import Query from "@arcgis/core/rest/support/Query";
import {executeQueryJSON} from "@arcgis/core/rest/query/executeQueryJSON";
import {TMap} from './components/TMap';

const FEATURE_SERVICE_URL = "http://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/Tornados_Points/FeatureServer/0";

function App() {
    
    const [totals, setTotals] = useState([]);
    const [selected, setSelected] = useState(null);  
    const [twisters, setTwisters] = useState([]);

    useEffect(
        () => {
            fetchTotalsByYear(
                (result)=>{
                    setTotals(result.features.map((feature)=>feature.attributes));
                }
            );            
        },
        []
    );

    useEffect(
        () => {
            if (selected) {
                fetchTwisters(
                    selected.Year,
                    (result)=>{
                        setTwisters(result.features);
                    }
                )            
            }
        },
        [selected]
    );

    function fetchTotalsByYear(callBack)
    {

        var query = new Query();
		query.where = "F_Scale > -9";
        query.orderByFields = ["Year"];
		query.outStatistics = {
            statisticType: "count",
            onStatisticField: "Year", 
            outStatisticFieldName: "totalCount"
        };
		query.groupByFieldsForStatistics = ["Year"];
        executeQueryJSON(FEATURE_SERVICE_URL, query).then(callBack);        	

    }
    
    function fetchTwisters(year, callBack)
    {
        var query = new Query();
		query.where = "F_Scale > -9 and Year = "+year;
        query.outFields = ["*"];
        query.returnGeometry = true;
        executeQueryJSON(FEATURE_SERVICE_URL, query).then(callBack);        	
    }
    
    const selectRecord = (year) => {
        setSelected(totals.filter((record)=>record.Year===year).shift());
    };    

  return (
      <div className="container-fluid vh-100 d-flex flex-column">
      
          <header className="row mt-4 mb-3">
              <h1 className="h2 d-none d-md-block text-truncate pb-2">
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
                <Chart className="flex-grow-1 overflow-auto list-group" 
                        totals={totals}
                        selected={selected}
                        onSelect={selectRecord}/>
              </div>
              
              <div className="col d-flex flex-column position-relative overflow-hidden bg-info">
                <h3 className="h4">Numbers</h3>
                {selected && <div>Year: <strong>{selected.Year}</strong></div>}
                {selected && <div>Count: <strong>{selected.totalCount}</strong></div>}
                {selected && <div>Check: <strong>{twisters.length}</strong></div>}
              </div>
              
              <div className="col d-flex flex-column position-relative overflow-hidden bg-success">
                <h3 className="h4">Map</h3>
                <TMap className="flex-grow-1" twisters={twisters}/>
              </div>
              
          </div>
          
          <footer className="row mt-3 mb-5 mb-md-3">
              <small className="text-muted">This is the footer.</small>
          </footer>

      </div>
  );
}

export default App;

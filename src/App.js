import './App.css';
import {useState, useEffect} from "react";
import {Chart} from './components/Chart/Chart';
import {TMap} from './components/TMap';
import { fetchTotalsByYear, fetchTwisters } from './services/QueryHelpers';

function App() {

    /* totals e.g. [{year: 1950, totalCount: 195}, ...] */
    /* twisters e.g. [
        {
            OBJECTID: 1, Year: 1950, Date: 1/3/1950 12:00:00 AM,
            F_Scale: 3, Injuries: 3, Fatalities: 0, Loss: 6,
            Length_mi: 9.5, Width_yds: 150,
            Starting_Lat: 38.77, Starting_Long:	-90.22, 
            End_Lat: 38.83, End_Long: -90.03
        }, 
        ...] 
    */

    const [totals, setTotals] = useState([]); 
    const [activeYear, setActiveYear] = useState(1950);  
    const [twisters, setTwisters] = useState([]);

    useEffect(()=>{fetchTotalsByYear((result)=>{setTotals(result);});},[]);

    useEffect(
        () => {fetchTwisters(activeYear,(result)=>{setTwisters(result);})},
        [activeYear]
    );
    
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
                        activeYear={activeYear}
                        onSelect={(year)=>{setActiveYear(year)}}/>
                </div>
                
                <div className="col d-flex flex-column position-relative overflow-hidden bg-info">
                <h3 className="h4">Numbers</h3>
                {activeYear && <div>Year: <strong>{activeYear}</strong></div>}
                {activeYear && totals.length && <div>Count: <strong>{totals.filter((item)=>item.Year===activeYear).shift().totalCount}</strong></div>}
                {activeYear && <div>Check: <strong>{twisters.length}</strong></div>}
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

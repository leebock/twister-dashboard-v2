import './App.scss';
import {useState, useEffect} from "react";
import {Chart} from './components/Chart/Chart';
import {TMap} from './components/TMap';
import {Summary} from "./components/Summary";
import {Details} from './components/Details';
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
    const [activeYear, setActiveYear] = useState(2019);  
    const [twisters, setTwisters] = useState([]);
    const [selectedTwister, setSelectedTwister] = useState(null);
    const [extentFilter, setExtentFilter] = useState(null);

    const MIN_YEAR = 1980;
    const MAX_YEAR = 2019;

    useEffect(
        ()=> {
            fetchTotalsByYear(
                MIN_YEAR, 
                MAX_YEAR, 
                extentFilter, 
                (result)=>{setTotals(result);}
            );
        },
        [extentFilter]
    );

    useEffect(
        () => {
            setSelectedTwister(null);
            fetchTwisters(activeYear,(result)=>{setTwisters(result);})
        },
        [activeYear]
    );
    
    const selectTwister = (twister) => {setSelectedTwister(twister);}
    const processExtent = (extent)=>{setExtentFilter(extent);}

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
        
            <header className="row mb-3 flex-shrink-0">
                <h1 className="h3 d-none d-md-block text-truncate pb-2">
                Twister Dashboard: Exploring Four Decades of Violent Storms
                </h1>
                <h1 className="h4 d-md-none">
                Twister Dashboard
                </h1>
                <h2 className="h6 fw-light d-none d-md-block">
                Although tornadoes can occur throughout the year, prime time for twisters in the U.S. is spring and early summer. Larger symbols show more violent tornadoes. Zoom into the map to see approximate tornado tracks.
                </h2>
            </header>
            
            <div id="main">

                <div>
                    <Chart  totals={totals}
                            activeYear={activeYear}
                            onSelect={(year)=>{setActiveYear(year)}}/>
                </div>
                
                <div>
                    <Summary className="flex-1" 
                            year={activeYear}
                            summary={totals.filter((item)=>item.Year===activeYear).shift()}/>
                    <Details className="flex-1" twister={selectedTwister}/>
                </div>
                
                <div>
                    <TMap className="flex-grow-1" 
                        twisters={twisters} 
                        onSelectTwister={selectTwister}
                        onExtentChange={processExtent}/>
                </div>
                
            </div>
            
            <footer className="row mt-3 mb-5 mb-md-3 flex-shrink-0">
                <small className="text-muted">Data source: <a className="text-muted" href="https://www.spc.noaa.gov/gis/svrgis/" rel="noreferrer" target="_blank">NOAA severe report database</a></small>
            </footer>

        </div>
    );
}

export default App;

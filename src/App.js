import './App.scss';
import {useState, useEffect} from "react";
import {Chart} from './components/Chart/Chart';
import {TMap} from './components/TMap';
import {Summary} from "./components/Summary";
import {Details} from './components/Details';
import { fetchTotalsByYear, fetchTwisters } from './services/QueryHelpers';
import {Indicator} from './components/Indicator';
import logo from './resources/esri-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Directions } from './components/Directions';

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
    const [fetchInProgress, setFetchInProgress] = useState(false);
    const [loadInProgress, setLoadInProgress] = useState(false);
    const [showDirections, setShowDirections] = useState(false);

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
            setFetchInProgress(true);
            fetchTwisters(
                activeYear,
                (result)=>{
                    setFetchInProgress(false);
                    setLoadInProgress(true);
                    setTwisters(result);
                }
            )
        },
        [activeYear]
    );
    
    const selectTwister = (twister) => {setSelectedTwister(twister);}
    const processExtent = (extent)=>{setExtentFilter(extent);}
    const handleFinishLoad = ()=>{setLoadInProgress(false);}
    const toggleDirections = ()=>{setShowDirections(!showDirections);}

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
        
            <header className="d-flex mb-3 flex-shrink-0 justify-content-spacebetween">
                <a className="ms-2" href="https://www.esri.com" rel="noreferrer" target="_blank">
                    <img src={logo} alt="Esri logo"/>
                </a>
                <h1 className="text-truncate ms-3 mb-0 pb-1" alt="Twister Dashboard: Exploring Four Decades of Violent Storms"> </h1>
                <div className="flex-shrink-0 flex-grow-1 me-2 align-self-center d-flex justify-content-end">
                    <button onClick={shareFaceBook}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </button>
                    <button onClick={shareTwitter}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </button>
                    <button className="d-none d-md-block" 
                            onClick={toggleDirections}>
                                How to use this app
                    </button>
                    <button className="d-md-none" 
                            onClick={toggleDirections}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                </div>
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
                        onFinishLoad={handleFinishLoad}
                        onSelectTwister={selectTwister}
                        onExtentChange={processExtent}/>
                    <Indicator 
                        fetchInProgress={fetchInProgress} 
                        loadInProgress={loadInProgress}/>
                </div>

                {
                    showDirections && 
                    <Directions 
                        className="position-absolute" 
                        onDismiss={()=>setShowDirections(false)}/>
                }
                
            </div>
            
            <footer className="row mt-3 mb-5 mb-md-3 flex-shrink-0">
                <small className="text-muted">Data source: <a className="text-muted" href="https://www.spc.noaa.gov/gis/svrgis/" rel="noreferrer" target="_blank">NOAA severe report database</a></small>
            </footer>

        </div>
    );
}

const shareFaceBook = ()=>{
    window.open(
        'http://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location),
        '',
        'toolbar=0,status=0,width=626,height=436'
    );
}
const shareTwitter = ()=>{
    const options = 
        'text='+encodeURIComponent(document.head.querySelector('meta[property="og:title"]').content)+ 
        '&url='+encodeURIComponent(window.location)+ 
        '&via='+encodeURIComponent(document.head.querySelector('meta[name="twitter:site"]').content.replace('@',''))+ 
        '&hashtags=twisters';
    window.open(
        'https://twitter.com/intent/tweet?'+options,
        'Tweet',
        'toolbar=0,status=0,width=626,height=436'
    );
}

export default App;

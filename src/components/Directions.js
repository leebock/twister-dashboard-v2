import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

export const Directions = ({className, onDismiss:reportDismiss})=> {
    return (
        <div id="directions" className={className} onClick={()=>{reportDismiss()}}>
            <div>
                <div>
                    <button onClick={()=>reportDismiss()}>
                        <FontAwesomeIcon icon={faWindowClose}/>
                    </button>
                </div>
                <ul onClick={(event)=>event.stopPropagation()}>
                    <li>Larger symbols show more violent tornadoes.</li>
                    <li>Graphs show totals for current map view.</li>
                    <li>Pan and zoom map to explore.</li>
                    <li>Zoom into the map to see approximate tornado tracks.</li>
                    <li>Click on graph to see annual totals.</li>
                    <li>Click on a tornado for stats about individual twisters.</li>
                </ul>
            </div>
        </div>
    );
}
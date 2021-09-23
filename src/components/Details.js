import {getDisplayDate} from "../services/DateFuncs";

export const Details = ({className, twister}) => {
    className = twister ? className : className+" hidden";
    return (
        <div id="details" className={className}>
            {
                twister && 
                (
                <ul>
                    <li>
                        <h3 className="de-emphasized">{getDisplayDate(twister.Date)}</h3>
                        <hr/>
                        <span className="caption">Date</span>
                    </li>
                    <li>
                        <h3 className="emphasized">{twister.F_Scale}</h3>
                        <hr/>
                        <span className="caption">Enhanced Fujita Scale</span>
                    </li>
                    <li>
                        <h3>{Math.round(twister.Length_mi*10)/10}</h3>
                        <hr/>
                        <span className="caption">Length (miles)</span>
                    </li>
                    <li>
                        <h3>{twister.Fatalities}</h3>
                        <hr/>
                        <span className="caption">Fatalities</span>
                    </li>
                    <li>
                        <h3>{twister.Injuries}</h3>
                        <hr/>
                        <span className="caption">Injuries</span>
                    </li>
                    <li>
                        <h3>{Math.round(twister.Loss*100)/100}</h3>
                        <hr/>
                        <span className="caption">Property Loss ($millions)</span>
                    </li>
                </ul>
                )
            }
        </div>
    )
}
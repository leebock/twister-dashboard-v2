export const Details = ({className, twister}) => {
    className = twister ? className : className+" hidden";
    return (
        <div id="details" className={className}>
            {
                twister && 
                (
                <ul>
                    <li>
                        <h3 className="de-emphasized">{new Date(twister.Date).toLocaleDateString()}</h3>
                        <span className="caption">Date</span>
                    </li>
                    <li>
                        <h3 className="emphasized">{twister.F_Scale}</h3>
                        <span className="caption">Enhanced Fujita Scale</span>
                    </li>
                    <li>
                        <h3>{twister.Length_mi}</h3>
                        <span className="caption">Length (miles)</span>
                    </li>
                    <li>
                        <h3>{twister.Injuries}</h3>
                        <span className="caption">Injuries</span>
                    </li>
                    <li>
                        <h3>{twister.Fatalities}</h3>
                        <span className="caption">Fatalities</span>
                    </li>
                    <li>
                        <h3>{twister.Loss}</h3>
                        <span className="caption">Property Loss ($millions)</span>
                    </li>
                </ul>
                )
            }
        </div>
    )
}
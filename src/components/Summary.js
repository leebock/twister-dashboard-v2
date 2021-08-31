export const Summary = ({className, year, summary}) => {
    return (
        <div id="summary" className={className}>
            {
                summary &&
                (
                    <ul>
                        <li>
                            <h3>{year}</h3>
                            <span className="caption">Year</span>
                        </li>
                        <li>
                            <h3 className="emphasized">{summary && summary.totalCount.toLocaleString()}</h3>
                            <hr/>
                            <span className="caption">Total tornadoes</span>
                        </li>
                        <li>
                            <h3>{summary && summary.totalFatalities.toLocaleString()}</h3>
                            <hr/>
                            <span className="caption">Fatalities</span>
                        </li>
                        <li>
                            <h3>{summary && summary.totalInjuries.toLocaleString()}</h3>
                            <hr/>
                            <span className="caption">Injuries</span> 
                        </li>
                        <li>
                            <h3>{summary && parseInt(summary.totalLoss).toLocaleString()}</h3>
                            <hr/>
                            <span className="caption">Property Loss ($millions)</span>        
                        </li>
                    </ul>
                )
            }
        </div>
    );
}
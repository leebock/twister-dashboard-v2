export const Summary = ({className, year, summary}) => {
    return (
        <div id="summary" className={className}>
            {
                summary &&
                (
                    <>
                    <h3>{year}</h3>
                    <span>Year</span>
                    <h3>{summary && summary.totalCount.toLocaleString()}</h3>
                    <hr/>
                    <span>Total tornadoes</span>
                    <h3>{summary && summary.totalInjuries.toLocaleString()}</h3>
                    <hr/>
                    <span>Injuries</span>
                    <h3>{summary && summary.totalFatalities.toLocaleString()}</h3>
                    <hr/>
                    <span>Fatalities</span>
                    <h3>{summary && summary.totalLoss.toLocaleString()}</h3>
                    <hr/>
                    <span>Property Loss ($millions)</span>        
                    </>
                )
            }
        </div>
    );
}
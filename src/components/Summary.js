export const Summary = ({className, summary, twisters}) => {
    const year = twisters.length ? twisters[0].Year : "";
    return (
        <div id="summary" className={className}>
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
        </div>
    );
}
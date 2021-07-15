export const Summary = ({className, summary, twisters}) => {
    const records = twisters.map((twister)=>twister.attributes);
    const year = records.length ? records[0].Year : "";
    const totalInjuries = records.reduce(
        (accumulator, current)=>accumulator+current.Injuries, 0
    );
    const totalFatalities = records.reduce(
        (accumulator, current)=>accumulator+current.Fatalities, 0
    );
    const totalPropertyLoss = records.reduce(
        (accumulator, current)=>accumulator+current.Loss, 0
    );
    return (
        <div className={className}>
            <h3 className="h4">Summary</h3>
            <div>Year:<strong>{year}</strong></div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Calculated</th>
                        <th>From Service</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Tornadoes:</td>
                        <td>{records.length.toLocaleString()}</td>
                        <td>{summary && summary.totalCount.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Injuries</td>
                        <td>{totalInjuries.toLocaleString()}</td>
                        <td>{summary && summary.totalInjuries.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Fatalities</td>
                        <td>{totalFatalities.toLocaleString()}</td>
                        <td>{summary && summary.totalFatalities.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Property Loss ($millions)</td>
                        <td>{totalPropertyLoss.toLocaleString()}</td>
                        <td>{summary && summary.totalLoss.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
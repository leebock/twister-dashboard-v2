export const Details = ({className, twister}) => {
    return (
        <div className={className}>
            <h3 className="h4">Twister Details</h3>
            <table className="table">
                <tbody>
                    <tr>
                        <td>Date:</td>
                        <td>{new Date(twister.Date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td>Enhanced Fujita Scale:</td>
                        <td>{twister.F_Scale}</td>
                    </tr>
                    <tr>
                        <td>Length (miles):</td>
                        <td>{twister.Length_mi}</td>
                    </tr>
                    <tr>
                        <td>Injuries:</td>
                        <td>{twister.Injuries}</td>
                    </tr>
                    <tr>
                        <td>Fatalities:</td>
                        <td>{twister.Fatalities}</td>
                    </tr>
                    <tr>
                        <td>Property Loss ($millions):</td>
                        <td>{twister.Loss}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
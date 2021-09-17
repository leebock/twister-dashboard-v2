export const Indicator = ({fetchInProgress, loadInProgress}) => {
    return (
        (fetchInProgress || loadInProgress) && <div id="indicator"></div>
    )
}
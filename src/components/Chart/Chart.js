export const Chart = ({totals, className, activeYear, onSelect: reportYear}) => {
    const handleButtonClick = (event) => {
        reportYear(parseInt(event.currentTarget.firstChild.textContent.trim()));
    }
    const max = totals.reduce(
        (accumulator, current)=>{
            if (current.totalCount > accumulator) {
                accumulator = current.totalCount;
            } 
            return accumulator;
        }, 
        Number.MIN_SAFE_INTEGER
    );
    return (
        <div id="chart">
            <div id="col1">
                {
                    totals.map(
                        (item, index)=>{
                            return item.Year % 5 === 0 && 
                            <label style={{top: ((index/totals.length)*100)+"%"}}><small>{item.Year}</small></label>
                        }
                    )
                }
            </div>
            <div id="col2" className="flex-grow-1 list-group overflow-hidden">
                {
                totals.map(
                    (item, index)=>{
                        return (
                            <button className={
                                "overflow-hidden flex-1 list-group-item list-group-item-action d-flex pt-0 pb-0 align-items-center"+
                                (item.Year === activeYear ? " active" : "")
                                }
                                key={item.Year}
                                onClick={handleButtonClick}>
                                <div style={{"width":"60px"}}>
                                    <small className="align-middle">{item.Year}</small>
                                </div>
                                <div className="flex-grow-1 d-flex h-100">
                                    <div className="bg-info ps-1 p-0 d-flex align-items-center justify-content-end" 
                                        style={{
                                            "flexBasis": max ? ((item.totalCount/max)*100)+"%" : "0%", 
                                            "transition": "flex-basis 500ms"
                                            }}>
                                        <small>{item.totalCount}</small>
                                    </div>
                                </div>                            
                            </button>
                        )
                    }
                )
                }
            </div>
        </div>    
    );
}
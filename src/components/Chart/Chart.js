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
        <div className={className}>
        {
            totals.map(
                (item, index)=>{
                    return (
                        <button className={
                            "overflow-hidden flex-1 list-group-item list-group-item-action d-flex pt-0 pb-0 pt-lg-1 pb-lg-1 align-items-center"+
                            (item.Year === activeYear ? " active" : "")
                            }
                            key={item.Year}
                            onClick={handleButtonClick}>
                            <div style={{"width":"60px"}}>
                                <small className={"align-middle"+(index % 5 ? " d-none d-lg-block" : "d-block")}>{item.Year}</small>
                            </div>
                            <div className="flex-grow-1 d-flex h-100">
                                <div className="bg-info ps-1 p-0 d-flex align-items-center justify-content-end" 
                                    style={{"flexBasis": ((item.totalCount/max)*100)+"%"}}>
                                    <small>{item.totalCount}</small>
                                </div>
                            </div>                            
                        </button>
                    )
                }
            )
        }
        </div>    
    );
}
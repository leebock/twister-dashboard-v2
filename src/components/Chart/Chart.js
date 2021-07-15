export const Chart = ({totals, className, activeYear, onSelect: reportYear}) => {
    const handleButtonClick = (event) => {
        reportYear(parseInt(event.target.textContent.split(":").shift().trim()));
    }
    return (
        <div className={className}>
        {
            totals.map(
                (item)=>{
                    return (
                        <button className={
                            "list-group-item list-group-item-action"+
                            (item.Year === activeYear ? " active" : "")
                        } 
                        key={item.Year}
                        onClick={handleButtonClick}>
                        {item.Year}: {item.totalCount}
                        </button>
                    )
                }
            )
        }
        </div>    
    );
}
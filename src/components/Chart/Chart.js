export const Chart = ({totals, className, selected, onSelect: reportSelected}) => {
    const handleButtonClick = (event) => {
        reportSelected(event.target.textContent.split(":").shift().trim());
    }
    return (
        <div className={className}>
        {
            totals.map(
                (item)=>
                <button className={
                            "list-group-item list-group-item-action"+
                            (item === selected ? " active" : "")
                        } 
                        key={item.Year}
                        onClick={handleButtonClick}>
                        {item.Year}: {item.totalCount}
                        </button>
            )
        }
        </div>    
    );
}
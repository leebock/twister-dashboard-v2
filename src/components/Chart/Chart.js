export const Chart = ({summary, className}) => {
    return (
        <ul className={className}>
        {
            summary.map(
                (item)=>
                <li key={item.Year}>{item.Year}: {item.totalCount}</li>
            )
        }
        </ul>    
    );
}
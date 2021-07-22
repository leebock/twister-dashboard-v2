export function fetchTotalsByYear(data)
{
    return data.reduce(
        (accumulator, current)=>{
            const year = new Date(current.Date).getFullYear();
            const summary = accumulator.filter((item)=>item.Year===year).shift();
            if (summary) {
                summary.totalCount++;
                summary.totalInjuries = summary.totalInjuries + current.Injuries;
                summary.totalFatalities = summary.totalFatalities + current.Fatalities;
                summary.totalLoss = summary.totalLoss + current.Loss;
        } else {
                accumulator.push({
                    Year: year, 
                    totalCount: 1,
                    totalInjuries: current.Injuries,
                    totalFatalities: current.Fatalities,
                    totalLoss: current.Loss
                });
            }
            return accumulator;
        },
        []
    )
}

export function fetchTwisters(data, year)
{
    console.log("fetching twisters for ", year)
    return data
        .filter((item)=>parseInt(new Date(item.Date).getFullYear())===year)
        .sort((a,b)=>a.F_Scale > b.F_Scale ? 1 : (a.F_Scale < b.F_Scale ? -1 : 0));
}

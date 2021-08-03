import Query from "@arcgis/core/rest/support/Query";
import {executeQueryJSON} from "@arcgis/core/rest/query/executeQueryJSON";

const FEATURE_SERVICE_URL = "http://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/Tornados_Points/FeatureServer/0";

export function fetchTotalsByYear(minYear, maxYear, extent, callBack)
{
    const years = [];
    for (var i=minYear; i<=maxYear;i++) {years.push(i);}
    var query = new Query();
    query.where = "F_Scale > -9"+
    " AND Year in ("+years.map((year)=>"'"+year+"'").join()+")";
    if (extent) {
        query.where = query.where+
        " AND Starting_Lat >= "+extent.ymin+
        " AND Starting_Long >= "+extent.xmin+
        " AND Starting_Lat <= "+extent.ymax+
        " AND Starting_Long <= "+extent.xmax        
    }
    query.orderByFields = ["Year"];
    query.outStatistics = [
        {
            statisticType: "count",
            onStatisticField: "Year", 
            outStatisticFieldName: "totalCount"
        },
        {
            statisticType: "sum",
            onStatisticField: "Injuries", 
            outStatisticFieldName: "totalInjuries"
        },
        {
            statisticType: "sum",
            onStatisticField: "Fatalities", 
            outStatisticFieldName: "totalFatalities"
        },
        {
            statisticType: "sum",
            onStatisticField: "Loss", 
            outStatisticFieldName: "totalLoss"
        }
    ];
    query.groupByFieldsForStatistics = ["Year"];

    executeQueryJSON(FEATURE_SERVICE_URL, query)
        .then(
            (result)=>{
                // reduce results to array of attributes (and force Year to int)
                result = result.features
                    .map((feature)=>feature.attributes)
                    .map((attributes)=>({
                        ...attributes, Year: parseInt(attributes.Year)
                    }));
                // this last bit adds years for which totals are zero, since 
                // those years dont't get returned from sql query
                callBack(
                    years.map(
                        (year)=>
                            result.filter((item)=>item.Year === year).shift() ||
                            {
                                Year: year, 
                                totalCount: 0, 
                                totalInjuries: 0, 
                                totalFatalities: 0, 
                                totalLoss: 0
                            }
                    )
                );
            }
        );        	

}

export function fetchTwisters(year, callBack)
{
    var query = new Query();
    query.where = "F_Scale > -9 and Year = "+year;
    query.orderByFields = ["F_Scale"];
    query.outFields = [
        "OBJECTID", "Year", "Date", 
        "F_Scale", "Injuries", "Fatalities", "Loss", 
        "Starting_Lat", "Starting_Long", 
        "End_Lat", "End_Long", 
        "Length_mi", "Width_yds"
    ];
    query.returnGeometry = false;
    executeQueryJSON(FEATURE_SERVICE_URL, query)
        .then(
            (result)=>{
                callBack(result.features.map((feature)=>feature.attributes));
            }
        );        	
}

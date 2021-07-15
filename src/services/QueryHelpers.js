import Query from "@arcgis/core/rest/support/Query";
import {executeQueryJSON} from "@arcgis/core/rest/query/executeQueryJSON";

const FEATURE_SERVICE_URL = "http://services.arcgis.com/nzS0F0zdNLvs7nc8/ArcGIS/rest/services/Tornados_Points/FeatureServer/0";

export function fetchTotalsByYear(callBack)
{

    var query = new Query();
    query.where = "F_Scale > -9";
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
                callBack(
                    result.features
                    .map((feature)=>feature.attributes)
                    .map((attributes)=>({
                        ...attributes, Year: parseInt(attributes.Year)
                    }))                        
                );
            }
        );        	

}

export function fetchTwisters(year, callBack)
{
    var query = new Query();
    query.where = "F_Scale > -9 and Year = "+year;
    query.outFields = [
        "OBJECTID", "Year", "Date", 
        "F_Scale", "Injuries", "Fatalities", "Loss", 
        "Starting_Lat", "Starting_Long", 
        "End_Lat", "End_Long", 
        "Length_mi", "Width_yds"
    ];
    query.returnGeometry = true;
    executeQueryJSON(FEATURE_SERVICE_URL, query)
        .then(
            (result)=>{
                callBack(result.features);
            }
        );        	
}

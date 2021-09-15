import Query from "@arcgis/core/rest/support/Query";
import {executeQueryJSON} from "@arcgis/core/rest/query/executeQueryJSON";

const FEATURE_SERVICE_URL = "https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/1950_2019_torn_initpoint/FeatureServer/0";

export function fetchTotalsByYear(minYear, maxYear, extent, callBack)
{
    const years = [];
    for (var i=minYear; i<=maxYear;i++) {years.push(i);}
    var query = new Query();
    query.where = "mag > -9"+
    " AND yr in ("+years.map((year)=>"'"+year+"'").join()+")";
    if (extent) {
        query.where = query.where+
        " AND slat >= "+extent.ymin+
        " AND slon >= "+extent.xmin+
        " AND slat <= "+extent.ymax+
        " AND slon <= "+extent.xmax        
    }
    query.orderByFields = ["yr"];
    query.outStatistics = [
        {
            statisticType: "count",
            onStatisticField: "yr", 
            outStatisticFieldName: "totalCount"
        },
        {
            statisticType: "sum",
            onStatisticField: "inj", 
            outStatisticFieldName: "totalInjuries"
        },
        {
            statisticType: "sum",
            onStatisticField: "fat", 
            outStatisticFieldName: "totalFatalities"
        },
        {
            statisticType: "sum",
            onStatisticField: "loss", 
            outStatisticFieldName: "totalLoss"
        }
    ];
    query.groupByFieldsForStatistics = ["yr"];

    executeQueryJSON(FEATURE_SERVICE_URL, query)
        .then(
            (result)=>{
                // reduce results to array of attributes (and force Year to int)
                result = result.features
                    .map((feature)=>feature.attributes)
                    .map((attributes)=>({
                        ...attributes, 
                        Year: parseInt(attributes.yr),
                        totalLoss: parseInt(attributes.yr) < 2016 ? 
                                    attributes.totalLoss : 
                                    attributes.totalLoss / 1000000 
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
    query.where = "mag > -9 and yr = "+year;
    query.orderByFields = ["mag"];
    query.outFields = ["*"];
    query.returnGeometry = false;
    executeQueryJSON(FEATURE_SERVICE_URL, query)
        .then(
            (result)=>{
                callBack(
                    result.features.map((feature)=>convert(feature.attributes))
                );
            }
        );        	
}

function convert(attributes)
{
    return {
        OBJECTID: attributes.OBJECTID,
        Year: attributes.yr,
        Date: attributes.date,
        F_Scale: attributes.mag,
        Injuries: attributes.inj,
        Loss: parseInt(attributes.yr) < 2016 ? attributes.loss : attributes.loss / 1000000,
        Starting_Lat: attributes.slat,
        Starting_Long: attributes.slon,
        End_Lat: attributes.elat,
        End_Long: attributes.elon,
        Length_mi: attributes.len,
        Width_yds: attributes.wid
    }
    
}

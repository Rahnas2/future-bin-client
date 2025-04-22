import { districtPerformanceType } from "./districtPerformaceType"
import { pickupRequestTrendType } from "./pickupRequestTrendType"
import { topCitiesType } from "./topCitiesType"

export interface pickupRequestAnalyticsType {
    trends: pickupRequestTrendType [] 
    districtPerformance: districtPerformanceType [],
    topCities: topCitiesType []
}
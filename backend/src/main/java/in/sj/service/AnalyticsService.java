package in.sj.service;

import in.sj.dto.AnalyticsResponse;

public interface AnalyticsService {

    AnalyticsResponse getAnalytics(String username);
}
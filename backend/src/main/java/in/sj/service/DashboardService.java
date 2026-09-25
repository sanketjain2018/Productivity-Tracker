package in.sj.service;

import in.sj.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(String username);
}
package in.sj.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnalyticsResponse {

    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private long inProgressTasks;

    private double completionPercentage;
}
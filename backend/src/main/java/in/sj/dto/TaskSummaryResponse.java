package in.sj.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskSummaryResponse {

    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private int progress;
}
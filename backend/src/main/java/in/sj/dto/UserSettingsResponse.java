package in.sj.dto;

import in.sj.entity.TaskPriority;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSettingsResponse {

    private TaskPriority defaultPriority;

    private boolean showCompletedTasks;
}
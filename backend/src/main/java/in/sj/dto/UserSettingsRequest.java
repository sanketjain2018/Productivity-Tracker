package in.sj.dto;

import in.sj.entity.TaskPriority;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSettingsRequest {

    @NotNull(message = "Default priority is required")
    private TaskPriority defaultPriority;

    @NotNull(message = "Show completed tasks value is required")
    private Boolean showCompletedTasks;
}
package in.sj.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import in.sj.entity.TaskPriority;
import in.sj.entity.TaskStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private LocalDate dueDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
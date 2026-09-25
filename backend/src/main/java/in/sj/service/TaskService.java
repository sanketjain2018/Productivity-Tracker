package in.sj.service;

import java.time.LocalDate;
import java.util.List;

import in.sj.dto.TaskRequest;
import in.sj.dto.TaskResponse;
import in.sj.dto.TaskSummaryResponse;

public interface TaskService {

    TaskResponse createTask(
            TaskRequest request,
            String username
    );

    List<TaskResponse> getMyTasks(
            String username
    );

    TaskResponse getTaskById(
            Long taskId,
            String username
    );

    TaskResponse updateTask(
            Long taskId,
            TaskRequest request,
            String username
    );

    void deleteTask(
            Long taskId,
            String username
    );

    TaskResponse completeTask(
            Long taskId,
            String username
    );
    
    TaskSummaryResponse getTaskSummary(String username);

    List<TaskResponse> getTodayTasks(String username);

    List<TaskResponse> getTasksByDate(
            LocalDate date,
            String username
    );
}
package in.sj.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.TaskRequest;
import in.sj.dto.TaskResponse;
import in.sj.dto.TaskSummaryResponse;
import in.sj.entity.Task;
import in.sj.entity.TaskPriority;
import in.sj.entity.TaskStatus;
import in.sj.entity.User;
import in.sj.exception.TaskNotFoundException;
import in.sj.repository.TaskRepository;
import in.sj.repository.UserRepository;
import in.sj.service.TaskService;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public TaskResponse createTask(
            TaskRequest request,
            String username) {

        User user = getUser(username);

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        task.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : TaskStatus.TODO
        );

        task.setPriority(
                request.getPriority() != null
                        ? request.getPriority()
                        : TaskPriority.MEDIUM
        );

        task.setDueDate(request.getDueDate());

        task.setUser(user);

        Task savedTask = taskRepository.save(task);

        return mapToResponse(savedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getMyTasks(String username) {

        User user = getUser(username);

        return taskRepository
                .findByUserIdOrderByDueDateAsc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TaskResponse getTaskById(
            Long taskId,
            String username) {

        User user = getUser(username);

        Task task = taskRepository
                .findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        return mapToResponse(task);
    }

    @Override
    @Transactional
    public TaskResponse updateTask(
            Long taskId,
            TaskRequest request,
            String username) {

        User user = getUser(username);

        Task task = taskRepository
                .findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());

        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }

        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }

        Task updatedTask = taskRepository.save(task);

        return mapToResponse(updatedTask);
    }

    @Override
    @Transactional
    public void deleteTask(
            Long taskId,
            String username) {

        User user = getUser(username);

        Task task = taskRepository
                .findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        taskRepository.delete(task);
    }

    @Override
    @Transactional
    public TaskResponse completeTask(
            Long taskId,
            String username) {

        User user = getUser(username);

        Task task = taskRepository
                .findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));

        task.setStatus(TaskStatus.COMPLETED);

        Task updatedTask = taskRepository.save(task);

        return mapToResponse(updatedTask);
    }

    private User getUser(String username) {

        return userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new TaskNotFoundException("User not found"));
    }

    private TaskResponse mapToResponse(Task task) {

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
    
    @Override
    @Transactional(readOnly = true)
    public TaskSummaryResponse getTaskSummary(String username) {

        User user = getUser(username);

        long totalTasks =
                taskRepository.countByUserId(user.getId());

        long completedTasks =
                taskRepository.countByUserIdAndStatus(
                        user.getId(),
                        TaskStatus.COMPLETED
                );

        long pendingTasks =
                totalTasks - completedTasks;

        int progress = totalTasks == 0
                ? 0
                : (int) Math.round(
                        (completedTasks * 100.0) / totalTasks
                );

        return TaskSummaryResponse.builder()
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .progress(progress)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getTodayTasks(String username) {

        User user = getUser(username);

        LocalDate today = LocalDate.now();

        return taskRepository
                .findByUserIdAndDueDateOrderByDueDateAsc(
                        user.getId(),
                        today
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

	@Override
	@Transactional(readOnly = true)
	public List<TaskResponse> getTasksByDate(
	        LocalDate date,
	        String username) {

	    User user = getUser(username);

	    return taskRepository
	            .findByUserIdAndDueDateOrderByDueDateAsc(
	                    user.getId(),
	                    date
	            )
	            .stream()
	            .map(this::mapToResponse)
	            .toList();
	}
    
}
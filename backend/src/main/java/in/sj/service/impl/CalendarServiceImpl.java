package in.sj.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.TaskResponse;
import in.sj.entity.Task;
import in.sj.entity.User;
import in.sj.repository.TaskRepository;
import in.sj.repository.UserRepository;
import in.sj.service.CalendarService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

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

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getTasksByDateRange(
            LocalDate startDate,
            LocalDate endDate,
            String username) {

        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException(
                    "Start date cannot be after end date"
            );
        }

        User user = getUser(username);

        return taskRepository
                .findByUserIdAndDueDateBetweenOrderByDueDateAsc(
                        user.getId(),
                        startDate,
                        endDate
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private User getUser(String username) {

        return userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
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
}
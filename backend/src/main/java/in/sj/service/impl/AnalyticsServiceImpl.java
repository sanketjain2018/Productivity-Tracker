package in.sj.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.AnalyticsResponse;
import in.sj.entity.TaskStatus;
import in.sj.entity.User;
import in.sj.repository.TaskRepository;
import in.sj.repository.UserRepository;
import in.sj.service.AnalyticsService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Override
    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalytics(String username) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Long userId = user.getId();

        long total =
                taskRepository.countByUserId(userId);

        long completed =
                taskRepository.countByUserIdAndStatus(
                        userId,
                        TaskStatus.COMPLETED
                );

        long inProgress =
                taskRepository.countByUserIdAndStatus(
                        userId,
                        TaskStatus.IN_PROGRESS
                );

        long pending =
                total - completed - inProgress;

        double completionPercentage =
                total == 0
                        ? 0.0
                        : ((double) completed / total) * 100;

        return AnalyticsResponse.builder()
                .totalTasks(total)
                .completedTasks(completed)
                .pendingTasks(pending)
                .inProgressTasks(inProgress)
                .completionPercentage(
                        Math.round(completionPercentage * 100.0) / 100.0
                )
                .build();
    }
}
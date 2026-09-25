package in.sj.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.DashboardResponse;
import in.sj.entity.TaskStatus;
import in.sj.entity.User;
import in.sj.repository.TaskRepository;
import in.sj.repository.UserRepository;
import in.sj.service.DashboardService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboard(String username) {

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Long userId = user.getId();

        long totalTasks =
                taskRepository.countByUserId(userId);

        long completedTasks =
                taskRepository.countByUserIdAndStatus(
                        userId,
                        TaskStatus.COMPLETED
                );

        long inProgressTasks =
                taskRepository.countByUserIdAndStatus(
                        userId,
                        TaskStatus.IN_PROGRESS
                );

        long pendingTasks =
                totalTasks - completedTasks - inProgressTasks;

        return DashboardResponse.builder()
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .inProgressTasks(inProgressTasks)
                .build();
    }
}
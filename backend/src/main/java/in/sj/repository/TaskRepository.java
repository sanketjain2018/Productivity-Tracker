package in.sj.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.sj.entity.Task;
import in.sj.entity.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdOrderByDueDateAsc(Long userId);

    Optional<Task> findByIdAndUserId(Long taskId, Long userId);

    long countByUserId(Long userId);

    long countByUserIdAndStatus(
            Long userId,
            TaskStatus status
    );
    
    List<Task> findByUserIdAndDueDateOrderByDueDateAsc(
            Long userId,
            LocalDate dueDate
    );

    List<Task> findByUserIdAndDueDateBetweenOrderByDueDateAsc(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );
    
    
}
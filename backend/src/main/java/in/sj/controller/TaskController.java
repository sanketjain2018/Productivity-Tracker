package in.sj.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.sj.dto.TaskRequest;
import in.sj.dto.TaskResponse;
import in.sj.dto.TaskSummaryResponse;
import in.sj.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {

        String username = authentication.getName();

        TaskResponse response =
                taskService.createTask(request, username);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getMyTasks(
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.getMyTasks(username)
        );
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long taskId,
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.getTaskById(taskId, username)
        );
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.updateTask(
                        taskId,
                        request,
                        username
                )
        );
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            Authentication authentication) {

        String username = authentication.getName();

        taskService.deleteTask(taskId, username);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{taskId}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @PathVariable Long taskId,
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.completeTask(
                        taskId,
                        username
                )
        );
    }
    
    
    @GetMapping("/summary")
    public ResponseEntity<TaskSummaryResponse> getTaskSummary(
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.getTaskSummary(username)
        );
    }
    
    
    
    @GetMapping("/today")
    public ResponseEntity<List<TaskResponse>> getTodayTasks(
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.getTodayTasks(username)
        );
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<List<TaskResponse>> getTasksByDate(
            @PathVariable LocalDate date,
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                taskService.getTasksByDate(
                        date,
                        username
                )
        );
    }
    
    
    
    
    
    
    
}
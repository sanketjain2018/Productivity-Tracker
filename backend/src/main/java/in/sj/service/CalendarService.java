package in.sj.service;

import java.time.LocalDate;
import java.util.List;

import in.sj.dto.TaskResponse;

public interface CalendarService {

    List<TaskResponse> getTasksByDate(
            LocalDate date,
            String username
    );

    List<TaskResponse> getTasksByDateRange(
            LocalDate startDate,
            LocalDate endDate,
            String username
    );
}
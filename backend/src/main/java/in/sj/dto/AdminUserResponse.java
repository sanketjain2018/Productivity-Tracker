package in.sj.dto;

import java.time.LocalDateTime;

import in.sj.entity.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminUserResponse {

    private Long id;
    private String username;
    private String email;
    private Role role;
    private boolean enabled;
    private LocalDateTime createdAt;
}
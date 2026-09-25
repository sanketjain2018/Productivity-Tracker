package in.sj.dto;

import in.sj.entity.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProfileResponse {

    private Long id;
    private String username;
    private String email;
    private Role role;
    private boolean enabled;
}
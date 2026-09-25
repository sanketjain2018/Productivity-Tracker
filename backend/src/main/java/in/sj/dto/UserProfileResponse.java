package in.sj.dto;

import java.time.LocalDateTime;

import in.sj.entity.Role;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private Long id;

    private String username;

    private String email;

    private String name;

    private String phone;

    private String occupation;

    private String bio;

    private String profileImage;

    private Role role;

    private boolean enabled;

    private LocalDateTime memberSince;
}
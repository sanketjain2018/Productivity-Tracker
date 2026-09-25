package in.sj.service;

import in.sj.dto.LoginRequest;
import in.sj.dto.LoginResponse;
import in.sj.dto.RegisterRequest;
import in.sj.dto.UpdateUserRequest;
import in.sj.dto.UserProfileResponse;
import in.sj.dto.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    UserProfileResponse getCurrentUser(String username);

    UserProfileResponse updateCurrentUser(
            String username,
            UpdateUserRequest request
    );
}
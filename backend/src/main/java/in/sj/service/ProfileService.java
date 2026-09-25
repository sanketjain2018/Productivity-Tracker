package in.sj.service;

import in.sj.dto.ChangePasswordRequest;
import in.sj.dto.ProfileResponse;
import in.sj.dto.UpdateProfileRequest;

public interface ProfileService {

    ProfileResponse getProfile(String username);

    ProfileResponse updateProfile(
            String username,
            UpdateProfileRequest request
    );

    void changePassword(
            String username,
            ChangePasswordRequest request
    );
}
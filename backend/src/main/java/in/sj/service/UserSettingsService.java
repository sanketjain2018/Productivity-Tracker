package in.sj.service;

import in.sj.dto.UserSettingsRequest;
import in.sj.dto.UserSettingsResponse;

public interface UserSettingsService {

    UserSettingsResponse getSettings(String username);

    UserSettingsResponse updateSettings(
            String username,
            UserSettingsRequest request
    );
}
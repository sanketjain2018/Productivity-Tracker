package in.sj.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.UserSettingsRequest;
import in.sj.dto.UserSettingsResponse;
import in.sj.entity.User;
import in.sj.entity.UserSettings;
import in.sj.repository.UserRepository;
import in.sj.repository.UserSettingsRepository;
import in.sj.service.UserSettingsService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSettingsServiceImpl implements UserSettingsService {

    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;

    @Override
    @Transactional(readOnly = true)
    public UserSettingsResponse getSettings(String username) {

        User user = getUser(username);

        UserSettings settings = userSettingsRepository
                .findByUserId(user.getId())
                .orElseGet(() -> createDefaultSettings(user));

        return mapToResponse(settings);
    }

    @Override
    public UserSettingsResponse updateSettings(
            String username,
            UserSettingsRequest request) {

        User user = getUser(username);

        UserSettings settings = userSettingsRepository
                .findByUserId(user.getId())
                .orElseGet(() -> createDefaultSettings(user));

        settings.setDefaultPriority(request.getDefaultPriority());
        settings.setShowCompletedTasks(request.getShowCompletedTasks());

        UserSettings savedSettings =
                userSettingsRepository.save(settings);

        return mapToResponse(savedSettings);
    }

    private UserSettings createDefaultSettings(User user) {

        UserSettings settings = UserSettings.builder()
                .user(user)
                .build();

        return userSettingsRepository.save(settings);
    }

    private User getUser(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private UserSettingsResponse mapToResponse(
            UserSettings settings) {

        return UserSettingsResponse.builder()
                .defaultPriority(settings.getDefaultPriority())
                .showCompletedTasks(settings.isShowCompletedTasks())
                .build();
    }
}
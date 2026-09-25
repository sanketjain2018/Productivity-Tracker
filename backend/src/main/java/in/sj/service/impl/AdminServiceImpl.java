package in.sj.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.AdminUserResponse;
import in.sj.entity.User;
import in.sj.repository.UserRepository;
import in.sj.service.AdminService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AdminUserResponse> getAllUsers() {

        return userRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AdminUserResponse getUser(Long userId) {

        User user = getUserById(userId);

        return mapToResponse(user);
    }

    @Override
    @Transactional
    public void enableUser(Long userId) {

        User user = getUserById(userId);

        user.setEnabled(true);

        userRepository.save(user);
    }

    @Override
    @Transactional
    public void disableUser(Long userId) {

        User user = getUserById(userId);

        user.setEnabled(false);

        userRepository.save(user);
    }

    private User getUserById(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private AdminUserResponse mapToResponse(User user) {

        return AdminUserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .enabled(user.isEnabled())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
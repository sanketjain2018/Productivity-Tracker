package in.sj.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import in.sj.dto.LoginRequest;
import in.sj.dto.LoginResponse;
import in.sj.dto.RegisterRequest;
import in.sj.dto.UpdateUserRequest;
import in.sj.dto.UserProfileResponse;
import in.sj.dto.UserResponse;
import in.sj.entity.Role;
import in.sj.entity.User;
import in.sj.exception.DuplicateUserException;
import in.sj.repository.UserRepository;
import in.sj.security.JwtService;
import in.sj.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateUserException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateUserException("Email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(Role.USER);
        user.setEnabled(true);

        // Profile defaults
        user.setName(request.getUsername());
        user.setPhone(null);
        user.setOccupation(null);
        user.setBio(null);
        user.setProfileImage(null);

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .enabled(savedUser.isEnabled())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        String token = jwtService.generateToken(username);

        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUser(String username) {

        User user = getUserByUsername(username);

        return mapToProfileResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateCurrentUser(
            String username,
            UpdateUserRequest request
    ) {

        User user = getUserByUsername(username);

        String requestedEmail = request.getEmail().trim();

        if (!user.getEmail().equalsIgnoreCase(requestedEmail)
                && userRepository.existsByEmail(requestedEmail)) {

            throw new DuplicateUserException(
                    "Email already exists"
            );
        }

        user.setName(request.getName().trim());
        user.setEmail(requestedEmail);

        user.setPhone(
                normalizeValue(request.getPhone())
        );

        user.setOccupation(
                normalizeValue(request.getOccupation())
        );

        user.setBio(
                normalizeValue(request.getBio())
        );

        user.setProfileImage(
                normalizeValue(request.getProfileImage())
        );

        User updatedUser = userRepository.save(user);

        return mapToProfileResponse(updatedUser);
    }

    private User getUserByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    private String normalizeValue(String value) {

        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        return value.trim();
    }

    private UserProfileResponse mapToProfileResponse(User user) {

        String displayName = user.getName();

        if (displayName == null || displayName.isBlank()) {
            displayName = user.getUsername();
        }

        return UserProfileResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(displayName)
                .phone(user.getPhone())
                .occupation(user.getOccupation())
                .bio(user.getBio())
                .profileImage(user.getProfileImage())
                .role(user.getRole())
                .enabled(user.isEnabled())
                .memberSince(user.getCreatedAt())
                .build();
    }
}
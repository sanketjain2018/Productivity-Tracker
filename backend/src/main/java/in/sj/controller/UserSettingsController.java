package in.sj.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import in.sj.dto.UserSettingsRequest;
import in.sj.dto.UserSettingsResponse;
import in.sj.service.UserSettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users/settings")
@RequiredArgsConstructor
@Validated
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    @GetMapping
    public ResponseEntity<UserSettingsResponse> getSettings(
            Authentication authentication) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                userSettingsService.getSettings(username)
        );
    }

    @PutMapping
    public ResponseEntity<UserSettingsResponse> updateSettings(
            Authentication authentication,
            @Valid @RequestBody UserSettingsRequest request) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                userSettingsService.updateSettings(
                        username,
                        request
                )
        );
    }
}
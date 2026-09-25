package in.sj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.sj.entity.UserSettings;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {

    Optional<UserSettings> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
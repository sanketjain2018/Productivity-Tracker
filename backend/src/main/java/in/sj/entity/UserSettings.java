package in.sj.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "user_settings",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "user_id")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private TaskPriority defaultPriority = TaskPriority.MEDIUM;

    @Column(nullable = false)
    @Builder.Default
    private boolean showCompletedTasks = true;
}
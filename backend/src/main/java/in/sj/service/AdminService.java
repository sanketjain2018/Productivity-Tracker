package in.sj.service;

import java.util.List;

import in.sj.dto.AdminUserResponse;

public interface AdminService {

    List<AdminUserResponse> getAllUsers();

    AdminUserResponse getUser(Long userId);

    void enableUser(Long userId);

    void disableUser(Long userId);
}
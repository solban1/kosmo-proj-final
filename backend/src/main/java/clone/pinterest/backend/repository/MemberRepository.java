package clone.pinterest.backend.repository;

import org.springframework.data.repository.CrudRepository;
// import org.springframework.security.access.prepost.PreAuthorize;

import clone.pinterest.backend.domain.Member;

// @PreAuthorize("hasRole('USER')")
public interface MemberRepository extends CrudRepository<Member, String> {
    boolean existsByIdAndPwd(String id, String pwd);
}

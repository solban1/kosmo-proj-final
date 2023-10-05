package clone.pinterest.backend.repository;

import org.springframework.data.repository.CrudRepository;
// import org.springframework.security.access.prepost.PreAuthorize;

import clone.pinterest.backend.domain.Pin;

// @PreAuthorize("permitAll")
public interface PinRepository extends CrudRepository<Pin, Integer> {

}

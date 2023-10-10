package clone.pinterest.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import clone.pinterest.backend.domain.Tag;
import clone.pinterest.backend.domain.TagId;

@RepositoryRestResource
public interface TagRepository extends JpaRepository<Tag, TagId> {
    // tagName 필드를 기준으로 검색
    List<Tag> findByTagName(@Param("tagName") String tagName);

}

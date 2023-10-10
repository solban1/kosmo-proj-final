package clone.pinterest.backend.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.rest.core.annotation.RestResource;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Pin implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seq;
    private String pinTitle;
    private Long pinDesc;
    @OneToOne
    @JoinColumn(name = "imgSeq")
    @RestResource(path = "PinImg", rel = "image")
    private UpImage image;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date pinRdate;
    @OneToOne
    @JoinColumn(name = "id")
    @RestResource(path = "pinWriter", rel = "writer")
    private Member writer;
    // @OneToOne(mappedBy = "pin")
    // private CommentInPin comment;
    @OneToMany(mappedBy = "id.pin") // Save 엔티티의 id 필드의 pin과 매핑
    private List<Save> saves;
}

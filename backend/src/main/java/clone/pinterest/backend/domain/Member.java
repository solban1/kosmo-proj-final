package clone.pinterest.backend.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import org.springframework.data.rest.core.annotation.RestResource;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member implements Serializable {

    @Id
    private String id;
    private String name;
    private String pwd;
    private Date birth;
    private String sex;
    private String loc;
    @OneToOne
    @JoinColumn(name = "imgSeq")
    @RestResource(path = "ProfileImg", rel = "upimage")
    private UpImage upimage;

    @OneToOne(mappedBy = "writer")
    private Pin pin;

    @OneToOne(mappedBy = "writer")
    private CommentInPin comment;

    @OneToMany(mappedBy = "id.member")
    private List<Save> saves;

}

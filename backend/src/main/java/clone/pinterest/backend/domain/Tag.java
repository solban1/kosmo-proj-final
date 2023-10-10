package clone.pinterest.backend.domain;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@IdClass(TagId.class)
public class Tag implements Serializable {
    @Id
    private String tagName;

    @Id
    @ManyToOne
    @JoinColumn(name = "pinSeq")
    private Pin pin;

    // @EmbeddedId
    // private TagId id;
}

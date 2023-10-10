package clone.pinterest.backend.domain;

import java.io.Serializable;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Convert;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Save implements Serializable {
    @EmbeddedId
    private SaveId id;
    // @Id
    // @ManyToOne
    // @JoinColumn(name = "id")
    // private Member member;
    // @Id
    // @ManyToOne
    // @JoinColumn(name = "seq")
    // private Pin pin;

    // private Integer board;

}

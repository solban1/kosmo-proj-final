package clone.pinterest.backend.domain;

import java.io.Serializable;

import jakarta.persistence.Convert;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SaveId implements Serializable {

    // private Member member;
    // private Pin pin;
    // private Member member;
    // private Pin saved_pin;
    @ManyToOne
    @JoinColumn(name = "id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "seq")
    private Pin pin;
}

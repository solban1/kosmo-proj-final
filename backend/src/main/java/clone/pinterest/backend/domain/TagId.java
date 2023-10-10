package clone.pinterest.backend.domain;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// @Embeddable
public class TagId implements Serializable {

    private String tagName;

    // @ManyToOne
    // @JoinColumn(name = "pinSeq")
    // private Pin pin;

    private Pin pin;

    // // equals와 hashCode 메서드 오버라이딩
    // @Override
    // public boolean equals(Object o) {
    // if (this == o)
    // return true;
    // if (o == null || getClass() != o.getClass())
    // return false;
    // TagId tagId = (TagId) o;
    // return Objects.equals(tagName, tagId.tagName) &&
    // Objects.equals(pin, tagId.pin);
    // }

    // @Override
    // public int hashCode() {
    // return Objects.hash(tagName, pin);
    // }

    // @Override
    // public String toString() {
    // return "tag-" + tagName + "/" + pin.getPinSeq();
    // // return "tag-" + tagName;
    // }
}

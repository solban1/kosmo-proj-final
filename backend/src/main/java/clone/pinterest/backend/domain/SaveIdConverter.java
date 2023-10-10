package clone.pinterest.backend.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SaveIdConverter implements AttributeConverter<SaveId, String> {
    @Override
    public String convertToDatabaseColumn(SaveId attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getMember().getId() + "-" + attribute.getPin().getSeq();
    }

    @Override
    public SaveId convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        String[] parts = dbData.split("-");
        Member member = new Member();
        member.setId(parts[0]);
        Pin pin = new Pin();
        pin.setSeq(Integer.parseInt(parts[1]));
        return new SaveId(member, pin);
    }
}

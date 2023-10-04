package clone.pinterest.backend.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.Collection;
import java.util.Set;

import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member implements UserDetails {

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Set.of(() -> "ROLE_USER");
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

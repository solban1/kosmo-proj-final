package clone.pinterest.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import clone.pinterest.backend.domain.Member;
import clone.pinterest.backend.repository.MemberRepository;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
@EnableWebMvc
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private MemberRepository memberRepository;

	@PostConstruct
	public void init() {
		SecurityContextHolder.getContext().setAuthentication(
				new PreAuthenticatedAuthenticationToken("admin", "admin",
						AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN")));
		memberRepository.save(Member.builder().id("admin").pwd("admin").name("admin").build());
		memberRepository.save(Member.builder().id("user").pwd("user").name("user").build());
		SecurityContextHolder.clearContext();
	}

}

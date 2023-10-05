package clone.pinterest.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import clone.pinterest.backend.repository.MemberRepository;

@Service
public class MemberDetailsService implements UserDetailsService {
    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername: " + username);
        return memberRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " is not found"));
    }
    // @Bean
    // public UserDetailsService userDetailsService() {
    // // return username -> memberRepository.findById(username).orElseThrow();
    // return username -> {
    // throw new RuntimeException();
    // };
    // }

}

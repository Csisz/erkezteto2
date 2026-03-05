package com.erkezteto.erkezteto2.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.erkezteto.erkezteto2.security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    

  @Bean
  public AuthenticationManager authenticationManager() {
    ActiveDirectoryLdapAuthenticationProvider adProvider =
        new ActiveDirectoryLdapAuthenticationProvider(
            "mycompany.com",
            "ldap://ad.mycompany.com:389"
        );

    adProvider.setConvertSubErrorCodesToExceptions(true);
    adProvider.setUseAuthenticationRequestCredentials(true);

    return new ProviderManager(adProvider);
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .headers(headers -> headers.frameOptions(frame -> frame.disable()))
      .authorizeHttpRequests(auth -> auth
          .requestMatchers("/login", "/h2-console/**").permitAll()
          .anyRequest().authenticated()
      )
      .addFilterBefore(new AuthTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}

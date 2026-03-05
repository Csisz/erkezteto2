package com.erkezteto.erkezteto2.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.erkezteto.erkezteto2.security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final AuthTokenFilter authTokenFilter;

  public SecurityConfig(AuthTokenFilter authTokenFilter) {
    this.authTokenFilter = authTokenFilter;
  }

  @Value("${app.dev-user:}")
  private String devUser;

  @Value("${app.dev-password:}")
  private String devPassword;

  /** Production: Active Directory */
  @Bean
  @Profile("!dev")
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

  /** Development: in-memory user from application-dev.properties */
  @Bean
  @Profile("dev")
  @SuppressWarnings("deprecation")
  public AuthenticationManager devAuthenticationManager() {
    UserDetailsService uds = new InMemoryUserDetailsManager(
        User.withUsername(devUser.isBlank() ? "admin" : devUser)
            .password(devPassword.isBlank() ? "admin" : devPassword)
            .roles("USER", "ADMIN")
            .build()
    );
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider(uds);
    provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
    return new ProviderManager(provider);
  }

  /** Prevent Spring Boot from auto-registering AuthTokenFilter in the servlet container.
   *  It is already added to the Spring Security filter chain via addFilterBefore(). */
  @Bean
  public FilterRegistrationBean<AuthTokenFilter> disableAuthTokenFilterAutoReg() {
    var reg = new FilterRegistrationBean<>(authTokenFilter);
    reg.setEnabled(false);
    return reg;
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
      .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}

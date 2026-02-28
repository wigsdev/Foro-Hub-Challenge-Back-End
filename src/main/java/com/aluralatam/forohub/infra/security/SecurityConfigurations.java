package com.aluralatam.forohub.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> {
                    // Permitimos temporalmente TODAS las peticiones a /topicos
                    // para poder probar el CRUD (HUs 04 a 08).
                    // En la HU 11 a 13 esto cambiará para exigir un token JWT.
                    req.requestMatchers("/topicos", "/topicos/**").permitAll();
                    req.anyRequest().authenticated();
                })
                .build();
    }
}

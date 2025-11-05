package com.book_social_network.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="_User")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue
    private Integer id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    @Column(unique=true)
    private String email;
    private String password;
    private Boolean accountLocked;
    private Boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    @OneToMany(mappedBy = "owner")
    private List<Book> books;

    @OneToMany(mappedBy = "user")
    private List<BookTransactionHistory> histories;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime modifiedDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return this.roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public String getName() {
        return email;
    }

    public String fullName(){

        return firstName + " " + lastName;
    }
}

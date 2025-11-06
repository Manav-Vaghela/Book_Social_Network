package com.book_social_network.Repository;

import com.book_social_network.Entity.FeedBack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FeedBackRepository extends JpaRepository<FeedBack, Integer> {

    @Query("""
        SELECT feedback
        FROM FeedBack feedback
        WHERE feedback.book.id = :bookId
    """)
    Page<FeedBack> findByBookId(Integer bookId, Pageable pageable);
}

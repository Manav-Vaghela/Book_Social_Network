package com.book_social_network.Service;

import com.book_social_network.Entity.Book;
import com.book_social_network.Entity.FeedBack;
import com.book_social_network.Entity.FeedBackResponse;
import com.book_social_network.Record.FeedBackRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class FeedBackMapper {

    
    public FeedBack toFeedBack(FeedBackRequest feedBackRequest) {

        return FeedBack.builder()
                .note(feedBackRequest.note())
                .comment(feedBackRequest.comment())
                .book(Book.builder()
                        .id(feedBackRequest.bookId())
                        .archived(false)
                        .shareable(false)
                        .build()
                )
                .build();
    }

    public FeedBackResponse toFeedBackResponse(FeedBack feedBack, Integer id) {

        return FeedBackResponse.builder()
                .note(feedBack.getNote())
                .comment(feedBack.getComment())
                .ownFeedBack(Objects.equals(feedBack.getCreatedBy(),id))
                .build();
    }
}

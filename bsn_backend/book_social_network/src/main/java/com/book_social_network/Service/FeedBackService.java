package com.book_social_network.Service;

import com.book_social_network.Entity.Book;
import com.book_social_network.Entity.FeedBack;
import com.book_social_network.Entity.User;
import com.book_social_network.Exception.OperationNotPermittedException;
import com.book_social_network.Record.FeedBackRequest;
import com.book_social_network.Repository.BookRepository;
import com.book_social_network.Repository.FeedBackRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedBackService {

    private final BookRepository bookRepository;
    private final FeedBackMapper feedBackMapper;
    private final FeedBackRepository feedBackRepository;

    public Integer save(FeedBackRequest feedBackRequest, Authentication connectedUser) {

        Book book = bookRepository.findById(feedBackRequest.bookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found with this ID:" + feedBackRequest.bookId()));

        if(!book.isShareable() && book.isArchived()){

            throw new OperationNotPermittedException("You can not give a feedback for an archived and non-shareable book");
        }
        User user = ((User) connectedUser.getPrincipal());

        if(Objects.equals(book.getOwner().getId(),user.getId())){

            throw new OperationNotPermittedException("You cannot give a feedback to your own book");
        }

        FeedBack feedBack = feedBackMapper.toFeedBack(feedBackRequest);
        return feedBackRepository.save(feedBack).getId();
    }
}

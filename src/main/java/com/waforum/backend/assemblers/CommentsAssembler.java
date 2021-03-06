package com.waforum.backend.assemblers;

import com.waforum.backend.controllers.CommentsController;
import com.waforum.backend.controllers.PostsController;
import com.waforum.backend.controllers.UserProfileController;
import com.waforum.backend.models.Comments;
import com.waforum.backend.repository.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

public class CommentsAssembler implements RepresentationModelAssembler<Comments, EntityModel<Comments>> {
    @Autowired
    PostsRepository postsRepository;
    @Override
    public EntityModel<Comments> toModel(Comments comments) {
        System.out.println("The comment " + comments);
        return EntityModel.of(comments,
                linkTo(methodOn(PostsController.class).getQuestions(null)).withRel("home"),
                linkTo(methodOn(CommentsController.class).getCommentsByAnswerId(comments.getPostId())).withSelfRel(),
                linkTo(methodOn(UserProfileController.class).getProfileInfoById(comments.getUserId())).withRel("userProfile"));
    }
}

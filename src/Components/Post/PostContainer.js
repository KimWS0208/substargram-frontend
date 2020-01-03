import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({id, user, files, likeCount, isLiked, comments, createdAt, caption, location}) => {
    const [isLikedS, setisLiked] = useState(isLiked)
    const [likeCountS, setlikeCount] = useState(likeCount)
    const [currentItem, setcurrentItem] = useState(0);
    const comment = useInput("");
    const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
        variables: {postId: id}
    });
    const addCommentMutation = useMutation(ADD_COMMENT, {
        variables: {postId: id, text: comment.value}
    })
    const slide = () => {
        const totalFiles = files.length;
        if(currentItem === totalFiles - 1 ){
            setTimeout( () => setcurrentItem(0), 2000);
        } else {
            setTimeout( () => setcurrentItem(currentItem + 1), 2000);
        }
    };
    useEffect(() => {
        slide();
    }, [currentItem]);
    
    const toggleLike = async() => {
        if(isLikedS === true){
            setisLiked(false)
            setlikeCount(likeCountS -1)
        } else {
            setisLiked(true)
            setlikeCount(likeCountS +1)
        }
        try {
            await toggleLikeMutation()
        } catch {
            toast.error("Can't register like")
        }
    }
    
    return (
        <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setisLiked={setisLiked}
            setlikeCount={setlikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
        />
    )
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    

}

export default PostContainer;
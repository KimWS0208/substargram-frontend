import React from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";

const GET_USER = gql`
    query seeUser($userName: String!){
        seeUser(userName: $userName){
            id
            avatar
            userName
            fullName
            isFollowing
            itSelf
            bio
            followersCount
            followingCount
            postCount
            post{
                id
                files{
                    url
                }
                likeCount
                commentCount
           }
        }
    }
`;

const Wrapper = styled.div`
    min-height: 60vh;
`;

const Header = styled.header``;

export default withRouter(({match: { params: { username } } }) => {
    const {data, loading} = useQuery(GET_USER, {variables: {username}})
    if(loading){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    } else {
        console.log(data)
        return null
    }
    
});


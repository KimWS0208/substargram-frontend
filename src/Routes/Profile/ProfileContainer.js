import React from "react";
import { withRouter } from "react-router-dom";
// import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import {gql} from "apollo-boost";
import ProfilePresenter from "./ProfilePresenter";
// import index from "../Profile/index";

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

export const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;


export default withRouter(({ match: { params: { userName } } }) => {
    // const aa = { match: { params: { userName } } }
    // console.log('aa',aa)
    
    const { data, loading } = useQuery(GET_USER, { variables: { userName } });
    // console.log('data',data)
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter data={data} loading={loading} logOut={logOut} />;
  });
import React from 'react';
import styled from "styled-components";
import {Helmet} from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from '../../Components/FollowButton';
import SquarePost from '../../Components/SquarePost';
import Button from '../../Components/Button';
// import FollowButtonContainer from '../../Components/FollowButton';



const Wrapper = styled.div`
    min-height: 100vh;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
    display: flex;
    align-items: center;
`;


const Username = styled.span`
    display: block;
    font-size: 26px;
    margin-bottom: 10px;
`;

const Counts = styled.ul`
    display: flex;
    margin: 15px 0px;
`;

const Count = styled.li`
    font-size: 16px;
    &:not(:last-child){
        margin-right: 10px;
    }
`;

const Bio = styled.p`
    margin: 10px; 0px;
`;

const FullName = styled(FatText)`
    font-size: 16px;
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 300px);
    grid-template-rows: 300px;
    grid-auto-rows: 300px;
`;


export default ({loading, data, logOut}) => {
    if(loading === true){
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        )
    } else if (!loading && data && data.seeUser) {
        const {
            seeUser: {
                id,
                avatar,
                userName,
                fullName,
                isFollowing,
                itSelf,
                bio,
                followersCount,
                followingCount,
                postCount,
                post,
            }
        } = data;
        return (
            <Wrapper>
                <Helmet>
                    <title>
                        {userName} | Sumstargram
                    </title>
                </Helmet>
                <Header>
                    <HeaderColumn>
                        <Avatar size="lg" url={avatar} />
                    </HeaderColumn>
                    <HeaderColumn>
                        <UsernameRow>
                            <Username>{userName}</Username>{"  "}
                            {itSelf ? <Button onClick={()=>console.log(logOut),logOut} text="Log Out" /> : <FollowButton id={id} isFollowing={isFollowing} />}
                            {/* {itSelf ? <Button onClick={()=>console.log(logOut)} text="Log Out" /> : <FollowButton id={id} isFollowing={isFollowing} />} */}
                        </UsernameRow>
                        <Counts>
                            <Count>
                                <FatText text={String(postCount)} /> post
                            </Count>
                            <Count>
                                <FatText text={String(followersCount)} /> followers
                            </Count>
                            <Count>
                                <FatText text={String(followingCount)} /> following
                            </Count>
                        </Counts>
                        <FullName text={fullName} />
                        <Bio>{bio}</Bio>
                    </HeaderColumn>
                </Header>
                <Posts>
                    {post &&
                        post.map(post =>
                            <SquarePost
                                key={post.id} 
                                likeCount={post.likeCount}
                                commentCount={post.commentCount}
                                file={post.files[0]} />
                        )
                    }
                </Posts>
            </Wrapper>
        )
    }
    return null;
}
import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
    ${props => props.theme.whiteBox};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const EAvatar = styled(Avatar)`
    margin-bottom: 15px;
`;

const ELink = styled(Link)`
    color: inherit;
    margin-bottom: 10px;
`;


const UserCard = ({id, userName, isFollowing, url, itSelf}) => (
    <Card>
        <EAvatar url={url} size={"md"} />
        <ELink to={`/${userName}`}>
            <FatText text={userName} />
        </ELink>
        {!itSelf && <FollowButton id={id} isFollowing={isFollowing} />}
    </Card>
);

UserCard.propTypes = {
    id: Proptypes.string.isRequired,
    userName: Proptypes.string.isRequired,
    isFollowing: Proptypes.bool.isRequired,
    url: Proptypes.string.isRequired,
    itSelf: Proptypes.bool.isRequired
}

export default UserCard;
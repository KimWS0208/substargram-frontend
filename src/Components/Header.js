import React from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import useInput from "../Hooks/useInput";
import Input from "./Input";
import { Compass, HeartEmpty, User, Logo } from "./Icons";
import {gql} from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const Header = styled.header`
    width: 100%;
    border: 0;
    background-color: white;
    border-bottom: ${props => props.theme.boxBorder};
    border-radius: 0;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;

`;

const HeaderWrapper = styled.div`
    width:100%;
    max-width: ${props => props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child {
        margin-right: auto;
        text-align: left;
    }
    &:last-child {
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${props => props.theme.bgColor}
    padding: 5px;
    font-size: 14px;
    border-radius:3px;
    heigth: auto;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity:0.8;
        font-weigth: 200;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child) {
        margin-right: 30px;
    }
`;

const ME = gql`
    {
        me{
            userName
        }
    }    
`;

export default withRouter(({history}) => {
    // console.log(props)
    const search = useInput("");
    const {data, loading} = useQuery(ME);
    if (loading) return "";
    // console.log(data)
    const onSearchSubmit = e => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    }
    return (
        <Header>
        <HeaderWrapper>
            <HeaderColumn>
                <Link to="/">
                    <Logo />
                </Link>
            </HeaderColumn>

            <HeaderColumn>
                <form onSubmit={onSearchSubmit}>
                    <SearchInput {...search} placeholder="Search" />
                </form>
            </HeaderColumn>

            <HeaderColumn>
                <HeaderLink to="/explore">
                    <Compass />
                </HeaderLink>
                <HeaderLink to="/notifications">
                    <HeartEmpty />
                </HeaderLink>
                {/* <HeaderLink to="/username">
                    <User />
                </HeaderLink> */}
                {!data.me ? (
                    <HeaderLink to="/#">
                        <User />
                    </HeaderLink>
                ) : (
                    <HeaderLink to={data.me.userName}>
                       <User />
                    </HeaderLink> 
                )}
            </HeaderColumn>
                
        </HeaderWrapper>
    </Header>
    )
})

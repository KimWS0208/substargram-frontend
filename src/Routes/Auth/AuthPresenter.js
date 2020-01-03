import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";


const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox};
    border-radius:0px;
    width:100%;
    max-width: 350px;
`;

const StateChanger = styled(Box)`
    text-align:center;
    padding: 20px 0px;
`;

const BlueBox = styled.span`
    color: ${props => props.theme.blueColor};
    cursor: pointer;
`;

const Form = styled(Box)`
    padding: 40px;
    padding-bottom: 30px;
    margin-bottom: 15px;
    width: 100%;
    form {
        width: 100%
        input{
            width:100%;
            &:not(first-child){
                margin-bottom:7x;
            }
        }
        button {
            margin-top: 10px;
        }
    }
`;


export default ({
    action,
    userName,
    firstName,
    lastName,
    email,
    setAction,
    onSubmit,
    secret
}) => (
        <Wrapper>
            <Form>
                {action === "logIn" && (
                    <>
                        <Helmet>
                            <title>Log In | Sumstargram</title>
                        </Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"Email"} {...email} type="email" />
                            <Button text={"Log in"} />
                        </form>
                    </>
                )} 
                {action === "signUp" && (
                    <>
                        <Helmet>
                            <title>Sign Up | Sumstargram</title>
                        </Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder={"First name"} {...firstName} />
                            <Input placeholder={"Last name"} {...lastName} />
                            <Input placeholder={"Email"} {...email} type="email" />
                            <Input placeholder={"Username"} {...userName} />
                            <Button text={"Sign up"} />
                        </form>
                    </>
                )}
                {action === "confirm" && (
                    <>
                        <Helmet>
                            <title>Confirm Secret | Sumstargram</title>
                        </Helmet>
                        <form onSubmit={onSubmit}>
                            <Input placeholder="Paste your secret" required {...secret} />
                            <Button text={"Confirm"} />
                        </form>
                    </>
                )}
                
            </Form>
            {action !== "confirm" && (
                <StateChanger>
                {action === "logIn" ? (
                    <>
                        Don't have an account? {" "}
                        <BlueBox onClick={() => setAction("signUp")}> Sign up </BlueBox>
                    </>
                 ) : (
                    <>
                        Have an account? {" "}
                        <BlueBox onClick={() => setAction("logIn")}> Log in </BlueBox>
                    </>
                )}
            </StateChanger>
            )}
        </Wrapper>
    )
import React, {FC} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, PreviewData} from "next";
import {ParsedUrlQuery} from "querystring";

type UserProfileProps = {
    username: string
}

const UserProfilePage: FC<UserProfileProps> = (props) => {
    const {username} = props

    return (
        <div>
            <h1>{username}</h1>
        </div>
    );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params, req, res} = context

    return {
        props: {
            username: 'Anton'
        }
    }
}
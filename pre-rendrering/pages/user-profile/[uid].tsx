import React, {FC} from 'react';
import {GetServerSideProps} from "next";

type UserIdProps = {
    id: string
}

const UserIdPage: FC<UserIdProps> = (props) => {
    const {id} = props

    return (
        <div>
            {id}
        </div>
    );
};

export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context
    const userId = params?.uid

    return {
        props: {
            id: 'userid-' + userId
        }
    }
}
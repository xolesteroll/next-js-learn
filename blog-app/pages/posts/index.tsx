import React from 'react';
import {NextPage} from "next";
import AllPosts from "../../components/posts/AllPosts/AllPosts";
import {getAllPosts} from "../../helpers/posts-utils";
import {Post} from "../../types/posts";

const PostsPage: NextPage<{posts: [Post] | []}> = ({posts}) => {
    return (
    // @ts-ignore
        <AllPosts posts={posts} />
    );
};

export const getStaticProps = async () => {
    const postsData = getAllPosts()

    return {
        props: {
            posts: JSON.parse(JSON.stringify(postsData))
        }
    }
}

export default PostsPage;
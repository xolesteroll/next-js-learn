import React from 'react';
import {NextPage} from "next";
import AllPosts from "../../components/posts/AllPosts/AllPosts";
import {getAllPosts} from "../../helpers/posts-utils";
import {Post} from "../../types/posts";
import Head from "next/head";

const PostsPage: NextPage<{posts: [Post] | []}> = ({posts}) => {
    return (
        <>
            <Head >
                <title>All my posts</title>
                <meta name='description' content='A list of published posts'/>
            </Head>
        <AllPosts posts={posts} />
        </>
    );
};

export const getStaticProps = () => {
    const postsData = getAllPosts()

    return {
        props: {
            posts: JSON.parse(JSON.stringify(postsData))
        },
        revalidate: 1800
    }
}

export default PostsPage;
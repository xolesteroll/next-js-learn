import React from 'react';
import {GetStaticProps, NextPage} from "next";
import PostDetail from "../../../components/posts/PostDetail/PostDetail";
import {getPostData, getPostsFiles} from "../../../helpers/posts-utils";
import {Post} from "../../../types/posts";

const PostDetailsPage: NextPage<{post: Post}> = ({post}) => {
    return (
        <PostDetail post={post}/>
    );
};

export const getStaticPaths = () => {
    const postsFiles = getPostsFiles()
    const slugs = postsFiles.map(pf => {
        return pf.replace(/\.md$/, '')
    })

    const postsParams = slugs.map(slug => {
        return {
            params: {
                postSlug: slug
            }
        }
    })

    return {
        paths: postsParams,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = (ctx) => {
    const params = ctx.params
    const postSlug = params?.postSlug

    let singlePost

    if (postSlug && typeof postSlug === 'string') {
        singlePost = getPostData(postSlug)
    }
    if (!singlePost) return {notFound: true}

    return {
        props: {
            post: JSON.parse(JSON.stringify(singlePost))
        },
        revalidate: 600
    }
}

export default PostDetailsPage;
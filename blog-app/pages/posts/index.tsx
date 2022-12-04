import React from 'react';
import {NextPage} from "next";
import AllPosts from "../../components/posts/AllPosts/AllPosts";
const DUMMY_POSTS = [
    {
        id: 'p1',
        title: 'Getting started with NextJS',
        slug: 'getting-started-with-nextjs',
        image: 'getting-started-nextjs.png',
        excerpt: 'Some description of NextJS Features, etc',
        date: '2022-02-10'
    },
    {
        id: 'p2',
        title: 'Getting started with NextJS',
        slug: 'getting-started-with-nextjs2',
        image: 'getting-started-nextjs.png',
        excerpt: 'Some description of NextJS Features, etc',
        date: '2022-02-10'
    },
    {
        id: 'p3',
        title: 'Getting started with NextJS',
        slug: 'getting-started-with-nextjs3',
        image: 'getting-started-nextjs.png',
        excerpt: 'Some description of NextJS Features, etc',
        date: '2022-02-10'
    },
    {
        id: 'p4',
        title: 'Getting started with NextJS',
        slug: 'getting-started-with-nextjs4',
        image: 'getting-started-nextjs.png',
        excerpt: 'Some description of NextJS Features, etc',
        date: '2022-02-10'
    }
]

const PostsPage: NextPage = () => {
    return (
    // @ts-ignore
        <AllPosts posts={DUMMY_POSTS} />
    );
};

export default PostsPage;
import React, {FC} from 'react';

import s from "./AllPosts.module.css"
import PostsGrid from "../PostsGrid/PostsGrid";
import {Post} from "../../../types/posts";

const AllPosts: FC<{posts: [Post] | [] }> = ({posts}) => {
    return (
        <section className={s.posts}>
            <h1>All Posts</h1>
            <PostsGrid posts={posts} />
        </section>
    );
};

export default AllPosts;
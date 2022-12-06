import React, {FC} from 'react';

import s from "./PostsGrid.module.css"
import {Post} from "../../../types/posts";
import PostItem from "../PostItem/PostItem";

const PostsGrid: FC<{ posts: [Post] | [] }> = ({posts}) => {

    return (
        <ul className={s.grid}>
            {
                posts.length > 0 ?
                    posts.map(p => <PostItem post={p} key={p.data.slug}/>) :
                    <p>No posts yet...</p>
            }
        </ul>
    );
};

export default PostsGrid;
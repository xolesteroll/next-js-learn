import {NextPage} from "next";
import Hero from "../components/home-page/Hero/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts/FeaturedPosts";
import {Post} from "../types/posts";
import {getFeaturedPosts} from "../helpers/posts-utils";
const HomePage: NextPage<{ posts: [Post] | [] }> = ({posts}) => {

    return (
        <>
            <Hero/>
            {/*// @ts-ignore*/}
            <FeaturedPosts posts={posts}/>
        </>
    )
}

export const getStaticProps = async () => {
    const postsData = getFeaturedPosts()

    return {
        props: {
            posts: JSON.parse(JSON.stringify(postsData))
        },
        revalidate: 1800
    }
}

export default HomePage
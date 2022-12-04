import {NextPage} from "next";
import Hero from "../components/home-page/Hero/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts/FeaturedPosts";
import {Post} from "../types/posts";

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

const HomePage: NextPage<{ posts: [Post] | [] }> = ({posts}) => {

    return (
        <>
            <Hero/>
            {/*// @ts-ignore*/}
            <FeaturedPosts posts={DUMMY_POSTS}/>
        </>
    )
}

export default HomePage
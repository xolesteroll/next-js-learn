import React, {FC} from 'react';
import Image from "next/image";

import s from "./Hero.module.css"

const Hero: FC = () => {
    return (
        <section className={s.hero}>
            <div className={s.image}>
                <Image  src="/images/me.jpg" alt="developer's image" width={300} height={300}/>
            </div>
            <h1>Hi, I&apos;m Anton</h1>
            <p>Some info about my blog.</p>
        </section>
    );
};

export default Hero
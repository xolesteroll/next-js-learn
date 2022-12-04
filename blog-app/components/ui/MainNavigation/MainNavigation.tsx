import React from 'react';
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import Link from "next/link";

import s from "./MainNavigation.module.css"

const MainNavigation = () => {
    return (
        <header className={s.header}>
            <HeaderLogo />
            <nav>
                <ul>
                    <li>
                        <Link href="/" >Home</Link>
                    </li>
                    <li>
                        <Link href="/posts" >Posts</Link>
                    </li>
                    <li>
                        <Link href="/contact" >Contact Me</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
import React from 'react';
import Link from "next/link";

import s from "./MainHeader.module.css"

const MainHeader = () => {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <Link href="/" >
                    Featured Events
                </Link>
            </div>
            <nav className={s.navigation}>
                <ul>
                    <li>
                        <Link href="/events">
                            All Events
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
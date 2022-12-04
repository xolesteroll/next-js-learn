import React from 'react';
import Link from "next/link";

import s from "./HeaderLogo.module.css"

const HeaderLogo = () => {
    return (
        <div className={s.logo}>
            <Link href="/">
                Developer&apos;s Blog
            </Link>
        </div>
    );
};

export default HeaderLogo;
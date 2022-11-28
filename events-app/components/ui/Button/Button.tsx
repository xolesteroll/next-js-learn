import React, {FC} from 'react';
import Link from "next/link";
import {ReactNodeArray} from "prop-types";

import s from "./Button.module.css"

type LinkProps = {
    url?: string,
    children: ReactNodeArray
}

const Button:FC<LinkProps> = ({url, children}) => {

    if (url) {
        return (
            <Link className={s.btn} href={url} >
                {children}
            </Link >
        );
    } else {
        return (
            <button className={s.btn}>{children}</button>
        );
    }

};

export default Button;
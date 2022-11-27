import React, {FC, PropsWithChildren} from 'react';
import Link from "next/link";
import {ReactNodeArray} from "prop-types";

import s from "./Button.module.css"

type LinkProps = {
    url: string,
    children: ReactNodeArray
}

const Button:FC<LinkProps> = ({url, children}: LinkProps) => {
    return (
        <Link className={s.btn} href={url} >
            {children}
        </Link >

    );
};

export default Button;
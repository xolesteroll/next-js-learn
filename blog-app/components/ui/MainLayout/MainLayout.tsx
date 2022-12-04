import React, {FC, PropsWithChildren} from 'react';
import MainNavigation from "../MainNavigation/MainNavigation";

const MainLayout: FC<PropsWithChildren> = (props) => {
    return (
        <>
            <MainNavigation/>
            <main>
                {props.children}
            </main>
        </>
    );
};

export default MainLayout;
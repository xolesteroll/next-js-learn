import React, {FC, PropsWithChildren} from 'react';
import MainHeader from "../MainHeader/MainHeader";

const MainLayout:FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <MainHeader />
            <main>
                {children}
            </main>
        </>
    );
};

export default MainLayout;
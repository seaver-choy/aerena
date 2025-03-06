import { ReactNode } from "react";

type Props = { children: ReactNode };

export const Layout = (props: Props) => {
    return (
        <div
            id="layout-id"
            className="disable-select disable-scrollbar disable-zoom h-screen w-full flex-col overflow-y-auto bg-light pb-[24vw]"
        >
            {props.children}
        </div>
    );
};

import { ReactNode } from "react";

type Props = { children: ReactNode };

export const Layout = (props: Props) => {
  return (
    <div
      className="disable-select disable-scrollbar bg-light disable-zoom pb-[24vw] flex h-screen w-full flex-col overflow-y-auto"
      style={{
        touchAction:
          location.pathname === "/" ||
          location.pathname === "/friends" ||
          location.pathname === "/quest" ||
          location.pathname === "/rank" ||
          location.pathname === "/starlight" ||
          location.pathname === "/collection"
            ? "none"
            : "",
      }}
    >
      {props.children}
    </div>
  );
};

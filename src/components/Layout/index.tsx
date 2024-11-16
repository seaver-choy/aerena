import { ReactNode } from "react";

type Props = { children: ReactNode };

export const Layout = (props: Props) => {
  return (
    <div
      className="disable-select disable-scrollbar bg-light disable-zoom flex h-screen w-full flex-col overflow-y-auto"
      style={{
        touchAction:
          location.pathname === "/friends" || location.pathname === "/quest"
            ? "none"
            : "",
        paddingBottom:
          location.pathname === "/friends" || location.pathname === "/quest"
            ? ""
            : "24vw",
      }}
    >
      {props.children}
    </div>
  );
};

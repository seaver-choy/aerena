import { Link, Outlet, useLocation } from "react-router-dom";

import IconCollection from "../../assets/icon-collection.svg";
import IconPlay from "../../assets/icon-play.svg";
import IconExchange from "../../assets/icon-exchange.svg";

export const NavBar = () => {
  const location = useLocation();
  const tabs = [
    { id: "/collection", text: "COLLECTION", Icon: IconCollection },
    { id: "/", text: "PLAY", Icon: IconPlay },
    { id: "/exchange", text: "EXCHANGE", Icon: IconExchange },
  ];

  return (
    <>
      <Outlet />
      <div className="disable-select fixed bottom-0 z-30 flex h-[20vw] w-full justify-center rounded-t-[3vw] bg-gradient-to-b from-gold to-cream pl-[0.5vh] pr-[0.5vh] pt-[0.5vh]">
        <div className="flex h-full w-screen bg-light items-center justify-center gap-[2vw] rounded-t-[2.4vw] p-[2vw]">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.id;
            return (
              <Link
                className="flex h-full w-full flex-col items-center justify-center rounded-[2vw] p-[2%]"
                to={tab.id}
                style={{
                  backgroundColor: isActive ? "#F4E8D5" : "transparent",
                }}
                key={tab.id}
              >
                <img className="h-[6vw]" src={tab.Icon} alt=""></img>
                <p className="pt-[1vw] text-center text-graydark font-montserrat text-[2.5vw]">
                  {tab.text}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

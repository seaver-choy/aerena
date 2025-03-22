import { Link, Outlet, useLocation } from "react-router-dom";
import { useUsers } from "../../hooks/useUser";

import ProfileIcon from "../../assets/icon/profile.svg";
import NexusIcon from "../../assets/icon/nexus.svg";
import PlayIcon from "../../assets/icon/play.svg";
import CollectionIcon from "../../assets/icon/collection.svg";
import ExchangeIcon from "../../assets/icon/exchange.svg";

export const NavBar = () => {
    const location = useLocation();
    const tabs = [
        { id: "/profile", text: "Profile", Icon: ProfileIcon, iconSize: "8vw" },
        { id: "/nexus", text: "Nexus", Icon: NexusIcon, iconSize: "8vw" },
        { id: "/", text: "Play", Icon: PlayIcon, iconSize: "6vw" },
        {
            id: "/collection",
            text: "Collection",
            Icon: CollectionIcon,
            iconSize: "8vw",
        },
        {
            id: "/exchange",
            text: "Exchange",
            Icon: ExchangeIcon,
            iconSize: "6vw",
        },
    ];
    const user = useUsers();

    return (
        user.id != 0 && (
            <>
                <Outlet />
                <div className="disable-select fixed bottom-0 z-10 flex h-[20vw] w-full justify-center rounded-t-[3vw] bg-gradient-to-b from-gold to-light px-[0.5vh] pt-[0.5vh]">
                    <div className="flex h-full w-screen items-center justify-center gap-[2vw] rounded-t-[2.4vw] bg-light p-[2vw]">
                        {tabs.map((tab) => {
                            const isActive = location.pathname === tab.id;
                            return (
                                <Link
                                    className="flex h-full w-full flex-col items-center justify-center rounded-[2vw] p-[2%]"
                                    to={tab.id}
                                    style={{
                                        backgroundColor: isActive
                                            ? "#F4E8D5"
                                            : "transparent",
                                    }}
                                    key={tab.id}
                                >
                                    <img
                                        className={`h-[${tab.iconSize}]`}
                                        src={tab.Icon}
                                        alt=""
                                    ></img>
                                    <p className="pt-[0.5vw] text-center font-montserrat text-[2.5vw] text-graydark">
                                        {tab.text}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </>
        )
    );
};

//import { getUserData } from "../helpers/points.helper";
import { login } from "../helpers/lambda.helper";
import { useInitData } from "@telegram-apps/sdk-react";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {
    Token,
    Friend,
    Quest,
    InventoryItem,
    DreamTeam,
    Referrer,
    Skin,
} from "../helpers/interfaces";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

interface State {
    username: string;
    id: number;
    points: number;
    tokens: Token[];
    hasBoughtStarter: boolean;
    numBoosterBought: number;
    totalBoosterBought: number;
    friends: Friend[];
    referralCount: number;
    weeklyReferralCount: number;
    joinedTournaments: number;
    hasWonTournament: boolean;
    joinedTgCommunity: boolean;
    joinedTgChannel: boolean;
    likedAerenaPage: boolean;
    joinedBeGods: boolean;
    joinedTheBoboBot: boolean;
    quests: Quest[];
    referralCheck: boolean;
    seasonalLogins: number;
    premiumMember: boolean;
    inventory: InventoryItem[];
    referralPurchases: number;
    initDataRaw: string;
    dreamTeam: DreamTeam;
    referralCode: string;
    referredBy: Referrer;
    skins: Skin[];
    country: string;
    dreamTeamShareCounter: number;
}

interface Action {
    type:
        | "SET_USERNAME"
        | "SET_ID"
        | "SET_POINTS"
        | "SET_TOKENS"
        | "SET_HAS_BOUGHT_STARTER"
        | "SET_NUM_BOOSTER_BOUGHT"
        | "SET_TOTAL_BOOSTER_BOUGHT"
        | "SET_FRIENDS"
        | "SET_REFERRAL_COUNT"
        | "SET_WEEKLY_REFERRAL_COUNT"
        | "SET_JOINED_TOURNAMENTS"
        | "SET_HAS_WON_TOURNAMENT"
        | "SET_JOINED_TG_COMMUNITY"
        | "SET_JOINED_TG_CHANNEL"
        | "SET_LIKED_AERENA_PAGE"
        | "SET_JOINED_BE_GODS"
        | "SET_JOINED_THE_BOBO_BOT"
        | "SET_QUESTS"
        | "SET_REFERRAL_CHECK"
        | "SET_SEASONAL_LOGINS"
        | "SET_PREMIUM_MEMBER"
        | "SET_INVENTORY"
        | "SET_REFERRAL_PURCHASES"
        | "SET_DREAM_TEAM"
        | "SET_REFERRAL_CODE"
        | "SET_REFERRED_BY"
        | "SET_SKINS"
        | "SET_COUNTRY"
        | "SET_DREAM_TEAM_SHARE_COUNTER";
    payload?: Partial<State>;
}

export interface UserContextValue {
    username: string;
    id: number;
    points: number;
    tokens: Token[];
    hasBoughtStarter: boolean;
    numBoosterBought: number;
    totalBoosterBought: number;
    friends: Friend[];
    referralCount: number;
    weeklyReferralCount: number;
    joinedTournaments: number;
    hasWonTournament: boolean;
    joinedTgCommunity: boolean;
    joinedTgChannel: boolean;
    likedAerenaPage: boolean;
    joinedBeGods: boolean;
    joinedTheBoboBot: boolean;
    quests: Quest[];
    referralCheck: boolean;
    seasonalLogins: number;
    premiumMember: boolean;
    inventory: InventoryItem[];
    referralPurchases: number;
    dreamTeam: DreamTeam;
    referralCode: string;
    referredBy: Referrer;
    skins: Skin[];
    country: string;
    dreamTeamShareCounter: number;
    initDataRaw: string;
    dispatch: React.Dispatch<Action>;
}

const initialState: State = {
    username: "",
    id: 0,
    points: 0,
    tokens: [],
    hasBoughtStarter: false,
    numBoosterBought: 0,
    totalBoosterBought: 0,
    friends: [],
    referralCount: 0,
    weeklyReferralCount: 0,
    joinedTournaments: 0,
    hasWonTournament: false,
    joinedTgCommunity: false,
    joinedTgChannel: false,
    likedAerenaPage: false,
    joinedBeGods: false,
    joinedTheBoboBot: false,
    quests: [],
    referralCheck: false,
    seasonalLogins: 0,
    inventory: [],
    premiumMember: false,
    referralPurchases: 0,
    dreamTeam: null,
    referralCode: "",
    referredBy: null,
    skins: [],
    country: "",
    dreamTeamShareCounter: 0,
    initDataRaw: retrieveLaunchParams().initDataRaw,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_USERNAME":
            return {
                ...state,
                username: action.payload?.username ?? state.username,
            };
        case "SET_ID":
            return { ...state, id: action.payload?.id ?? state.id };
        case "SET_POINTS":
            return { ...state, points: action.payload?.points ?? state.points };
        case "SET_TOKENS":
            return {
                ...state,
                tokens: action.payload?.tokens ?? state.tokens,
            };
        case "SET_HAS_BOUGHT_STARTER":
            return {
                ...state,
                hasBoughtStarter:
                    action.payload?.hasBoughtStarter ?? state.hasBoughtStarter,
            };
        case "SET_NUM_BOOSTER_BOUGHT":
            return {
                ...state,
                numBoosterBought:
                    action.payload?.numBoosterBought ?? state.numBoosterBought,
            };
        case "SET_TOTAL_BOOSTER_BOUGHT":
            return {
                ...state,
                totalBoosterBought:
                    action.payload?.totalBoosterBought ??
                    state.totalBoosterBought,
            };
        case "SET_FRIENDS":
            return {
                ...state,
                friends: action.payload?.friends ?? state.friends,
            };
        case "SET_REFERRAL_COUNT":
            return {
                ...state,
                referralCount:
                    action.payload?.referralCount ?? state.referralCount,
            };
        case "SET_WEEKLY_REFERRAL_COUNT":
            return {
                ...state,
                weeklyReferralCount:
                    action.payload?.weeklyReferralCount ??
                    state.weeklyReferralCount,
            };
        case "SET_JOINED_TOURNAMENTS":
            return {
                ...state,
                joinedTournaments:
                    action.payload?.joinedTournaments ??
                    state.joinedTournaments,
            };
        case "SET_HAS_WON_TOURNAMENT":
            return {
                ...state,
                hasWonTournament:
                    action.payload?.hasWonTournament ?? state.hasWonTournament,
            };
        case "SET_JOINED_TG_COMMUNITY":
            return {
                ...state,
                joinedTgCommunity:
                    action.payload?.joinedTgCommunity ??
                    state.joinedTgCommunity,
            };
        case "SET_JOINED_TG_CHANNEL":
            return {
                ...state,
                joinedTgChannel:
                    action.payload?.joinedTgChannel ?? state.joinedTgChannel,
            };
        case "SET_LIKED_AERENA_PAGE":
            return {
                ...state,
                likedAerenaPage:
                    action.payload?.likedAerenaPage ?? state.likedAerenaPage,
            };
        case "SET_JOINED_BE_GODS":
            return {
                ...state,
                joinedBeGods:
                    action.payload?.joinedBeGods ?? state.joinedBeGods,
            };
        case "SET_JOINED_THE_BOBO_BOT":
            return {
                ...state,
                joinedTheBoboBot:
                    action.payload?.joinedTheBoboBot ?? state.joinedTheBoboBot,
            };
        case "SET_QUESTS":
            return {
                ...state,
                quests: action.payload?.quests ?? state.quests,
            };
        case "SET_REFERRAL_CHECK":
            return {
                ...state,
                referralCheck:
                    action.payload?.referralCheck ?? state.referralCheck,
            };
        case "SET_SEASONAL_LOGINS":
            return {
                ...state,
                seasonalLogins:
                    action.payload?.seasonalLogins ?? state.seasonalLogins,
            };
        case "SET_PREMIUM_MEMBER":
            return {
                ...state,
                premiumMember:
                    action.payload?.premiumMember ?? state.premiumMember,
            };
        case "SET_INVENTORY":
            return {
                ...state,
                inventory: action.payload?.inventory ?? state.inventory,
            };
        case "SET_REFERRAL_PURCHASES":
            return {
                ...state,
                referralPurchases:
                    action.payload?.referralPurchases ??
                    state.referralPurchases,
            };
        case "SET_DREAM_TEAM":
            return {
                ...state,
                dreamTeam: action.payload?.dreamTeam ?? state.dreamTeam,
            };
        case "SET_REFERRAL_CODE":
            return {
                ...state,
                referralCode:
                    action.payload?.referralCode ?? state.referralCode,
            };
        case "SET_REFERRED_BY":
            return {
                ...state,
                referredBy: action.payload?.referredBy ?? state.referredBy,
            };
        case "SET_SKINS":
            return {
                ...state,
                skins: action.payload?.skins ?? state.skins,
            };
        case "SET_COUNTRY":
            return {
                ...state,
                country: action.payload?.country ?? state.country,
            };
        case "SET_DREAM_TEAM_SHARE_COUNTER":
            return {
                ...state,
                dreamTeamShareCounter:
                    action.payload?.dreamTeamShareCounter ??
                    state.dreamTeamShareCounter,
            };
        default:
            return state;
    }
}

export const UserContext = createContext<UserContextValue>({
    username: "",
    id: 0,
    points: 0,
    tokens: [],
    hasBoughtStarter: false,
    numBoosterBought: 0,
    totalBoosterBought: 0,
    friends: [],
    referralCount: 0,
    weeklyReferralCount: 0,
    joinedTournaments: 0,
    hasWonTournament: false,
    joinedTgCommunity: false,
    joinedTgChannel: false,
    likedAerenaPage: false,
    joinedBeGods: false,
    joinedTheBoboBot: false,
    quests: [],
    referralCheck: false,
    seasonalLogins: 0,
    premiumMember: false,
    inventory: [],
    referralPurchases: 0,
    dreamTeam: null,
    referralCode: "",
    referredBy: null,
    skins: [],
    country: "",
    dreamTeamShareCounter: 0,
    initDataRaw: retrieveLaunchParams().initDataRaw,
    dispatch: () => undefined,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const initData = useInitData();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState<State>({
        ...initialState,
    });
    // const lp = useLaunchParams();
    useEffect(() => {
        const getUser = async () => {
            if (initData && initData.user) {
                let data = null;
                try {
                    data = await login(initData.user.id, user.initDataRaw);
                    const updatedUserData = {
                        ...initData.user,
                        // If necessary, manually set properties that might not be present in data
                        //...initialState,
                        ...data,
                    };
                    // Set the updated user data
                    //TODO: update dispatch with updated user schema
                    setUser(updatedUserData);
                    dispatch({
                        type: "SET_USERNAME",
                        payload: { username: data["username"] },
                    });
                    dispatch({
                        type: "SET_ID",
                        payload: { id: data["userID"] },
                    });
                    dispatch({
                        type: "SET_POINTS",
                        payload: { points: data["points"] },
                    });
                    dispatch({
                        type: "SET_TOKENS",
                        payload: { tokens: data["tokens"] },
                    });
                    dispatch({
                        type: "SET_HAS_BOUGHT_STARTER",
                        payload: { hasBoughtStarter: data["hasBoughtStarter"] },
                    });
                    dispatch({
                        type: "SET_NUM_BOOSTER_BOUGHT",
                        payload: { numBoosterBought: data["numBoosterBought"] },
                    });
                    dispatch({
                        type: "SET_TOTAL_BOOSTER_BOUGHT",
                        payload: {
                            totalBoosterBought: data["totalBoosterBought"],
                        },
                    });
                    dispatch({
                        type: "SET_FRIENDS",
                        payload: { friends: data["friends"] },
                    });
                    dispatch({
                        type: "SET_REFERRAL_COUNT",
                        payload: { referralCount: data["referralCount"] },
                    });
                    dispatch({
                        type: "SET_WEEKLY_REFERRAL_COUNT",
                        payload: {
                            weeklyReferralCount: data["weeklyReferralCount"],
                        },
                    });
                    dispatch({
                        type: "SET_JOINED_TOURNAMENTS",
                        payload: {
                            joinedTournaments: data["joinedTournaments"],
                        },
                    });
                    dispatch({
                        type: "SET_HAS_WON_TOURNAMENT",
                        payload: { hasWonTournament: data["hasWonTournament"] },
                    });
                    dispatch({
                        type: "SET_JOINED_TG_COMMUNITY",
                        payload: {
                            joinedTgCommunity: data["joinedTgCommunity"],
                        },
                    });
                    dispatch({
                        type: "SET_JOINED_TG_CHANNEL",
                        payload: { joinedTgChannel: data["joinedTgChannel"] },
                    });
                    dispatch({
                        type: "SET_LIKED_AERENA_PAGE",
                        payload: { likedAerenaPage: data["likedAerenaPage"] },
                    });
                    dispatch({
                        type: "SET_JOINED_BE_GODS",
                        payload: { joinedBeGods: data["joinedBeGods"] },
                    });
                    dispatch({
                        type: "SET_JOINED_THE_BOBO_BOT",
                        payload: { joinedTheBoboBot: data["joinedTheBoboBot"] },
                    });
                    dispatch({
                        type: "SET_QUESTS",
                        payload: { quests: data["quests"] },
                    });
                    dispatch({
                        type: "SET_SEASONAL_LOGINS",
                        payload: { seasonalLogins: data["seasonalLogins"] },
                    });
                    dispatch({
                        type: "SET_PREMIUM_MEMBER",
                        payload: { premiumMember: data["premiumMember"] },
                    });
                    dispatch({
                        type: "SET_INVENTORY",
                        payload: { inventory: data["inventory"] },
                    });
                    dispatch({
                        type: "SET_REFERRAL_PURCHASES",
                        payload: {
                            referralPurchases: data["referralPurchases"],
                        },
                    });
                    dispatch({
                        type: "SET_DREAM_TEAM",
                        payload: {
                            dreamTeam: data["dreamTeam"],
                        },
                    });
                    dispatch({
                        type: "SET_REFERRAL_CODE",
                        payload: {
                            referralCode: data["referralCode"],
                        },
                    });
                    dispatch({
                        type: "SET_REFERRED_BY",
                        payload: {
                            referredBy: data["referredBy"],
                        },
                    });
                    dispatch({
                        type: "SET_SKINS",
                        payload: {
                            skins: data["skins"],
                        },
                    });
                    dispatch({
                        type: "SET_COUNTRY",
                        payload: {
                            country: data["country"],
                        },
                    });
                    dispatch({
                        type: "SET_DREAM_TEAM_SHARE_COUNTER",
                        payload: {
                            dreamTeamShareCounter:
                                data["dreamTeamShareCounter"],
                        },
                    });
                } catch (e) {
                    dispatch({
                        type: "SET_ID",
                        payload: { id: initData.user.id },
                    });
                }
            }
        };
        getUser();
    }, [initData]);

    const contextValue: UserContextValue = {
        ...user,
        ...state,
        dispatch,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export function useUsers() {
    return useContext(UserContext);
}

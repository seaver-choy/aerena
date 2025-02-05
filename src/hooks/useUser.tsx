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
    DreamTeamInfo,
    Friend,
    Quest,
    TaskStatus,
    BattlePass,
    InventoryItem,
} from "../helpers/interfaces";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

interface State {
    username: string;
    id: number;
    points: number;
    level: number;
    pointMultiplier: number;
    maxMana: number;
    currentMana: number;
    tokens: Token[];
    hasBoughtStarter: boolean;
    numBoosterBought: number;
    totalBoosterBought: number;
    friends: Friend[];
    dailyRefill: boolean;
    referralCount: number;
    weeklyReferralCount: number;
    joinedTournaments: number;
    hasWonTournament: boolean;
    // tonWalletConnected: boolean;
    joinedTgChannel: boolean;
    paidBoosterClaimCounter: number;
    paidBoosterOrderNum: string;
    paidManaClaim: boolean;
    paidManaOrderNum: string;
    dreamTeamInfo: DreamTeamInfo[];
    quests: Quest[];
    taskStatus: TaskStatus[];
    referralCheck: boolean;
    seasonalLogins: number;
    battlepass: BattlePass[];
    premiumMember: boolean;
    inventory: InventoryItem[];
    referralPurchases: number;
    initDataRaw: string;
}

interface Action {
    type:
        | "SET_USERNAME"
        | "SET_ID"
        | "SET_POINTS"
        | "SET_LEVEL"
        | "SET_POINT_MULTIPLIER"
        | "SET_MAX_MANA"
        | "SET_CURRENT_MANA"
        | "SET_TOKENS"
        | "SET_HAS_BOUGHT_STARTER"
        | "SET_NUM_BOOSTER_BOUGHT"
        | "SET_TOTAL_BOOSTER_BOUGHT"
        | "SET_FRIENDS"
        | "SET_DAILY_REFILL"
        | "SET_REFERRAL_COUNT"
        | "SET_WEEKLY_REFERRAL_COUNT"
        | "SET_JOINED_TOURNAMENTS"
        | "SET_HAS_WON_TOURNAMENT"
        // | "SET_TON_WALLET_CONNECTED"
        | "SET_JOINED_TG_CHANNEL"
        | "SET_PAID_BOOSTER_CLAIM_COUNTER"
        | "SET_PAID_BOOSTER_ORDER_NUM"
        | "SET_PAID_MANA_CLAIM"
        | "SET_PAID_MANA_ORDER_NUM"
        | "SET_DREAM_TEAM_INFO"
        | "SET_CASH_PACK_INFO"
        | "SET_QUESTS"
        | "SET_TASK_STATUS"
        | "SET_REFERRAL_CHECK"
        | "SET_SEASONAL_LOGINS"
        | "SET_BATTLEPASS"
        | "SET_PREMIUM_MEMBER"
        | "SET_INVENTORY"
        | "SET_REFERRAL_PURCHASES";
    payload?: Partial<State>;
}

export interface UserContextValue {
    username: string;
    id: number;
    points: number;
    level: number;
    pointMultiplier: number;
    maxMana: number;
    currentMana: number;
    tokens: Token[];
    hasBoughtStarter: boolean;
    numBoosterBought: number;
    totalBoosterBought: number;
    friends: Friend[];
    dailyRefill: boolean;
    referralCount: number;
    weeklyReferralCount: number;
    joinedTournaments: number;
    hasWonTournament: boolean;
    // tonWalletConnected: boolean;
    joinedTgChannel: boolean;
    paidBoosterClaimCounter: number;
    paidBoosterOrderNum: string;
    paidManaClaim: boolean;
    paidManaOrderNum: string;
    dreamTeamInfo: DreamTeamInfo[];

    quests: Quest[];
    taskStatus: TaskStatus[];
    referralCheck: boolean;
    seasonalLogins: number;
    battlepass: BattlePass[];
    premiumMember: boolean;
    inventory: InventoryItem[];
    referralPurchases: number;
    initDataRaw: string;
    dispatch: React.Dispatch<Action>;
}

const initialState: State = {
    username: "",
    id: 0,
    points: 0,
    level: 1,
    pointMultiplier: 1,
    maxMana: 0,
    currentMana: 0,
    tokens: [],
    hasBoughtStarter: false,
    numBoosterBought: 0,
    totalBoosterBought: 0,
    friends: [],
    dailyRefill: true,
    referralCount: 0,
    weeklyReferralCount: 0,
    joinedTournaments: 0,
    hasWonTournament: false,
    // tonWalletConnected: false,
    joinedTgChannel: false,
    paidBoosterClaimCounter: 0,
    paidBoosterOrderNum: "",
    paidManaClaim: false,
    paidManaOrderNum: "",
    dreamTeamInfo: [
        {
            position: "Jungle",
            stocksLeft: 5,
            canClaimAthlete: false,
            dreamOrderNum: "",
        },
        {
            position: "Gold",
            stocksLeft: 5,
            canClaimAthlete: false,
            dreamOrderNum: "",
        },
        {
            position: "EXP",
            stocksLeft: 5,
            canClaimAthlete: false,
            dreamOrderNum: "",
        },
        {
            position: "Mid",
            stocksLeft: 5,
            canClaimAthlete: false,
            dreamOrderNum: "",
        },
        {
            position: "Roam",
            stocksLeft: 5,
            canClaimAthlete: false,
            dreamOrderNum: "",
        },
    ],
    quests: [],
    taskStatus: [],
    referralCheck: false,
    seasonalLogins: 0,
    battlepass: [
        {
            level: 1,
            basicReward: 2500,
            premReward: 5000,
            basicClaimed: false,
            premClaimed: false,
        },
    ],
    inventory: [],
    premiumMember: false,
    referralPurchases: 0,
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
        case "SET_LEVEL":
            return { ...state, level: action.payload?.level ?? state.level };
        case "SET_POINT_MULTIPLIER":
            return {
                ...state,
                pointMultiplier:
                    action.payload?.pointMultiplier ?? state.pointMultiplier,
            };
        case "SET_MAX_MANA":
            return {
                ...state,
                maxMana: action.payload?.maxMana ?? state.maxMana,
            };
        case "SET_CURRENT_MANA":
            return {
                ...state,
                currentMana: action.payload?.currentMana ?? state.currentMana,
            };
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
        case "SET_DAILY_REFILL":
            return {
                ...state,
                dailyRefill: action.payload?.dailyRefill ?? state.dailyRefill,
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
        // case "SET_TON_WALLET_CONNECTED":
        //     return {
        //         ...state,
        //         tonWalletConnected:
        //             action.payload?.tonWalletConnected ??
        //             state.tonWalletConnected,
        //     };
        case "SET_JOINED_TG_CHANNEL":
            return {
                ...state,
                joinedTgChannel:
                    action.payload?.joinedTgChannel ?? state.joinedTgChannel,
            };
        case "SET_PAID_BOOSTER_CLAIM_COUNTER":
            return {
                ...state,
                paidBoosterClaimCounter:
                    action.payload?.paidBoosterClaimCounter ??
                    state.paidBoosterClaimCounter,
            };
        case "SET_PAID_BOOSTER_ORDER_NUM":
            return {
                ...state,
                paidBoosterOrderNum:
                    action.payload?.paidBoosterOrderNum ??
                    state.paidBoosterOrderNum,
            };
        case "SET_PAID_MANA_ORDER_NUM":
            return {
                ...state,
                paidManaOrderNum:
                    action.payload?.paidManaOrderNum ?? state.paidManaOrderNum,
            };
        case "SET_PAID_MANA_CLAIM":
            return {
                ...state,
                paidManaClaim:
                    action.payload?.paidManaClaim ?? state.paidManaClaim,
            };
        case "SET_DREAM_TEAM_INFO":
            return {
                ...state,
                dreamTeamInfo:
                    action.payload?.dreamTeamInfo ?? state.dreamTeamInfo,
            };
        case "SET_QUESTS":
            return {
                ...state,
                quests: action.payload?.quests ?? state.quests,
            };
        case "SET_TASK_STATUS":
            return {
                ...state,
                taskStatus: action.payload?.taskStatus ?? state.taskStatus,
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
        case "SET_BATTLEPASS":
            return {
                ...state,
                battlepass: action.payload?.battlepass ?? state.battlepass,
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
        default:
            return state;
    }
}

export const UserContext = createContext<UserContextValue>({
    username: "",
    id: 0,
    points: 0,
    level: 1,
    pointMultiplier: 1,
    maxMana: 0,
    currentMana: 0,
    tokens: [],
    hasBoughtStarter: false,
    numBoosterBought: 0,
    totalBoosterBought: 0,
    friends: [],
    dailyRefill: true,
    referralCount: 0,
    weeklyReferralCount: 0,
    joinedTournaments: 0,
    hasWonTournament: false,
    // tonWalletConnected: false,
    joinedTgChannel: false,
    paidBoosterClaimCounter: 0,
    paidBoosterOrderNum: "",
    paidManaClaim: false,
    paidManaOrderNum: "",
    dreamTeamInfo: [],
    quests: [],
    taskStatus: [],
    referralCheck: false,
    seasonalLogins: 0,
    battlepass: [],
    premiumMember: false,
    inventory: [],
    referralPurchases: 0,
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
                        type: "SET_LEVEL",
                        payload: { level: data["level"] },
                    });
                    dispatch({
                        type: "SET_POINT_MULTIPLIER",
                        payload: { pointMultiplier: data["pointMultiplier"] },
                    });
                    dispatch({
                        type: "SET_MAX_MANA",
                        payload: { maxMana: data["maxMana"] },
                    });
                    dispatch({
                        type: "SET_CURRENT_MANA",
                        payload: { currentMana: data["currentMana"] },
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
                        type: "SET_DAILY_REFILL",
                        payload: { dailyRefill: data["dailyRefill"] },
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
                    // dispatch({
                    //     type: "SET_TON_WALLET_CONNECTED",
                    //     payload: { tonWalletConnected: data["tonWalletConnected"] },
                    // });
                    dispatch({
                        type: "SET_JOINED_TG_CHANNEL",
                        payload: { joinedTgChannel: data["joinedTgChannel"] },
                    });
                    dispatch({
                        type: "SET_PAID_BOOSTER_CLAIM_COUNTER",
                        payload: {
                            paidBoosterClaimCounter:
                                data["paidBoosterClaimCounter"],
                        },
                    });
                    dispatch({
                        type: "SET_PAID_BOOSTER_ORDER_NUM",
                        payload: {
                            paidBoosterOrderNum: data["paidBoosterOrderNum"],
                        },
                    });
                    dispatch({
                        type: "SET_PAID_MANA_CLAIM",
                        payload: { paidManaClaim: data["paidManaClaim"] },
                    });
                    dispatch({
                        type: "SET_PAID_MANA_ORDER_NUM",
                        payload: { paidManaOrderNum: data["paidManaOrderNum"] },
                    });
                    dispatch({
                        type: "SET_DREAM_TEAM_INFO",
                        payload: { dreamTeamInfo: data["dreamTeamInfo"] },
                    });
                    dispatch({
                        type: "SET_QUESTS",
                        payload: { quests: data["quests"] },
                    });
                    dispatch({
                        type: "SET_TASK_STATUS",
                        payload: { taskStatus: data["taskStatus"] },
                    });
                    dispatch({
                        type: "SET_SEASONAL_LOGINS",
                        payload: { seasonalLogins: data["seasonalLogins"] },
                    });
                    dispatch({
                        type: "SET_BATTLEPASS",
                        payload: { battlepass: data["battlepass"] },
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
                } catch (e) {
                    // console.log("User does not exist. Initializing user");
                    // if (lp.startParam) {
                    //     console.log("Found referral link");
                    //     data = createUser(lp.initData.user.id);

                    //     updateReferrals(lp.startParam, {
                    //         userID: lp.initData.user.id,
                    //         userName: lp.initData.user.username,
                    //     });
                    // } else {
                    //     data = createUser(lp.initData.user.id);
                    // }
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

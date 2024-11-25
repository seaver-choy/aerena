import { TonClient } from "@ton/ton";
import { CHAIN, useTonWallet } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export const useAsyncInitialize = <T>(
    func: () => Promise<T>,
    deps: unknown[] = []
) => {
    const [state, setState] = useState<T | undefined>();

    useEffect(() => {
        (async () => {
            setState(await func());
        })();
    }, deps);

    return state;
};

export const useTonClient = () => {
    const wallet = useTonWallet();

    const network = wallet?.account?.chain ?? null;
    const [client, setClient] = useState<TonClient>();

    useAsyncInitialize(async () => {
        if (!network) return;

        console.log("Network", network);
        const endpoint = await getHttpEndpoint({
            network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
        });

        console.log("endpoint", endpoint);

        const tonClient = new TonClient({ endpoint });
        setClient(tonClient);
    }, [network]);

    return {
        client,
    };
};

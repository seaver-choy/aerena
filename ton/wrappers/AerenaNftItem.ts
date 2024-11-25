import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
} from "@ton/core";

export type NftItemConfig = {};

export function nftItemConfigToCell(config: NftItemConfig): Cell {
    return beginCell().endCell();
}

export class AerenaNftItem implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell }
    ) {}

    static createFromAddress(address: Address) {
        return new AerenaNftItem(address);
    }

    static createFromConfig(config: NftItemConfig, code: Cell, workchain = 0) {
        const data = nftItemConfigToCell(config);
        const init = { code, data };
        return new AerenaNftItem(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getItemData(provider: ContractProvider) {
        const { stack } = await provider.get("get_nft_data", []);
        console.log("NFT ITEM DATA", stack);
        const init = stack.readNumber();
        const nftId = stack.readNumber();

        return {
            init,
            nftId,
            collection: stack.readAddress(),
            owner: stack.readAddress(),
            content: stack.readString(),
        };
    }
}

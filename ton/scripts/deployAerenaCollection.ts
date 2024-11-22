import { Address, Cell, beginCell } from "@ton/core";
import { toNano } from "@ton/core";
import { AerenaCollection } from "../wrappers/AerenaCollection";
import { AerenaNftItem } from "../wrappers/AerenaNftItem";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
    const compiled = await compile("AerenaCollection");
    const owner: any = provider.sender().address?.toString();
    const item = await compile("AerenaNftItem");
    const royalty = Cell.EMPTY;

    const params = {
        owner: Address.parse(owner),
        content:
            "https://magenta-occasional-cicada-332.mypinata.cloud/ipfs/QmTyh3n8dxRFRSYSLA4ZnDYaCBPhUS7oYNSDLwQvmNqeVk",
        item: item,
        royalty: royalty,
    };
    const aerenaCollection = provider.open(
        AerenaCollection.createFromConfig(params, compiled)
    );

    await aerenaCollection.sendDeploy(provider.sender(), toNano("0.05"));

    await provider.waitForDeploy(aerenaCollection.address);

    await aerenaCollection.sendMint(provider.sender(), {
        queryId: 0,
        nftAmount: toNano("0.05"),
        nftId: 0,
        owner: Address.parse(
            "UQDC76OniBYJPpP_1uIuq1NUcQBmQUbnLIxaiaV2YNBb6OuC"
        ),
        contentUri: "",
        gas: toNano("0.01"),
    });

    await provider.waitForDeploy(aerenaCollection.address);
    // run methods on `aerenaCollection`
}

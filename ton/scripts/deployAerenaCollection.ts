import { compile, NetworkProvider } from "@ton/blueprint";
import { Address, Cell, toNano } from "@ton/core";
import { AerenaCollection } from "../wrappers/AerenaCollection";

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
        AerenaCollection.createFromConfig(params, compiled, -1)
    );

    await aerenaCollection.sendDeploy(provider.sender(), toNano("0.5"));

    await provider.waitForDeploy(aerenaCollection.address);

    await aerenaCollection.sendMint(provider.sender(), {
        queryId: 0,
        nftAmount: toNano("0.05"),
        nftId: 0,
        owner: Address.parse(
            "0QBhS-wujl9vYcuzW6ZcQSKf4FU2p_EHXLN3PN609UtsQLsd"
        ),
        contentUrl: "https://magenta-occasional-cicada-332.mypinata.cloud/ipfs/QmTyh3n8dxRFRSYSLA4ZnDYaCBPhUS7oYNSDLwQvmNqeVk",
        gas: toNano("0.2"),
    });

    await provider.waitForDeploy(aerenaCollection.address);
    // run methods on `aerenaCollection`
}

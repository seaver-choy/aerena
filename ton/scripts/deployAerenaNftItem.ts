import { toNano } from "@ton/core";
import { AerenaNftItem } from "../wrappers/AerenaNftItem";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
    const nftItem = provider.open(
        AerenaNftItem.createFromConfig({}, await compile("AerenaNftItem"))
    );

    await nftItem.sendDeploy(provider.sender(), toNano("0.05"));

    await provider.waitForDeploy(nftItem.address);

    // run methods on `nftItem`
}

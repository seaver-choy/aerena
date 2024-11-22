import { toNano } from '@ton/core';
import { AerenaCollection } from '../wrappers/AerenaCollection';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const aerenaCollection = provider.open(AerenaCollection.createFromConfig({}, await compile('AerenaCollection')));

    await aerenaCollection.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(aerenaCollection.address);

    // run methods on `aerenaCollection`
}

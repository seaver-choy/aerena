import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { AerenaCollection } from '../wrappers/AerenaCollection';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('AerenaCollection', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('AerenaCollection');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let aerenaCollection: SandboxContract<AerenaCollection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        aerenaCollection = blockchain.openContract(AerenaCollection.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await aerenaCollection.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: aerenaCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and aerenaCollection are ready to use
    });
});

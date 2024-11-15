import { Address, Cell, TonClient } from "ton";
import { isNftItemContract } from "./isNftItemContract";

describe('nft detector', () => {
    it('should detect nft', async () => {
        const client = new TonClient({
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
            apiKey: 'd501ac81fedb6859076f536cbdadeaa2759e0ddd19d42e8d7ef7f0fd3cdeb062'
        })

        const address = Address.parse('EQCNtVgiIbVGXlBClDApbQjTUC_Zm_V8IhgUcwz8OS08-NgX')
        const res = await client.getContractState(address)

        const code = Cell.fromBoc(res.code!)[0]
        const data = Cell.fromBoc(res.data!)[0]

        const isCollection = await isNftItemContract(address, code, data)

        expect(isCollection).toBe(true)
    })
})
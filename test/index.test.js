import * as eosjsLight from '../src/eosjs-light';
import xhr from 'xmlhttprequest';

const MAINNET_CHAIN_ID='aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

test("get info mainnet (xhr)", async () => {
  expect.assertions(1);
  const eosRpc = eosjsLight.JsonRpc("https://api.eoslaomao.com", {XMLHttpRequest: xhr});
  const result = await eosRpc.get_info();
  expect(result.chain_id).toBe(MAINNET_CHAIN_ID);
});

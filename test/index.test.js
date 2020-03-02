const eosjsLight = require('../dist/eosjs-light.js');
const {XMLHttpRequest} = require('xmlhttprequest');
const fetch = require('node-fetch');

const MAINNET_CHAIN_ID='aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

test("get info mainnet (xhr)", async () => {
  expect.assertions(1);
  const eosRpc = eosjsLight.JsonRpc("https://api.eoslaomao.com", {XMLHttpRequest: XMLHttpRequest});
  try{
    const result = await eosRpc.get_info();
    expect(result.chain_id).toBe(MAINNET_CHAIN_ID);
  }catch(err){
    console.error(err);
    expect(err).toBe(-1);
    return;
  }
});

test("get info mainnet (fetch)", async () => {
  expect.assertions(1);
  const eosRpc = eosjsLight.JsonRpc("https://api.eoslaomao.com", {fetch: fetch});
  try{
    const result = await eosRpc.get_info();
    expect(result.chain_id).toBe(MAINNET_CHAIN_ID);
  }catch(err){
    console.error(err);
    expect(err).toBe(-1);
    return;
  }
});

const addEthereumChainParams = [{
  chainId: '0x38',
  chainName: 'Binance1 Smart Chain',
  nativeCurrency: {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18
},
rpcUrls: ['https://bsc-dataseed.binance.org/'],
  iconUrls: [],
  blockExplorerUrls: ['https://bscscan.com/'],
}]

function sendAsync(method, params=[]) {
  console.log('sendAsync...')
  window.ethereum.sendAsync({
    id: 'hello',
    method,
    params,
  }, (a, b) => { 
    console.log(a, b) 
  })
}

function send(method, params=[]) {
  console.log('send...')
  window.ethereum.send({
    id: 'hello2',
    method,
    params,
  }, (a, b) => { 
    console.log(a, b) 
  })
}

async function request(method, params=[]) {
  console.log(await window.ethereum.request({
    id: '191',
    method,
    params,
  }))
}

async function enable() {
  console.log(await window.ethereum.enable())
}

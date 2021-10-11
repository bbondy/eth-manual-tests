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

async function sign(message, method) {
  const accounts = await window.ethereum.request({
    id: '191',
    method: 'eth_accounts',
    params: [],
  })
  if (accounts.length === 0) {
    console.log('No accounts allowed')
    return
  }
  const account = accounts[0]
  const params = [account, message]
  if (method == 'request') {
    return request('eth_sign', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('eth_sign', params)
  }
  if (method == 'send') {
    return send('eth_sign', params)
  }
}

async function sendTransaction(is1559, method) {
  const accounts = await window.ethereum.request({
    id: '191',
    method: 'eth_accounts',
    params: [],
  })
  if (accounts.length === 0) {
    console.log('No accounts allowed')
    return
  }
  const from = accounts[0]
  const to = accounts[0]
  const params = [{
    from,
    to,
    value: '0x25F38E9E00'
  }]
  if (is1559) {
    params.max_priority_fee_per_gas = '0x00F38E9E00'
    params.max_fee_per_gas = '0x25F38E9E00'
  } else {
    params.gasPrice = '0x25F38E9E00'
  }

  if (method == 'request') {
    return request('eth_sendTransaction', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('eth_sendTransaction', params)
  }
  if (method == 'send') {
    return send('eth_sendTransaction', params)
  }
}

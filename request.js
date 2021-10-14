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

async function sendTransaction(is1559, method, toInput) {
  const to = document.querySelector(toInput).value
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
  const params = [{
    from,
    to,
    value: '0x16345785D8A0000'
  }]
  // Explicit check here so that undefined is also posible for neither gas fields
  if (is1559 === true) {
    params[0].maxPriorityFeePerGas = '0x00F38E9E00'
    params[0].maxFeePerGas = '0x25F38E9E00'
  } else if (is1559 === false) {
    params[0].gasPrice = '0x25F38E9E00'
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

window.ethereum.on('connect', function (chainId) {
  console.log('connect event: ', chainId)
})

window.ethereum.on('disconnect', function (error) {
  console.log('disconnect event: ', error)
})

window.ethereum.on('chainChanged', function (chainId) {
  console.log('chainChanged event: ', chainId)
})

window.ethereum.on('accountsChanged', function (accounts) {
  console.log('accountsChanged event: ', accounts)
})


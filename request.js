const addEthereumChainParams = [{
  chainId: '0x38',
  chainName: 'Binance1 Smart Chain',
  nativeCurrency: { name: 'BNB',
  symbol: 'BNB',
  decimals: 18
},
rpcUrls: ['https://bsc-dataseed.binance.org/'],
  iconUrls: [],
  blockExplorerUrls: ['https://bscscan.com/'],
}]

const switchEthereumChainParams = [{
  chainId: "0x4"
}]
const switchEthereumChainParams2 = [{
  chainId: "0x3"
}]

const addTokenParams = [{
  type: 'ERC20',
  options: {
    address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
    symbol: "ZRX",
    decimals: 18,
    image: "zrx.png"
  }
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

async function signTransaction(is1559, method, toInput) {
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
    return request('eth_signTransaction', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('eth_signTransaction', params)
  }
  if (method == 'send') {
    return send('eth_signTransaction', params)
  }
}

async function sendRawTransaction(method, txInput) {
  const tx = document.querySelector(txInput).value
  const params = [tx]

  if (method == 'request') {
    return request('eth_sendRawTransaction', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('eth_sendRawTransaction', params)
  }
  if (method == 'send') {
    return send('eth_sendRawTransaction', params)
  }
}

async function sign(method, messageInput) {
  const message = document.querySelector(messageInput).value
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
  const params = [from, message]

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

async function personalSign(method, messageInput) {
  const message = document.querySelector(messageInput).value
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
  const params = [message, from]

  if (method == 'request') {
    return request('personal_sign', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('personal_sign', params)
  }
  if (method == 'send') {
    return send('personal_sign', params)
  }
}

async function signTypedData(method, messageInput) {
  const message = {
    "types":{
      "EIP712Domain":[
        {"name":"name","type":"string"},
        {"name":"version","type":"string"},
        {"name":"chainId","type":"uint256"},
        {"name":"verifyingContract","type":"address"}],
      "Person":[
        {"name":"name","type":"string"},
        {"name":"wallet","type":"address"}],
      "Mail":[
        {"name":"from","type":"Person"},
        {"name":"to","type":"Person"},
        {"name":"contents","type":"string"}]},
      "primaryType":"Mail",
      "domain":{
        "name":"Ether Mail",
        "version":"1",
        "chainId":1,
        "verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},
      "message":{
        "from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},
        "to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},
        "contents":"Hello, Bob!"
      }
    }
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
  const params = [from, JSON.stringify(message)]

  if (method == 'request') {
    return request('eth_signTypedData_v3', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('eth_signTypedData_v3', params)
  }
  if (method == 'send') {
    return send('eth_signTypedData_v3', params)
  }
}

async function signTypedData_v4(method, messageInput) {
  const message = {
    "types":{
      "EIP712Domain":[
        {"name":"name","type":"string"},
        {"name":"version","type":"string"},
        {"name":"chainId","type":"uint256"},
        {"name":"verifyingContract","type":"address"}],
      "Person":[
        {"name":"name","type":"string"},
        {"name":"wallet","type":"address"}],
      "Mail":[
        {"name":"from","type":"Person"},
        {"name":"to","type":"Person[]"},
        {"name":"contents","type":"string"}]},
      "primaryType":"Mail",
      "domain":{
        "name":"Ether Mail",
        "version":"1",
        "chainId":1,
        "verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},
      "message":{
        "from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},
        "to": [
          {"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},
          {"name":"Alice","wallet":"0xaAaAAAAaaAAAaaaAaaAaaaaAAaAaaaaAaAaaAAaA"},
        ],
        "contents":"Hello, Bob & Alice!"
      }
    }
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
  const params = [from, JSON.stringify(message)]

  if (method == 'request') {
    return request('eth_signTypedData_v4', params)
  }
  if (method == 'sendAsync') {
    return sendAsync('eth_signTypedData_v4', params)
  }
  if (method == 'send') {
    return send('eth_signTypedData_v4', params)
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


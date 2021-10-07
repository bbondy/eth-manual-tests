function sendAsync(method) {
  console.log('sendAsync...')
  window.ethereum.sendAsync({
    id: 'hello',
    method,
    params: [],
  }, (a, b) => { 
    console.log(a, b) 
  })
}

function send(method) {
  console.log('send...')
  window.ethereum.send({
    id: 'hello2',
    method,
    params: [],
  }, (a, b) => { 
    console.log(a, b) 
  })
}

async function request(method) {
  console.log(await window.ethereum.request({
    id: '191',
    method,
    params: [],
  }))
}


const ethers = require('ethers');
const fs = require('fs');

const MESSAGE = "RFI: I confirm that I own this wallet.";

async function publishSignature(signature, address) {
    try {
        const resp = await fetch('https://etherscan.io/verifiedSignatures.aspx/VerifyMessageSignature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address,
                messageSignature: signature,
                messageRaw: MESSAGE,
                saveOption: '1'
            })
        })

        const json = await resp.json();

        return {success: true, json: json}
    } catch(e) {return {success: false, err: e}}
}

async function main() {
    console.log('Made by t.me/cookiejunkieeth')
    const wallets = fs.readFileSync('./wallets.txt').toString().split('\n');

    for(let wallet of wallets) {
        wallet = new ethers.Wallet(wallet);

        const msg = await wallet.signMessage(MESSAGE);

        const {success, json} = await publishSignature(msg, wallet.address);
        if(!success) { console.log(json, resp); continue }

        const id = json.d.verifiedMessageLocation.split('/').pop();

        console.log(wallet.address, id);
        fs.appendFileSync('./result.txt', `${wallet.address}:${id}\n`)
    }
}

main()
const ethers = require('ethers');
const fs = require('fs');

const MESSAGE = "RFI: I confirm that I own this wallet.";

async function main() {
    console.log('Made by t.me/cookiejunkieeth')
    const wallets = fs.readFileSync('./wallets.txt').toString().split('\n');

    for(let wallet of wallets) {
        wallet = new ethers.Wallet(wallet);

        const msg = await wallet.signMessage(MESSAGE);
        console.log(wallet.address, msg);
        fs.appendFileSync('./result.txt', `${wallet.address}:${msg}`)
    }
}

main()
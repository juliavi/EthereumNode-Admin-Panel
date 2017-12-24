var     nodeType = 'geth';

window.addEventListener('load', function() {

  // Web3 was injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - local node
    var provider = document.getElementById('provider_url').value;
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider)); //'http://localhost:8545'

    //for running the local geth node, exec this in the shell -
    //geth --testnet  --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./data"
  }
  startApp()

});

function    startApp(){
    if (web3 && web3.isConnected()) {
        setData('connect_status','Connected', false);
        setWeb3Version();
    } else {
        setData('connect_status','Not Connected', true);
    }
}

function Connect()    {
    var provider = document.getElementById('provider_url').value;
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
    startApp();
}

function    setWeb3Version() {
    var versionJson = {};

    web3.version.getNode(function(error, result){
        if(error) setData('version_information',error,true);
        else {
            setData('version_information',result,false);

            if(result.toLowerCase().includes('metamask')){
                nodeType = 'metamask';
            } else if(result.toLowerCase().includes('testrpc')){
                nodeType = 'testrpc';
            } else {
                nodeType = 'geth';
            }
        }
    });
}

function setData(docElementId, html, errored) {
    document.getElementById(docElementId).innerHTML = html;
    if (errored) document.getElementById(docElementId).classList = 'notready';else document.getElementById(docElementId).classList = 'ready';
}

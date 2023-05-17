const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  
  const merkleTree = new MerkleTree(niceList);

  //Name to prove being on the nicelis
  const myName = 'kalf derek';

  //Get the index of the name in the list
  const myIndex = niceList.findIndex(n => n === myName);

  //if name is not in the list, return false
  if(myIndex === -1) {
    console.log("You are not on the list :(");
    return;
  }

  //Generate the proof of the name
  const proof = merkleTree.getProof(myIndex);


  //send the name and its proof to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: myName,
    proof: proof,
  });

  console.log({ gift });
}

main();
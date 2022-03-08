async function main() {
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const KeyboardsContractFactory = await hre.ethers.getContractFactory(
    "Keyboards"
  );
  const keyboardsContract = await KeyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
  const keyboardTxnReceipt = await keyboardTxn1.wait();
  console.log(keyboardTxnReceipt.events);

  const keyboardTxn2 = await keyboardsContract
    .connect(somebodyElse)
    .create(1, false, "grayscale");
  await keyboardTxn2.wait();

  const balanceBefore = await hre.ethers.provider.getBalance(
    somebodyElse.address
  );
  console.log(
    "somebodyElse balance before!",
    hre.ethers.utils.formatEther(balanceBefore)
  );

  const tipTxn = await keyboardsContract.tip(1, {
    value: hre.ethers.utils.parseEther("1000"),
  }); // tip the 2nd keyboard as owner!
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);

  const balanceAfter = await hre.ethers.provider.getBalance(
    somebodyElse.address
  );
  console.log(
    "somebodyElse balance after!",
    hre.ethers.utils.formatEther(balanceAfter)
  );

  const ownerBalanceAfter = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    "Ownere balance after!",
    hre.ethers.utils.formatEther(ownerBalanceAfter)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const {ethers} = require("ethers");
const {abi:QuoterAbi} = require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json');

const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/EeROtFDA4x3sRuhLMPSlPKtp4IHlyL4A"
)



const getPrice = async(from,to,hValue)=>{
    const QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

    const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        QuoterAbi,
        provider
      )
    
    const amountIn = ethers.utils.parseUnits(hValue,18);  
    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        from,
        to,
        3000,
        amountIn.toString(),
        0
      )
    
    const amount = ethers.utils.formatUnits(quotedAmountOut.toString(),18)

    return amount
}

const main = async()=>{
    const fromAddress="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //WETH. Basically first token address
    const toAddress="0x6B175474E89094C44Da98b954EedeAC495271d0F";//DAI.

    const humanValue = "1";
    const result = await getPrice(fromAddress,toAddress,humanValue)
    console.log(result); 

}

main()
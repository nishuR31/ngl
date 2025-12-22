const sleep:(data:number)=>Promise<void> = (ms) => new Promise((res) => setTimeout(res, ms));
export default sleep;
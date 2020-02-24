// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释

function calculatePrice() {
  let inputString=[];
  for(let i in itemInfo)
  {
    let id='input'+i;
    let num = document.getElementById(id).value;
    if(num>0)
    {
      let Str=itemInfo[i].id+' x '+num;
      inputString.push(Str);
    }
  }
  let resultString = bestCharge(inputString)
  document.getElementById("message").innerHTML =resultString;
}

function Clear() {
  for (let i in itemInfo) {
    let id = 'input' + i;
    document.getElementById(id).value = '0';
    document.getElementById("message").innerHTML ='/* 请将结算后产生的汇总字符串显示在这里 */';
  }
}


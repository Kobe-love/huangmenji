function bestCharge(inputString) {

  let ItemJson=GetInput(inputString);

  let CostJson=CalcCost(ItemJson);

  let ResultString=PrintResult(ItemJson,CostJson);

  return ResultString;
}

function GetInput(inputString){
  let itemJson=[];
  let ItemInfo=loadAllItems();

  for(let index in inputString)
  {
    let itemName=inputString[index].split(' ')[0];
    let itemNum=inputString[index].split(' ')[2];

    for(let i in ItemInfo)
    {
      if (ItemInfo[i].id==itemName)
      {
        let addItem = {};
        addItem.id=ItemInfo[i].id;
        addItem.name=ItemInfo[i].name;
        addItem.num=itemNum;
        addItem.price=ItemInfo[i].price; itemJson.push(addItem); break;
      }
    }
  }
  return itemJson;
}

function CalcCost(itemJson){
  console.log("CalCost", itemJson)
  let Promotion=loadPromotions();

  //满30减6折扣计算
  let cost1=0;
  for(let i in itemJson)
  { cost1+=itemJson[i].price*itemJson[i].num;}

  //指定菜品半价折扣计算
  let cost2=0;
  let cost2Discount=0;
  let cost2NameArray=[];
  for(let j in itemJson)
  {
    if(Promotion[1].items.indexOf(itemJson[j].id)>=0)
    {
      cost2NameArray.push(itemJson[j].name); //记录打折菜品名称
      cost2+=(itemJson[j].price/2*itemJson[j].num);
      cost2Discount+=(itemJson[j].price/2*itemJson[j].num); //记录减免金额
    }
    else
    { cost2+=itemJson[j].price*itemJson[j].num;}
  }

  let cost1String = Promotion[0].type+'，省6元';
  let cost2String=Promotion[1].type+'(';

  for(let i in cost2NameArray)
  {
    cost2String+=cost2NameArray[i]+'，';
  }
  cost2String=cost2String.substr(0, cost2String.length - 1);
  cost2String+=')，省'+ cost2Discount.toString()+'元';
  cosole.log("end",cost2String)
  let costJson={};
  costJson.string='';
  costJson.cost=0;
  if(cost1<30 &&cost2Discount==0)
  { costJson.cost=cost1;}
  else
  {
    if(cost1>=30)
    {
      if((cost1-6)<=cost2)
      { costJson.string=cost1String;costJson.cost=cost1-6;}
      else
      { costJson.string=cost2String;costJson.cost=cost2;}
    }
    else
    { costJson.string=cost2String;costJson.cost=cost2;}
  }
  console.log("costJSon",costJson);
  return costJson;
  
}

function PrintResult(itemJson,costJson){
  let resultString='';
  resultString+='============= 订餐明细 =============\n';
  for(let i in itemJson)
  {
    let Str=itemJson[i].name+' x '+itemJson[i].num+' = '+itemJson[i].num*itemJson[i].price+'元\n';
    resultString+=Str;
  }
  resultString+='-----------------------------------\n';
  if(costJson.string!='')
  {
    resultString+='使用优惠:\n';
    resultString+=costJson.string+'\n';
    resultString+='-----------------------------------\n';
  }
  resultString+='总计：'+costJson.cost+'元'+'\n';
  resultString+='===================================';
  return resultString;
}

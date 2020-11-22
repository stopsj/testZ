//声明常量
let TIME=new Date(2020,07,01);
TIME.setHours(0,0,0,0);

aKey=0;//休息0，白班1，值班2

//只保留天数去除小时分钟
function cutHM(date){
  date.setHours(0,0,0,0);
  return date;
}
//毫秒转换成天数
function mToDay(m){
  return m/1000/60/60/24;
}
//天数判断
function daySum(oldTime,newTime){
  oldTime=cutHM(oldTime);
  newTime=cutHM(newTime);
  
  let daySum=0;
  daySum=mToDay(newTime.getTime()-oldTime.getTime());
  return daySum;
}

let a=new Date(2020,10,19);
let b=new Date(TIME);

let day=daySum(b,a);
//对3取余
function quyu(sumDay){
  return (sumDay)%3;
}
//白值班不同班换算
//ZTkey=0，ZGFkey=1，CDkey=2
function showWork(key,quyuDay){
  if(key==0){
    return quyuDay=(quyuDay+1)%3;
  }
  if(key==1){
    return quyuDay;
  }
  if(key==2){
    return quyuDay=(quyuDay+2)%3;
  }
}
//输入日期和组别，返回白值休
function overWork(time,key){
  let dayMuch=daySum(TIME,time);
  let quyuDay=quyu(dayMuch);
  let workKey=showWork(key,quyuDay);
  if(workKey==0){
    return "休息";
  }
  if(workKey==1){
    return "白班";
  }
  if(workKey==2){
    return "值班";
  }
  return key;
}
//获取DOM
const TeamBut=document.getElementById("teamChose");
const showText=document.getElementById("showText");
const dateInput=document.getElementById("dateIput");
//绑定按钮
TeamBut.addEventListener('click',refuse);
//周几判断 0-6
function week(date){
  return date.getDay();
}

//按钮主函数
function refuse(){
  let work="真乖"
  let key=0;
  let teamChose=document.getElementsByName('teamRadio');
  for(let a=0;a<teamChose.length;a++){
    if(teamChose[a].checked){
      key=teamChose[a].value;
    }
  }
  let setDate=dateInput.value;
  let dd=new Date(setDate);
  showText.innerHTML=overWork(dd,key)+" "+"这天是周"+week(dd)+",(0代表周日)"
  ;
  
}
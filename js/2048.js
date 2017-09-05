/**
 * name:    henyuan
 * email:   lsq2015@outlook.com
 * desc:    小游戏2048的核心函数
 */
// 获取随机数
function getIndex(max){return Math.floor(Math.random()*16);}
// 刷新数据
function setView(){
    $(".sum span").text(sum);
    data.forEach(function(val,ins){
        if(val === 2048 && !game){
            game = true;
            alert("恭喜您，胜利啦!");
        }
        if(val === 0){
            $('.i'+ins+'>span').text("").css("background",myColor(0));
        }else{
            $('.i'+ins+'>span').text(val).css("background",myColor(val));
        }
    })
}
// 初始数据
function getStart(arr){
    var empty = 0;
    arr.forEach(function(val){
        if(val === 0) empty++;
    })
    if(empty>=2){
        var ins1 = getIndex(16);
        var ins2 = getIndex(16);
        while(arr[ins1]!=0){ins1 = getIndex(16);}
        while(arr[ins2]!=0 || ins1 === ins2){ins2 = getIndex(16);}
        arr[ins1] = 2;
        arr[ins2] = 2;
    }
    if(empty==1){
        var ins1 = getIndex(16);
        while(arr[ins1]!=0){ins1 = getIndex(16);}
        arr[ins1] = 2;
    }
    return arr;
}
// 向左合并
function run_left(count = true){
    var data1 = mySort(data.slice(0,4),count);
    var data2 = mySort(data.slice(4,8),count);
    var data3 = mySort(data.slice(8,12),count);
    var data4 = mySort(data.slice(12,16),count);
    var end = [].concat(data1,data2,data3,data4);
    return end;
}
// 向上合并
function run_top(count = true){
    var data1 = mySort([data[0],data[4],data[8],data[12]],count);
    var data2 = mySort([data[1],data[5],data[9],data[13]],count);
    var data3 = mySort([data[2],data[6],data[10],data[14]],count);
    var data4 = mySort([data[3],data[7],data[11],data[15]],count);
    var end = [];
    for(var i=0;i<4;i++){
        end.push(data1[i]);
        end.push(data2[i]);
        end.push(data3[i]);
        end.push(data4[i]);
    }
    return end;
}
// 向下合并
function run_bottom(count = true){
    var data1 = mySort([data[12],data[8],data[4],data[0]],count);
    var data2 = mySort([data[13],data[9],data[5],data[1]],count);
    var data3 = mySort([data[14],data[10],data[6],data[2]],count);
    var data4 = mySort([data[15],data[11],data[7],data[3]],count);
    var end = [];
    for(var i=3;i>-1;i--){
        end.push(data1[i]);
        end.push(data2[i]);
        end.push(data3[i]);
        end.push(data4[i]);
    }
    return end;
}
function run_right(count = true){
    var data1 = mySort([data[3],data[2],data[1],data[0]],count).reverse();
    var data2 = mySort([data[7],data[6],data[5],data[4]],count).reverse();
    var data3 = mySort([data[11],data[10],data[9],data[8]],count).reverse();
    var data4 = mySort([data[15],data[14],data[13],data[12]],count).reverse();
    var end = [].concat(data1,data2,data3,data4);
    return end;
}
// 合并方法
function mySort(arr,count){
    for(var i = 0;i<arr.length;i++){
        for(var j = i+1;j<arr.length;j++){
            if(arr[i]===0 && arr[j] != 0){
                arr[i] = arr[j];
                arr[j] = 0;
                break;
            }
        }
    }// 数组前置清空空余
    for(var i = 0;i<arr.length - 1;i++){
        if(arr[i] === arr[i+1]){
            arr[i] += arr[i+1];
            sum = count ? sum + arr[i] : sum;
            arr[i+1]=0;
        }
    }// 同数相加
    for(var i = 0;i<arr.length;i++){
        for(var j = i+1;j<arr.length;j++){
            if(arr[i]===0 && arr[j] != 0){
                arr[i] = arr[j];
                arr[j] = 0;
                break;
            }
        }
    }// 再次前置清空空余
    return arr;
}
// 颜色表
function myColor(ins){
    var color = "";
    switch (ins) {
        case 2:color="#FFE4C4";break;
        case 4:color="#FFEC8B";break;
        case 8:color="#FFC125";break;
        case 16:color="#FF7F24";break;
        case 32:color="#FF4040";break;
        case 64:color="#FF1493";break;
        case 128:color="#FF00FF";break;
        case 256:color="#FF0000";break;
        case 512:color="#EE00EE";break;
        case 1024:color="#404040";break;
        case 2048:color="#EEEE00";break;
        case 4096:color="#8B2252";break;
        case 8192:color="#0A0A0A";break;
        default:color="#cccccc";break;
    }
    return color;
}
// 判断设备
function IsPC()  
{  
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}       
var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var sum = 0;
var game = false;
data = getStart(data);
setView();
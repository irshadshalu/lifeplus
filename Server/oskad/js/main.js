var obj,prev;
function geti(s){
    return document.getElementById(s);
}
$.ajax({
  type: "POST",
  url: "http://54.68.166.147/getlist.php",
  
                      success:function(data)
                      {
                          prev=JSON.parse(data).length;
                         display(data);
                          
                      }
});
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe() {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Life Plus', {icon:'http://54.68.166.147/oskad/logo.png',
      body: "Critical incident reported, please be alert",
    });

 //   notification.onclick = function () {
 //     window.open("http://54.68.166.147/oskad/");      
//    };
//setTimeout(function(){notification.cancel();},2000);

  }

}
function customAlert(s){
    geti('vm_alert_bar').innerHTML="<span>"+s+"</span>";
  geti('vm_alert_bar').style.opacity='1';
    setTimeout(function(){
        
   geti('vm_alert_bar').style.opacity='0';
    },2000);
}
setInterval(function(){
    
$.ajax({
  type: "POST",
  url: "http://54.68.166.147/getlist.php",
  
                      success:function(data)
                      {
                         display(data);
                      },fail:function(data)
    {
        customalert("please check network connection");
    }
});
    
}
,500);
function display (retrieveDataJson){           
    obj = JSON.parse(retrieveDataJson);
    document.getElementById('maintable').innerHTML="";
   for(i=1;i<=obj.length;i++)
   {      
       if(obj[i].severity=="5"){
           document.getElementById('maintable').innerHTML+="<tr class='danger' style='color:crimson'><td class='col-xs-2'>"+obj[i].slno+"</td><td class='col-xs-2'>"+obj[i].type+"</td><td class='col-xs-2'>"+obj[i].name+"</td><td class='col-xs-2'>"+obj[i].status+"</td><td class='col-xs-2'>"+obj[i].address+"<td class='col-xs-2'><a class='btn btn-success' target='_blank' href='http://maps.google.com?q="+obj[i].loc+"'>Show on map</a></td></tr>";
      }
       else if(obj[i].severity=="4" || obj[i].severity=="3")
           document.getElementById('maintable').innerHTML+="<tr class='warning' style='color:black'><td class='col-xs-2'>"+obj[i].slno+"</td><td class='col-xs-2'>"+obj[i].type+"</td><td class='col-xs-2'>"+obj[i].name+"</td><td class='col-xs-2'>"+obj[i].status+"</td><td class='col-xs-2'>"+obj[i].address+"<td class='col-xs-2'><a class='btn btn-success' target='_blank' href='http://maps.google.com?q="+obj[i].loc+"'>Show on map</a></td></tr>";
       else
           document.getElementById('maintable').innerHTML+="<tr class=''><td class='col-xs-2'>"+obj[i].slno+"</td><td class='col-xs-2'>"+obj[i].type+"</td><td class='col-xs-2'>"+obj[i].name+"</td><td class='col-xs-2'>"+obj[i].status+"</td><td class='col-xs-2'>"+obj[i].address+"<td class='col-xs-2'><a class='btn btn-success' target='_blank' href='http://maps.google.com?q="+obj[i].loc+"'>Show on map</a></td></tr>";
   } if(obj.length>prev){ notifyMe(); customAlert("Critical Accident Occurred ");}
   
prev=obj.length;
}

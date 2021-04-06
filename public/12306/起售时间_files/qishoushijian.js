$(function(){
	var city = typeof KYFW.qishoushijian_city != "undefined" && "" != KYFW.qishoushijian_city ? KYFW.qishoushijian_city : window.sessionStorage.getItem('qishoushijian_city');
	city = city ? city : "北京";
	showYishoushijian(city);
	$(document).ready(function() {
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		});
	});
});
function showYishoushijian(city){
	$('#J_depart_name').val(city);
	
	$('.zepto-pop-loading').show();
	$.ajax({
		url : ctx + "wxcore/queryQssj",
		type : "get",
		beforeSend: function (request){
			request.setRequestHeader("If-Modified-Since","0");
			request.setRequestHeader("Cache-Control","no-cache");
		},
		data : {
			"stationName":city,
		},
		success : function(response){
			$('.zepto-pop-loading').hide();
			var data=response.data;
			if (data&&data.length>0) {
				var $html=[];
				for(var k=0,size=data.length;k<size;k++){
					var obj=data[k];
					$html.push(obj['name']+'站'+obj['value']+'起售<br/>');
				}
				$('#qishoushijian').html($html.join(''));
			}else{
				$('#qishoushijian').html("没有查询到"+city+"站的起售时间<br/>");
			}
		},
		error:function(){
			toast('您的网络可能存在问题！');
			$('.zepto-pop-loading').hide();
		}
	});	
	
	/*if(city && citys[city]){
		//$('#qishoushijian').html(city+"站"+citys[city]+"起售<br/><br/>*全路城际/动车C/D字头列车11:00起售<br/><br/>*全路高铁G字头列车14:00起售");
		$('#qishoushijian').html(city+"站"+citys[city]+"起售<br/>");
	}else{
		//$('#qishoushijian').html("没有查询到"+city+"站的起售时间<br/><br/>*全路城际/动车C/D字头列车11:00起售<br/><br/>*全路高铁G字头列车14:00起售");
		$('#qishoushijian').html("没有查询到"+city+"站的起售时间<br/>");
	}*/
}
function showindex(hideid){
	$("#"+hideid).animate({
		width: '0%'
	}, "fast",'',function(){
		document.getElementById('indexPage').style.overflow = 'hide';
		$('#indexPage').show();
	});
}

function initShowCity(){
	var _html = '',arr =[];

	var citylist = getfrecitylist();
	if(citylist){
		arr = citylist.substring(1).split('@');
	}
	if (arr.length > 0) {
		for(var k in arr){
            var obj = arr[k].split('|');
            if(arr[k]=='')continue;
            _html += '<li onclick="setFreCity(\''+obj[1]+'\',\''+obj[2]+'\');" class="station-item" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
        }
	} else {
		_html += '<li class="station-item">暂无数据</li>';
	}
	$('#his_citybox').html(_html);

	_html = '',
	arr = favorite_names.split('@');
	if (arr.length > 0) {
		for(var k in arr){
            var obj = arr[k].split('|');
            if(arr[k]=='')continue;
            _html += '<li onclick="setFreCity(\''+obj[1]+'\',\''+obj[2]+'\');" class="station-item" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
        }
	} else {
		_html += '<li class="station-item">暂无数据</li>';
	}
	$('#hot_citybox').html(_html);

	_html = '';
	arr = station_names.substring(1).split('@');
	arr = arr.sort();
	if(arr.length>0){
        var ch = '';
        for(var k in arr){
            var obj = arr[k].split('|');
            if(obj[0].substring(0,1).toUpperCase()!=ch){
                ch = obj[0].substring(0,1).toUpperCase();
                _html += '<li class="station-key" data-text="'+ch+'">'+ch+'</li>';
            }
            _html += '<li onclick="setFreCity(\''+obj[1]+'\',\''+obj[2]+'\');" class="station-item" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
        }
    }else{
    	_html += '<li class="station-item">暂无数据</li>';
    }
	$('#all_citybox').html(_html);
}
var _initShowCity = false;
function showcity(type){
	if (!_initShowCity) {
		initShowCity();
		_initShowCity = true;
	}

	var win = window;
	$('#J_station_search').val('');
	switchtab('changyong');

	$('#indexPage').hide();
	$("#citypage").animate({
		width: '100%'
	}, 'fast','',function(){
		document.getElementById('citypage').style.overflow = 'auto';
	});
}

var cityboxs = ['citybox','his_citybox','hot_citybox','all_citybox','charlist'];
function showCityBox(id){
	for (var i=0; i<cityboxs.length; i++) {
		if (id==cityboxs[i]) {
			$('#'+id).show();
		} else {
			$('#'+cityboxs[i]).hide();
		}
	}
}
function switchtab(showid){
	$('#hotcitybtn').attr('class','station-tab m-tabview-tab');
	$('#changyongbtn').attr('class','station-tab m-tabview-tab');
	$('#citylistbtn').attr('class','station-tab m-tabview-tab');
	$('#'+showid+'btn').attr('class','station-tab m-tabview-selected m-tabview-tab');
	var str = '',arr = [];
	switch(showid){
		case 'changyong':
			showCityBox('his_citybox');
			break ;
		case 'hotcity':
			showCityBox('hot_citybox');
			break ;
		case 'citylist':
			showCityBox('all_citybox');
			break ;
	}
}
function getfrecitylist(){
	var win = window,
	freCityList = win.localStorage.getItem('freCityList'),
	str = '';
	if(freCityList){
		var resultArr = JSON.parse(freCityList);
		if(resultArr.length>0){
			resultArr = resultArr.sort(sortfunctioncity).slice(0,6);
			for(var k in resultArr){
				str = str+'@'+resultArr[k].num+'|'+resultArr[k].text+'|'+resultArr[k].code;
			}
		}
	}
	return str;
}
function sortfunctioncity(x,y){
	return parseInt(y.num)-parseInt(x.num);
}
function setFreCity(text,code){
	var win = window,
	freCityList = win.localStorage.getItem('freCityList');
	if (freCityList!=null){
		freCityList = JSON.parse(freCityList);
		var flag = 0;
		for(var k =0; k<freCityList.length;k++){
			if(freCityList[k].code==code){
				freCityList[k].num = parseInt(freCityList[k].num)+1;
				flag=1;
				break;
			}
		}
		if(flag==0){
			var temp ={
				'code':code,
				'num':1,
				'text':text
			};
			freCityList.push(temp);
		}
	}else{
		freCityList = new Array();
		var temp ={
			'code':code,
			'num':1,
			'text':text
		};
		freCityList[0] =temp;
	}
	win.localStorage.setItem('freCityList',JSON.stringify(freCityList));

	$('#J_depart_name').val(text);
	$('#J_depart_code').val(code);

	win.sessionStorage.setItem('qishoushijian_city',text);

	showYishoushijian(text);

	$("#citypage").animate({
		width: '0%'
	}, "fast",'',function(){
		$('#indexPage').show();
	});
}

function searchWord(keyword){
	var arr = station_names.substring(1).split('@'),
	str = '';
	for(var k in arr){
		if(arr[k].indexOf(keyword.value.toLowerCase())>-1){
			var obj = arr[k].split('|');
			str = str+'<li onclick="setFreCity(\''+obj[1]+'\',\''+obj[2]+'\');" class="station-item" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
		}
	}
	showCityBox('citybox');
	$('#citybox').html(str);
}
function searchlist(){
	var from = $('#J_depart_name').val();
	if(from==''){
		toast('请选择车站！');
	}else{
		showYishoushijian(from);
	}
}
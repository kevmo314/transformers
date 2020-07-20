var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="more-itertools.data";var REMOTE_PACKAGE_BASE="more-itertools.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","more_itertools-7.2.0-py3.7.egg-info",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","more_itertools",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/more_itertools","tests",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:123028,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,789,1060,1382,1719,2054,2361,2645,2964,3249,3588,3923,4248,4678,5809,7040,8207,9368,10554,11678,12856,14196,15390,16767,18016,19095,20273,21684,23178,24395,25608,26983,28337,29663,30838,32099,33362,34434,35756,37017,38152,39409,40708,41921,43247,44531,45777,47049,48127,49223,50450,51703,53078,54156,55470,56677,57790,59063,60316,61416,62704,64100,65225,66482,67734,69072,70425,71479,72734,73836,74974,75932,76875,77844,78834,79744,80854,82015,82831,83946,84886,85920,86958,87864,89013,89886,90700,91591,92520,93576,94572,95269,96262,96960,97930,98978,99728,100388,101069,101976,102697,103623,104542,105364,106202,107148,107811,108792,109760,110709,111550,112424,113262,114061,115042,115938,116938,117795,118539,119230,120034,120868,121638,122482],sizes:[789,271,322,337,335,307,284,319,285,339,335,325,430,1131,1231,1167,1161,1186,1124,1178,1340,1194,1377,1249,1079,1178,1411,1494,1217,1213,1375,1354,1326,1175,1261,1263,1072,1322,1261,1135,1257,1299,1213,1326,1284,1246,1272,1078,1096,1227,1253,1375,1078,1314,1207,1113,1273,1253,1100,1288,1396,1125,1257,1252,1338,1353,1054,1255,1102,1138,958,943,969,990,910,1110,1161,816,1115,940,1034,1038,906,1149,873,814,891,929,1056,996,697,993,698,970,1048,750,660,681,907,721,926,919,822,838,946,663,981,968,949,841,874,838,799,981,896,1e3,857,744,691,804,834,770,844,546],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_more-itertools.data")}Module["addRunDependency"]("datafile_more-itertools.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/more_itertools-7.2.0-py3.7.egg-info/PKG-INFO",start:0,end:42849,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-7.2.0-py3.7.egg-info/top_level.txt",start:42849,end:42864,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-7.2.0-py3.7.egg-info/dependency_links.txt",start:42864,end:42865,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-7.2.0-py3.7.egg-info/SOURCES.txt",start:42865,end:43408,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/more.py",start:43408,end:126267,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/__init__.py",start:126267,end:126354,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/recipes.py",start:126354,end:141589,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/__init__.py",start:141589,end:141589,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/test_recipes.py",start:141589,end:161067,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/test_more.py",start:161067,end:253429,audio:0}],remote_package_size:127124,package_uuid:"30a1fec5-cdb5-46cd-8297-6a532c7c1005"})})();
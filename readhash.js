//OK go - this too shall pass - 23.14  28.79

                  var section = {
                    start: 0,
                    end: 372.861,}
                  let timeout;
                  let pos;
                  var bpm = 0;
                  var rate = 1;
                  var difference = 0;
                  var lownum = 75;
                  var highnum = 300;
                  var form = document.getElementById("searchform");
                  let frombutton;
                  let tobutton;
                  let startcounter = 0;
                  var duration = (section.end - section.start)/(rate);
                  const delay = ms => new Promise(res => setTimeout(res, ms));
                  let state;
                  let loopstate = 1;
                  let infiniteloop = 2;
                  let countdown = 1;
                  let count = 3;
                  let volume = 100;

                  document.addEventListener('keydown', event => {
                    if (event.code === 'KeyS'){
                      console.log('S pressed to start');
                      resetstart();
                    } else if (event.code === 'KeyE') {
                        console.log('E pressed to end');
                        resetend();
                    } else if (event.code === 'KeyR') {
                            reloadloop();
                        } else if (event.code === 'ArrowUp') {
                                increase();
                            } else if (event.code === 'ArrowDown') {
                                    decrease();
                                } else if (event.code === 'Space') {
                                       event.preventDefault();
                                       console.log(state);
                                        if (state === 'YT.PlayerState.PLAYING' || state === 1 || state === 3){
                                          pausebutton();
                                        } else if (state === 2){
                                          console.log('pre-playbutton')
                                          playbutton();
                                          console.log('post-playbutton');
                                        }
                                    }

                  })



                  fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                  setToggleAccessible(toSlider);

                  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
                  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
                  fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
                  toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

                  timeSlider.oninput = () => controlTimeSlider();

                  document.getElementById('duration').innerHTML = duration;
                  document.getElementById('rate').innerHTML = rate;

                  document.getElementById('difference').innerHTML = difference;
                  document.getElementById('section.end').innerHTML = section.end;
                  document.getElementById('section.start').innerHTML = section.start;




                  var player;
                  function onYouTubeIframeAPIReady() {
                    player = new YT.Player(
                      'player',
                      {
                        height: '506',
                        width: '900',
                        videoId: 'OdEDSGGKZck',
                        playerVars: { 
                          'autoplay': 1,
                          'controls': 0, 
                          'rel' : 0,
                          'fs' : 0,
                          start: 21,
                      },
                        events: {
                          'onReady': onPlayerReady,
                          'onStateChange': onPlayerStateChange
                        }
                      }
                    );
                  }
                    function onPlayerReady(event) {
                          urlreader();
                          readhash();

                          player.seekTo(section.start);
                          getduration();
                          checkpositive();
                          gettime();
                          player.playVideo();
                          document.getElementById('bpm').innerHTML = bpm;
                          fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                          asyncCall2();

 


                      }

                  function onPlayerStateChange(event) {
                      if (event.data == YT.PlayerState.PLAYING) {
                          state = event.data;
                          console.log(state);
                          player.setPlaybackRate(rate);     // choose .25, .50, .75, or 1
                          gettime();
                          getduration();


                          var videolength = player.getDuration();
                          var date2 = new Date(0);
                            date2.setSeconds(videolength); // specify value for SECONDS here
                            var timeString2 = date2.toISOString().substring(11, 19);
                            console.log(timeString2);
                            document.getElementById('durationdisplay').innerHTML = timeString2;
                          
                      } else {
                          state = event.data;
                          console.log(state);
                      }
                    }

                    function gettime() {
                      var time = player.playerInfo.currentTime;
                      var videolength = player.getDuration();
                    
                      var percentprogress = Number(time/videolength).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
                      document.getElementById("timediv").style.left = percentprogress;
                      document.getElementById("timeSlider").value = time;
                      var date = new Date(0);
                      date.setSeconds(time); // specify value for SECONDS here
                      var timeString = date.toISOString().substring(11, 19);
                      document.getElementById("currenttimedisplay").innerHTML = timeString;


                      if (time >= section.end ){
                        console.log('restarttriggered');

                       
                        restartVideoSection();
                      } else {
                        

                      }
                      if (state === 'YT.PlayerState.PLAYING' || state === 1){
                        setTimeout(gettime, 10);

                      }

                      }





                      

                    function increase() {
                      event.preventDefault();
                      if (bpm < 0 && bpm > -57 && loopstate==1) {
                      console.log('increase with loop');

                      rate += 0.03808;
                      bpm += 4;
                      document.getElementById('bpm').innerHTML = bpm;
                      checkpositive();
                      player.setPlaybackRate(rate);

                    } else if(bpm < 0 && bpm > -57 && loopstate==2){
                      console.log('increase no loop');

                      rate += 0.03808;
                      bpm += 4;
                      document.getElementById('bpm').innerHTML = bpm;
                      player.setPlaybackRate(rate);

                      checkpositive();
                     // clearTimeout(timeout);

                }
                    }

                    function decrease() {
                      event.preventDefault();
                       if (bpm <= 0 && bpm > -53 && loopstate==1) {
                       console.log('decrease with loop');

                        rate -= 0.03808;
                        bpm -= 4;
                        document.getElementById('bpm').innerHTML = bpm;
                        checkpositive();
                        player.setPlaybackRate(rate);
                        //player.seekTo(section.start);
                        //var duration = (section.end - section.start)/(rate) + difference;
                       // clearTimeout(timeout);
                        //timeout = setTimeout(restartVideoSection, duration * 1000);

                      } else if (bpm <= 0 && bpm > -53 && loopstate==2){
                        console.log('decrease no loop');
                        rate -= 0.03808;
                        bpm -= 4;
                        document.getElementById('bpm').innerHTML = bpm;
                        player.setPlaybackRate(rate);

                        checkpositive();
                       // clearTimeout(timeout);



                      }
                    }

                    function increaseduration() {
                      difference += .05;
                    //  document.getElementById('addduration').innerHTML = difference;
                      //player.seekTo(section.start);
                     // var duration = (section.end - section.start)/(rate) + difference;
                     // clearTimeout(timeout);
                     // timeout = setTimeout(restartVideoSection, duration * 1000);

                    }

                    function decreaseduration() {
                      difference -= .05;
                    //  document.getElementById('addduration').innerHTML = difference;
                      //player.seekTo(section.start);
                      //var duration = (section.end - section.start)/(rate) + difference;
                     // clearTimeout(timeout);
                     // timeout = setTimeout(restartVideoSection, duration * 1000);

                    }

                  function checkpositive() {
                    if(bpm >= 0) {
                      var pos = ""
                    } else {
                      var pos = " "
                    }
                    document.getElementById('pos').innerHTML = pos;
                  }

                  function restartVideoSection() {

                    if (infiniteloop == 2) {
                      player.seekTo(section.start);
                    } else {
                      player.seekTo(section.start);
                      player.pauseVideo();
                    }
                    //var duration = (section.end - section.start)/(rate) + difference;
                      //clearTimeout(timeout);
                     // timeout = setTimeout(restartVideoSection, duration * 1000);
                  }

                  function switchinfiniteloop(){
                    console.log('infinity clicked')
                    if (infiniteloop == 1) {
                      infiniteloop = 2;
                      console.log(infiniteloop)
                      document.getElementById('infinitecontrols').src="https://i.postimg.cc/FsDfqLw3/infinitered.png?random="+new Date().getTime();



                    } else {
                      infiniteloop = 1;
                      console.log(infiniteloop)
                      document.getElementById('infinitecontrols').src="https://i.postimg.cc/t4csRHqg/infinitegrey.png?random="+new Date().getTime();

                    }



                  }

                  function switchcountdown(){
                    console.log('countdown clicked')
                    if (countdown == 1) {
                      countdown = 2;
                      console.log(countdown)
                      document.getElementById('countdown').src="https://i.postimg.cc/05mwf6t8/countdown.png?random="+new Date().getTime();


                      
                    } else {
                      countdown = 1;
                      console.log(countdown)
                      document.getElementById('countdown').src="https://i.postimg.cc/FRS7DqVP/countdowngrey.png?random="+new Date().getTime();

                    }
                  }


                  function resolve1Second() {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        resolve('test');
                      }, 1000);
                    });
                  }

           async function asyncCall3() {
                    console.log('calling1second');
                    const result = await resolve1Second();
                    // expected output: "resolved"
                    playbutton();
                  }


                    function playbutton() {
                      if (countdown == 2 && count == 3 || count == 2 || count == 1) {

                        //write countdown script here
                        //start asynch timer
                        //show hidden number element
                        console.log(count);
                        document.getElementById('countdiv').style.opacity = '1';
                        document.getElementById('countdiv').innerHTML=count;
                        count = count-1;
                        asyncCall3();

                        //switch from 1,2,3,go
                        //hide hideen number element
                        //asycnh timer calls playvideo


                      } else {
                        document.getElementById('countdiv').style.opacity = 0;

                        player.playVideo();
                        count = 3

                      }

                       
                      }

                    function pausebutton() {
                          player.pauseVideo();
                      }



                  function getduration() {
                    var videolength = player.getDuration();
                    document.getElementById('toSlider').max = videolength;
                    document.getElementById('toInput').max = videolength;
                    document.getElementById('fromSlider').max = videolength;
                    document.getElementById('fromInput').max = videolength;
                    document.getElementById('timeSlider').max = videolength;
                    updatelooptimedivs();
                    addmillisecond();

            
                  }





                  function reloadandgetduration() {

                    var videolength = player.getDuration();
                    console.log(videolength);
                    document.getElementById('toSlider').max = videolength;
                    document.getElementById('toInput').max = videolength;
                    document.getElementById('toSlider').value = videolength;
                    document.getElementById('toInput').value = videolength;
                    document.getElementById('fromSlider').max = videolength;
                    document.getElementById('fromInput').max = videolength;
                    document.getElementById('fromSlider').value = 0;
                    document.getElementById('fromInput').value = 0;
                    document.getElementById('endtimecode').innerHTML = secondtotime(videolength);
                    document.getElementById('starttimecode').innerHTML = secondtotime(section.start);
                    addmillisecond();

              
                    controlFromSlider(fromSlider, toSlider, fromInput);
                    document.getElementById('timeSlider').max = videolength;

                  }

                  function reloadloop() {

                    var videolength = player.getDuration();
                    console.log(videolength);
                    document.getElementById('toSlider').max = videolength;
                    document.getElementById('toInput').max = videolength;
                    document.getElementById('toSlider').value = videolength;
                    document.getElementById('toInput').value = videolength;
                    document.getElementById('fromSlider').max = videolength;
                    document.getElementById('fromInput').max = videolength;
                    document.getElementById('fromSlider').value = 0;
                    document.getElementById('fromInput').value = 0;
                    document.getElementById('timeSlider').max = videolength;


                    controlFromSliderkeepplaying(fromSlider, toSlider, fromInput);

                    loopstate = 2;
                    section.start = 0;
                    updatelooptimedivs();

                  }


                  function skipforward() {
                    difference = (section.end-section.start);
                    var videolength = player.getDuration();

                    console.log('skippressed');

                    if ((videolength-section.end)>difference){
                  
                      section.end = ((difference)+section.end);
                    
  
                      tobutton = section.end;
                      parsedtobutton = parseFloat(tobutton);
                      tobutton = parsedtobutton.toString(10);
                      document.getElementById('toInput').value = tobutton;
                      controlToInput(toSlider, fromInput, toInput, toSlider);
                      console.log('skiprantobutton');


                      section.start = ((difference)+section.start);
                      player.seekTo(section.start);
  
  
                      frombutton = section.start;
                      parsedbutton = parseFloat(frombutton);
                      frombutton = parsedbutton.toString(10);
                      document.getElementById('fromInput').value = frombutton;
                      controlFromInput(fromSlider, fromInput, toInput, toSlider);
                      console.log('skipranfrombutton');


                    } else {
                      reloadloop();


                    }
                    moveplayheadwhenpaused();

                  

                  }



                  function skipback() {
                    difference = (section.end-section.start);
                    console.log('skippressed');


                    if (section.start>difference){  

                      section.start = (section.start-difference);
                      player.seekTo(section.start);
              
                      frombutton = section.start;
                      parsedbutton = parseFloat(frombutton);
                      frombutton = parsedbutton.toString(10);
                      document.getElementById('fromInput').value = frombutton;
                      controlFromInput(fromSlider, fromInput, toInput, toSlider);

                      console.log('skipranfrombutton');
  
                      section.end = (section.end-difference);
                      tobutton = section.end;
                      parsedtobutton = parseFloat(tobutton);
                      tobutton = parsedtobutton.toString(10);
                      document.getElementById('toInput').value = tobutton;
                      console.log(tobutton)
                      console.log(document.getElementById('toInput').value)
                      controlToInput(toSlider, fromInput, toInput, toSlider);
                      console.log('skiprantobutton');


                    } else{
                      reloadloop();
                      console.log('skipranreload loop');



                    }
                    
                    moveplayheadwhenpaused();                 


                  }


                  function moveplayheadwhenpaused(){

                    clearTimeout(timeout);
                    player.seekTo(section.start);
                    var time = section.start;
                    var videolength = player.getDuration();
                    var percentprogress = Number(time/videolength).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
                    document.getElementById("timediv").style.left = percentprogress;
                    document.getElementById("timeSlider").value = section.start;   


                  }


                  function controlTimeSlider() {
                    console.log('timeslider interaction')
                    var seektime = document.getElementById("timeSlider").value;
                    console.log(seektime);
                    player.seekTo(seektime);

                    if(seektime>section.end || seektime<section.start){

                      reloadloop();


                    }




                  }

                  function updatelooptimedivs() {

                    document.getElementById('endtimecode').innerHTML = secondtotime(section.end);
                    document.getElementById('starttimecode').innerHTML = secondtotime(section.start);
                    addmillisecond();
                    writestartendtourl();
                  }


            


                  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
                      const [from, to] = getParsed(fromInput, toInput);
                      fillSlider(fromInput, toInput, '#C1C1C1', '#EB3323', controlSlider);
                      if (from > to) {
                          fromSlider.value = to;
                          fromInput.value = to;
                      } else {
                          fromSlider.value = from;
                      }
                      updatestartend(from, to);

                      
                  }

                  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
                      const [from, to] = getParsed(fromInput, toInput);
                      fillSlider(fromInput, toInput, '#C1C1C1', '#EB3323', controlSlider);
                      setToggleAccessible(toInput);
                      if (from <= to) {
                          toSlider.value = to;
                          toInput.value = to;
                      } else {
                          toInput.value = from;
                      }
                      updatestartend(from, to);

                  }

                  function controlFromSlider(fromSlider, toSlider, fromInput) {
                    const [from, to] = getParsed(fromSlider, toSlider);
                    fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                    if (from > to) {
                      fromSlider.value = to;
                      fromInput.value = to;
                    } else {
                      fromInput.value = from;
                    }
                    updatestartend(from, to);

                   // if (state === 'YT.PlayerState.PLAYING' || state === 1 || state === 3){
                      moveplayheadwhenpaused();

                      
                      
                   // } else if (state === 2){

                    //  moveplayheadwhenpaused();
                   // }
                  }

                  function controlFromSliderkeepplaying(fromSlider, toSlider, fromInput) {
                    const [from, to] = getParsed(fromSlider, toSlider);
                    fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                    if (from > to) {
                      fromSlider.value = to;
                      fromInput.value = to;
                    } else {
                      fromInput.value = from;
                    }
                    updatestartendkeepplaying(from, to);

                    //if (state === 'YT.PlayerState.PLAYING' || state === 1 || state === 3){
                      
                   // } else if (state === 2){

                    
                 }

                  function controlToSlider(fromSlider, toSlider, toInput) {
                    const [from, to] = getParsed(fromSlider, toSlider);
                    fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                    setToggleAccessible(toSlider);
                    if (from <= to) {
                      toSlider.value = to;
                      toInput.value = to;
                    } else {
                      toInput.value = from;
                      toSlider.value = from;
                    }
                    updatestartend(from, to);


                  }

                  function getParsed(currentFrom, currentTo) {
                    const from = parseFloat(currentFrom.value);
                    const to = parseFloat(currentTo.value);
                    return [from, to];
                  }

                  function measurebox(){
                    let box = document.querySelector('.range_container');
                    let width = box.offsetWidth;
                    let pixeloffset = 24/width;
                    console.log(box);
                    console.log(width);
                    console.log(pixeloffset);

                  }


                  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
                      const rangeDistance = to.max-to.min;
                      const fromPosition = from.value - to.min;
                      const toPosition = to.value - to.min;

                      controlSlider.style.background = `linear-gradient(
                        to right,
                        ${sliderColor} 0%,
                        ${sliderColor} ${.975*((fromPosition)/(rangeDistance)*100)+1.25}%,
                        ${rangeColor} ${.975*((fromPosition)/(rangeDistance)*100)+1.25}%,
                        ${rangeColor} ${.975*((toPosition)/(rangeDistance)*100)+1.25}%,
                        ${sliderColor} ${.975*((toPosition)/(rangeDistance)*100)+1.25}%,
                        ${sliderColor} 100%)`;
                  }

                  function setToggleAccessible(currentTarget) {
                    const toSlider = document.querySelector('#toSlider');
                    if (Number(currentTarget.value) <= 0 ) {
                      toSlider.style.zIndex = 2;
                    } else {
                      toSlider.style.zIndex = 0;
                    }
                  }

                  function updatestartend(from, to) {
                      section.start = from;
                      section.end = to;
                      player.seekTo(section.start);
                     // var duration = (section.end - section.start)/(rate) + difference;
                     // clearTimeout(timeout);
                     // timeout = setTimeout(restartVideoSection, duration * 1000);
                      fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                      updatelooptimedivs();




                  }
                  function updatestartendkeepplaying(from, to) {
                      section.start = from;
                      section.end = to;


                      //var duration = (section.end - section.start)/(rate) + difference;
                    //  clearTimeout(timeout);

                      fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                      updatelooptimedivs();





                  }


                  function stepUpFrom() {
                    frombutton = document.getElementById('fromInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton += .05;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('fromInput').value = frombutton;
                    controlFromInput(fromSlider, fromInput, toInput, toSlider);

                  }

                  function stepDownFrom() {
                    frombutton = document.getElementById('fromInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton -= .05;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('fromInput').value = frombutton;
                    controlFromInput(fromSlider, fromInput, toInput, toSlider);

                  }

                  function stepUpTo() {
                    frombutton = document.getElementById('toInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton += .05;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('toInput').value = frombutton;
                    controlToInput(toSlider, fromInput, toInput, toSlider);

                  }

                  function stepDownTo() {
                    frombutton = document.getElementById('toInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton -= .05;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('toInput').value = frombutton;
                    controlToInput(toSlider, fromInput, toInput, toSlider);

                  }

                  function stepUpFromsmall() {
                    frombutton = document.getElementById('fromInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton += .01;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('fromInput').value = frombutton;
                    controlFromInput(fromSlider, fromInput, toInput, toSlider);

                  }

                  function stepDownFromsmall() {
                    frombutton = document.getElementById('fromInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton -= .01;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('fromInput').value = frombutton;
                    controlFromInput(fromSlider, fromInput, toInput, toSlider);

                  }

                  function stepUpTosmall() {
                    frombutton = document.getElementById('toInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton += .01;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('toInput').value = frombutton;
                    controlToInput(toSlider, fromInput, toInput, toSlider);

                  }

                  function stepDownTosmall() {
                    frombutton = document.getElementById('toInput').value;
                    parsedbutton = parseFloat(frombutton);
                    parsedbutton -= .01;
                    frombutton = parsedbutton.toString(10);
                    document.getElementById('toInput').value = frombutton;
                    controlToInput(toSlider, fromInput, toInput, toSlider);

                  }



                  function searchclicked(){

                      var url = document.getElementById("url").value


                      // split splits up the strings

                      // substring method

                      var ID = url.split("v=")[1].substring(0, 11);
                      console.log(ID);

                      player.loadVideoById(ID, 0, "default");
                      player.playVideo();
                      asyncCall();


                  }

                  function urlreader(){
                    var currentUrl = window.location.href;
                    var currentID = currentUrl.split("v=")[1].substring(0, 11);
                      console.log(currentID);

                      player.loadVideoById(currentID, 0, "default");
                      player.playVideo();
                      asyncCall();



                  }



                  function resolveAfter2Seconds() {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        resolve('test');
                      }, 700);
                    });
                  }

                  async function asyncCall() {
                    console.log('calling');
                    const result = await resolveAfter2Seconds();
                    reloadandgetduration();
                    // expected output: "resolved"
                  }

          function resolveAfter1Second() {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        resolve('test');
                      }, 1000);
                    });
                  }

           async function asyncCall2() {
                    console.log('calling1second');
                    const result = await resolveAfter1Second();
                    playbutton();
                    reloadloop();
                    // expected output: "resolved"
                  }







                  function resetstart() {
                    console.log(player.playerInfo.currentTime);
                    console.log(section.start);
                    section.start = (player.playerInfo.currentTime - 0.10436075);
                    console.log(section.start);
                    var duration = (section.end - section.start)/(rate) + difference;
                    //clearTimeout(timeout);
                    //timeout = setTimeout(restartVideoSection, duration * 1000);
                    updatesliders()
                    fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                    loopstate = 1;



                  }

                  function resetend() {
                    console.log(player.playerInfo.currentTime);
                    console.log(section.end);
                    section.end = (player.playerInfo.currentTime - 0.28982475);
                    console.log(section.end);
                    player.seekTo(section.end-.02);
                    //var duration = (section.end - section.start)/(rate) + difference;
                    //clearTimeout(timeout);
                    //timeout = setTimeout(restartVideoSection, duration * 1000);
                    updatesliders();
                    fillSlider(fromSlider, toSlider, '#C1C1C1', '#EB3323', toSlider);
                    loopstate = 1;





                  }


                  function updatesliders(){
                    toSlider.value = section.end;
                    toInput.value = section.end;
                    fromSlider.value = section.start;
                    fromInput.value = section.start;
                    updatelooptimedivs();


                  }

                  function pauseplaybutton(){
                    if (state === 'YT.PlayerState.PLAYING' || state === 1 || state === 3){
                      pausebutton();
                    } else if (state === 2){
                      console.log('pre-playbutton')
                      playbutton();
                      console.log('post-playbutton');
                    }

                  }







                function secondtotime(time){
                  var date = new Date(0);
                  date.setSeconds(time); // specify value for SECONDS here
                  var timeString = date.toISOString().substring(14, 19);
                  return timeString;
                  

                }
                

                function durationsecondtotime(videolength){
                  var date = new Date(0);
                  date.setSeconds(videolength); // specify value for SECONDS here
                  var timeString = date.toISOString().substring(14, 19);
                  return timeString;
                  

                }


                function addmillisecond(){

                  if(section.start>0){
                    let startmilli = (section.start + "").split(".")[1];
                    let sm = '.' + startmilli.substring(0, 2);
                    document.getElementById('starttimecodemilli').innerHTML = sm;

                  } else {
                    document.getElementById('starttimecodemilli').innerHTML = '.00';


                  }
                  
                  let endmilli = (section.end + "").split(".")[1];
                  let em = '.' + endmilli.substring(0, 2);

                  document.getElementById('endtimecodemilli').innerHTML = em;



                }

                function gostart(){


                  if (countdown == 2 && count == 3 || count == 2 || count == 1) {
                    player.pauseVideo();
                    player.seekTo(section.start);
                    document.getElementById("timeSlider").value = section.start;

                    console.log(count);
                    document.getElementById('countdiv').style.opacity = '1';
                    document.getElementById('countdiv').innerHTML=count;
                    count = count-1;
                    asyncCall3();

                    //switch from 1,2,3,go
                    //hide hideen number element
                    //asycnh timer calls playvideo


                  } else {
                    document.getElementById('countdiv').style.opacity = 0;

                    
                    count = 3
                    player.seekTo(section.start);

                    document.getElementById("timeSlider").value = section.start;


                  }


                  


                }


                function writestartendtourl() {
                  hashID = player.getVideoData()['video_id'];
                  startend = hashID + "&" + section.start + "&" + section.end;
                  window.location.hash = startend;
                }
                
                
                function readhash() {
                var myHash = location.hash;
                myHash2 = myHash.substring(1, myHash.length);
                var params = myHash2.split('&');
                newID = params[0];
                section.start = Number(params[1]);
                section.end = Number(params[2]);


                player.loadVideoById(newID, 0, "default");
                      player.seekTo(section.start);
                      document.getElementById("timeSlider").value = section.start;
                      player.playVideo();


                    document.getElementById('toSlider').max = videolength;
                    document.getElementById('toInput').max = videolength;
                    document.getElementById('toSlider').value = section.end;
                    document.getElementById('toInput').value = section.end;
                    document.getElementById('fromSlider').max = videolength;
                    document.getElementById('fromInput').max = videolength;
                    document.getElementById('fromSlider').value = section.start;
                    document.getElementById('fromInput').value = section.start;
                    document.getElementById('timeSlider').max = videolength;


                    controlFromSliderkeepplaying(fromSlider, toSlider, fromInput);
                    updatelooptimedivs();

              
                }

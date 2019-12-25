const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
  name: 'rec-word-clock', // required
  version: '1.0.0', // required
  pathname: '/', // required
  development: true,
});

app.use(podlet.middleware());

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

podlet.css({ value: '/assets/style.css' });

app.use('/assets', express.static('assets'));

app.get(podlet.content(), (req, res) => {
  let testDate = new Date(2019,12,25,13,12,0,0);
  let currentTime = new Date();

  let text = translateTimeToText(currentTime);

  res.podiumSend(text);
});

app.listen(7100);

function translateTimeToText(testDate1) {

  var timeStamp = testDate1;
  let it_w = is_w = true;
  let a_w = oclock = to_w = past_w = false;
  let five_m = ten_m = quarter_m = twenty_m = half_m = false;
  let one_h = two_h = three_h = four_h = five_h = six_h = seven_h = eight_h = nine_h = ten_h = eleven_h = twelve_h = false;

  let minutes = timeStamp.getMinutes();
  let hour = timeStamp.getHours()%12;


  if(minutes <= 32 && minutes >=3){
    past_w = true;
  }
  if(minutes.between(33, 57)){
    to_w = true;
    if(minutes <= 57){
      hour += 1;
    }
  }

  if( minutes.between(0,2) || minutes.between(58,60)){
    oclock = true;
  }

  if (minutes.between(3,7) || minutes.between(23,27) ||
      minutes.between(33,37) || minutes.between(53,57) ){
    five_m = true;
  }

  if(minutes.between(8,12) || minutes.between(48,52)){
    ten_m = true;
  }

  if (minutes.between(13,17) || minutes.between(43,47)){
     quarter_m = true;
  }

  if (minutes.between(18,27) || minutes.between(33,42)){
    twenty_m = true;
  }

  if (minutes.between(28 , 32)){
    half_m = true;
  }


  switch (hour) {
    case 0:
      twelve_h = true;
      break;
    case 1:
      one_h = true;
      break;
    case 2:
      two_h = true;
      break;
    case 3:
      three_h = true;
      break;
    case 4:
      four_h = true;
      break;
    case 5:
      five_h = true;
      break;
    case 6:
      six_h = true;
      break;
    case 7:
      seven_h = true;
      break;
    case 8:
      eight_h = true;
      break;
    case 9:
      nine_h = true;
      break;
    case 10:
      ten_h = true;
      break;
    case 11:
      eleven_h = true;
      break;
    case 12:
      twelve_h = true;
      break;
  }



  return `
    <div>
        <span class="lit-${it_w}">I T </span> V <span class="lit-${is_w}">I S </span>S <span class="lit-${a_w}">A</span> T I M E
    </div>
    <div>
        <span class="lit-${quarter_m}">A </span> S <span class="lit-${quarter_m}"> Q U A R T E R </span> W C
    </div>
    <div>
        <span class="lit-${twenty_m}">T W E N T Y </span><span class="lit-${five_m}">F I V E </span>Y
    </div>
    <div>
        <span class="lit-${half_m}">H A L F </span> H <span class="lit-${ten_m}">T E N </span>D <span class="lit-${to_w}">T O </span> 
    </div>
    <div>
        <span class="lit-${past_w}">P A S T </span>O <span>R U N </span>F Y L
</div>
<div>
<span class="lit-${one_h}">O N E </span><span class="lit-${six_h}">S I X </span><span class="lit-${three_h}">T H R E E</span>
</div>
<div>
<span class="lit-${four_h}">F O U R </span><span class="lit-${five_h}">F I V E </span><span class="lit-${two_h}">T W O </span>
</div>
<div>
<span class="lit-${eight_h}">E I G H T </span><span class="lit-${eleven_h}">E L E V E N </span>
</div>
<div>
<span class="lit-${seven_h}">S E V E N </span><span class="lit-${twelve_h}">T W E L V E </span>
</div>
<div>
<span class="lit-${ten_h}">T E N </span>Q W <span class="lit-${oclock}">O'C L O C K</span>
</div>
`;

}

Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};
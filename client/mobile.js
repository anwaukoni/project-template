const myElement = document.getElementById('hammerTime');
var hammerTime = new Hammer(myElement);

imperio.mobileRoomSetup(imperio.socket, imperio.room);

hammerTime.on("swipeleft", function(){
  myElement.innerHTML= "swipedLeft has been emitted";
  imperio.emit('swipeTest', imperio.room);
});

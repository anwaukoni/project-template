document.getElementById('nonceContainer').innerHTML = `Mobile code: <span>${imperio.nonce}</span>`;
const bodyElement = document.querySelector('body');

function changeBodyClass() {
  // console.log(`let's change body`);
  if (bodyElement.classList.contains('class1')) {
    bodyElement.classList.remove('class1');
    bodyElement.classList.add('class2');
  } else {
    bodyElement.classList.remove('class2');
    bodyElement.classList.add('class1');
  }
}

// Use roomId from cookies to create a room
imperio.desktopRoomSetup(imperio.socket, imperio.room);

imperio.socket.on('swipeleft', changeBodyClass);

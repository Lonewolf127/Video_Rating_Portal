function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function logout(){
  console.log('done');
    deleteAllCookies();
    window.location = '/login'

}

function sendFormData(formID, endPoint, success, error) {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new FormData( document.getElementById(formID));

  // Define what happens on successful data submission
  XHR.addEventListener( "load", function(event) {
    success(event);
  } );

  // Define what happens in case of error
  XHR.addEventListener( "error", function( event ) {
   error();
  } );

  // Set up our request
  XHR.open( "POST", endPoint );
  // The data sent is what the user provided in the form
  XHR.send( FD );
}

window.addEventListener('load',(e)=>{
  console.log('set')  
  document.getElementById('logout').onclick=logout;
})
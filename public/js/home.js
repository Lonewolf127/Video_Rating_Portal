let state = true;
function toggleType() {
    document.getElementById('errorText').innerHTML = '';
    if (state) {
        const fragment = `<div id="registrationFragment"><div class="row" id="registrationFragment" >
        <div class="input-field col s12 "id="usernameInput">
            <label> Username</label>
            <input type="text" id ="username" name="username" value required ></div>
        </div> <div class="row" id="phoneInput">
        <div class="input-field col s12 ">
            <label> Phone No.</label>
            <input type="text" id ="phoneNo" name="phoneNo" value required ></div>
        </div></div>` ;

        document.getElementById('inputs').innerHTML += fragment;
        state = false;
        document.getElementById('submitButton').innerHTML = 'Register';
        return;
    }
    document.getElementById('registrationFragment').remove();

    state = true;
    document.getElementById('submitButton').innerHTML = 'Sign In';

}
function manageResponse(response) {
    if (JSON.parse(response.target.responseText).message === 'success') {
        window.location = '/profile';
        return;
    }
    console.log(JSON.parse(response.target.responseText).message)
    document.getElementById('errorText').innerHTML = JSON.parse(response.target.responseText).message;

}
function submitData() {
    if (state) {
        sendFormData('AuthForm', '/login', manageResponse, () => { })
    }
    else {
        sendFormData('AuthForm', '/register', manageResponse, () => { })

    }
}

document.getElementById('AuthForm').onsubmit = (e) => {
    e.preventDefault();
    submitData();
};

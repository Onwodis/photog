document.querySelector("#loginAccount").addEventListener("submit", e => {
    e.preventDefault();
    let surname = document.querySelector("#signSurname").value
    let email = document.querySelector("#signEmailaddress").value
    let phonenumber = document.querySelector("#signPhonenumber").value
    let code = document.querySelector("#signCode").value

    if (surname !== "" && email !== "" && phonenumber !== "" && code !== "") {
        // document.querySelector(".success").textContent = "Account created successfully"
        window.location.href = 'services.html'
    } else {
        document.querySelector(".error").textContent = "Invalid password combination"
    }
    document.querySelector("#signSurname").value = " "
    document.querySelector("#signEmailaddress").value = " "
    document.querySelector("#signPhonenumber").value = " "
    document.querySelector("#signCode").value = " "

})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1') /* # to target html id*/
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() /*Prevents the browser from refreshing */

    const location = search.value
    console.log(location)
    message1.textContent = "Loading..."
    message2.textContent = ""

    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                message1.textContent = data.error
                message2.textContent = ""
            }
            else {
                message1.textContent = "For location " + data.location
                message2.textContent = data.forecast
            }
        })
    })
})
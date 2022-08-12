
/* VISUAL CARD TEXT - ELEMENTS */
const cardHolderName = document.querySelector("#card-holdername")
const cardNumber     = document.querySelector("#card-number")
const cardExpMonth   = document.querySelector("#card-expmonth")
const cardExpYear    = document.querySelector("#card-expyear")
const cardCVC        = document.querySelector("#card-cvc")


/* INPUT ERROR MESSAGES - ELEMENTS */
const cardNumber_error = document.querySelector("#card-number-error")
const cardHolderName_error = document.querySelector("#card-holdername-error")
const cardDate_error = document.querySelector("#card-date-error")
const cardCVC_error = document.querySelector("#card-cvc-error")


const formInputs = document.querySelectorAll(".form-input")
const form = document.querySelector("form")

// Visual card feedback
formInputs.forEach(input => {

	input.addEventListener("input", () => {
		switch(input.attributes.id.nodeValue){
			case "card-holdername-input":
				if(input.value){
					cardHolderName.innerHTML = input.value				
				}else{
					cardHolderName.innerHTML = "Jane Appleseed"
				}
				break
			case "card-number-input":
				if(input.value){
					cardNumber.innerHTML = input.value
				}else{
					cardNumber.innerHTML = "0000 0000 0000 0000"
				}
				break
			case "card-expmonth-input":
				if(input.value){
					cardExpMonth.innerHTML = input.value
				}else{
					cardExpMonth.innerHTML = "00"
				}
				break
			case "card-expyear-input":
				if(input.value){
					cardExpYear.innerHTML = input.value
				}else{
					cardExpYear.innerHTML = "00"
				}
				break
			case "card-cvc-input":
				if(input.value){
					cardCVC.innerHTML = input.value
				}else{
					cardCVC.innerHTML = "000"
				}
				break
		}
	})

	// Format card number
	input.addEventListener("blur", () => {
		if(input.attributes.id.nodeValue == "card-number-input"){
			input.value = cardFormat(input.value)
			cardNumber.innerHTML = input.value
		}
	})
})

// Card validation
form.addEventListener("submit", (e) => {
	e.preventDefault()
	let errors = []

	let cardHolderName_input = e.srcElement[0]
	let cardNumber_input     = e.srcElement[1]
	let cardExpMonth_input   = e.srcElement[2]
	let cardExpYear_input    = e.srcElement[3]
	let cardCVC_input        = e.srcElement[4]

	// check for an empty input
	formInputs.forEach((input, index) => {
		switch(input.attributes.id.nodeValue){
			case "card-holdername-input":
				if(!input.value){
					cardHolderName_input.style.border = "1px solid hsl(0, 100%, 66%)"	
					cardHolderName_error.style.opacity = "1"
					errors.push("Card Holdername error")	
				}else{
					cardHolderName_input.style.border = "1px solid hsl(270, 3%, 87%)"	
					cardHolderName_error.style.opacity = "0"
				}
				break
			case "card-number-input":
				if(!input.value){
					cardNumber_input.style.border = "1px solid hsl(0, 100%, 66%)"
					cardNumber_error.innerHTML = "Cant' be blank."
					cardNumber_error.style.opacity = "1"
					errors.push("Card number error")	
				}else{
					// if it is not empty, check if the card number is correct
					if(cardNumber_input.value.match(/[^0-9\ ]/)){
						cardNumber_input.style.border = "1px solid hsl(0, 100%, 66%)"
						cardNumber_error.innerHTML = "Wrong format, numbers only."
						cardNumber_error.style.opacity = "1"
						errors.push("Card number format error")	
					}else{
						cardNumber_input.style.border = "1px solid hsl(270, 3%, 87%)"
						cardNumber_error.style.opacity = "0"
					}
				}
				break
			case "card-expmonth-input":
				if(!input.value){
					cardExpMonth_input.style.border = "1px solid hsl(0, 100%, 66%)"	
					cardDate_error.style.opacity = "1"
					errors.push("Card exp month error")	
				}else{
					cardExpMonth_input.style.border = "1px solid hsl(270, 3%, 87%)"	
					cardDate_error.style.opacity = "0"
				}
				break
			case "card-expyear-input":
				if(!input.value){
					cardExpYear_input.style.border = "1px solid hsl(0, 100%, 66%)"	
					cardDate_error.style.opacity = "1"
					errors.push("Card exp year error")	
				}else{
					cardExpYear_input.style.border = "1px solid hsl(270, 3%, 87%)"	
					cardDate_error.style.opacity = "0"
				}
				break
			case "card-cvc-input":
				if(!input.value){
					cardCVC_input.style.border = "1px solid hsl(0, 100%, 66%)"	
					cardCVC_error.style.opacity = "1"
					errors.push("Card CVC error")	
				}else{
					cardCVC_input.style.border = "1px solid hsl(270, 3%, 87%)"	
					cardCVC_error.style.opacity = "0"
				}
				break
		}
	})

	if(!errors.length){
		document.querySelector("#form-section").style.display = "none"
		document.querySelector("#form-complete").style.display = "flex"
	}else{
		console.log(`Errors: ${errors}`)
	}

})

// Format card number code
function cardFormat(cd){
	return cd.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4")
}

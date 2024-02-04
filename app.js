let element = document.querySelectorAll(".dropdown select");
let input = document.querySelector(".amount input");
let button = document.querySelector("button");
let fromcountry = document.querySelector(".from select");
let tocountry = document.querySelector(".to select");
const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let display = document.querySelector(".msg");

for(let select of element){
    for(let country in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = country;
        newOption.value = country;
        if(select.name=="from" && country=="USD")newOption.selected="selected";
        if(select.name=="to" && country=="INR")newOption.selected="selected";
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        changeflag(e.target);
    })
}
function changeflag(e){
    let country = e.value;
    let countrycode = countryList[country];
    let imgtag = e.parentElement.querySelector("img");
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    imgtag.src = newsrc;
}
async function exchangerate(){
    if(input.value=="" || input.value<0){
        input.value = 1;
    }
    let response = await fetch(`${URL}/${fromcountry.value.toLowerCase()}/${tocountry.value.toLowerCase()}.json`);
    let data = await response.json();
    let rate = data[tocountry.value.toLowerCase()];
    display.innerHTML = `${input.value}${fromcountry.value}=${rate*input.value} ${tocountry.value}`;
}
button.addEventListener("click", (e)=>{
    e.preventDefault();
    exchangerate();
});

window.addEventListener("load",()=>{
    exchangerate();
})
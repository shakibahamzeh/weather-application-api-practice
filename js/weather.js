const form=document.querySelector('.form');
const input=document.querySelector('.input-search');
const countryName =document.querySelector('.country-name');
const city=document.querySelector('.city');
const localTime=document.querySelector('.local-time');
const icon=document.querySelector('.icon');
const temp=document.querySelector('.temp');
const weatherWrapper=document.querySelector('.weather-wrapper');
const loader=document.querySelector('.loader');
const errorText=document.querySelector('.error');
let errorMessage='';

const fetchWeather= async(cityName)=>{
    try{
      loader.style.display="block";
      weatherWrapper.style.display="none";
      errorText.style.display="none";

      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=eca4f821f3f44839ae572629210912&q=${cityName}`);
      const data = await response.json();
      console.log(data)
      if(data.error){
       errorMessage=data.error.message;
      }
      const {name,country,localtime} = data.location;
      const {temp_c,condition}=data.current;
      countryName.innerHTML = country;
      city.innerHTML=name;
      localTime.innerHTML=localtime;
      icon.src=condition.icon;
      temp.innerHTML=`${temp_c} Celsius`;
      weatherWrapper.style.display="block";
      loader.style.display="none";

    }catch(error){
      loader.style.display="none";
      weatherWrapper.style.display="block";
      errorText.innerHTML=errorMessage;
      setTimeout(()=>{
         errorText.style.display="none";
      },2000)
    }

}





form.addEventListener('submit',(e)=>{
e.preventDefault();
 if(input.value.trim() !== ''){
    fetchWeather(input.value.trim());
    input.value = '';
 }
})
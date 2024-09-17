
// practice phone hunter

const loadPhones = async(searchText, dataLimit) => {
  const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url);
  const phones = await res.json();
  displayPhones(phones.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerText ='';
  // display 10 phones only
  const showAll = document.getElementById('show-all');
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0,10);
    showAll.classList.remove('d-none');
  } else{
    showAll.classList.add('d-none');

  }

  // no-found-message
  const noPhone = document.getElementById('no-found-message');
  if(phones.length === 0){
    noPhone.classList.remove('d-none');
  } 
  else{
    noPhone.classList.add('d-none');
  }


for (const phone of phones){
  console.log(phone);
  const phoneDiv = document.createElement('div');
  phoneDiv.classList.add('col');
  phoneDiv.innerHTML =`
  <div class="card p-4" style="width: 18rem;">
  <img src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">${phone.slug}</p>
    <button onclick="loadPhoneSearchDetails('${phone.slug}')" class="btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDeatailModal">Show Details</button>
  </div>
</div>
  `;
   phoneContainer.appendChild(phoneDiv);
}

// stop loader
toggleSpinner(false);
}

const processSearch = (dataLimit) => {
  // start loader
  toggleSpinner(true);
  const searchText = document.getElementById('search-field').value;
  console.log(searchText)
  loadPhones(searchText, dataLimit);
}

// Search by phone
const searchPhone = () => {
  processSearch(10)

}

// enter key button
document.getElementById('search-field')
    .addEventListener('keypress', function(e) {
      console.log(e.key)
    if (e.key === 'Enter') {
      processSearch(10)

    }
});

// loader
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  } else {
    loaderSection.classList.add('d-none')
  }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch()
})

const loadPhoneSearchDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

  }
  catch(err){
    console.log(err)
  }
}

const displayPhoneDetails = phone => {
  console.log(phone)
  const modalTitle = document.getElementById('phoneDeatailModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <p>Realease date: ${phone.releaseDate? phone.releaseDate : "No releaseDate"}</p>
  <img style="width:200px; height:150px" src='${phone.image}'/>
   <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
     <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
     <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
  `
}

loadPhones('apple')

const loadPhones = async (searchPhone, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    // display no phones found
    const noPhone = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    // display all phones
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                 lead-in to additional content. This content is a little bit longer.</p>
                 <button onclick="loadPhonesDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
    </div>       `
        phoneContainer.appendChild(phoneDiv);
    })
    // stop spinner or loader
    toggleSpiner(false);
}

const processSearch = (dataLimit) => {
    toggleSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // searchField.value = ''
    loadPhones(searchText, dataLimit);
}

// handle search button clicked
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10)
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhonesDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    phoneDetails(data.data)
}
const phoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No phone found'}</p>
   <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no Storage information'}</p>
   <p>Others: ${phone.others ? phone.others.Bluetooth : 'no Bluetooth information'}</p>
   <p>Sensors: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0, 1, 2] : 'No Sensor'}</p>
    `
}
loadPhones('apple')
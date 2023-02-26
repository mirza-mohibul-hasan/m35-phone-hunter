const loadPhone = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}
const displayPhones = phones =>{
    // console.log(phones);

    // Show No Phone
    const noPhone = document.getElementById('no-found-message');
    if(phones.length == 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none')
    }
    // Show only 20 phone
    phones = phones.slice(0,10);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    /* Loader stop here */
    toggleSpinner(false);
}
document.getElementById('btn-search').addEventListener('click',function(){
    /* Loader start here */
    toggleSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    console.log(searchText);
    loadPhone(searchText);
})

const toggleSpinner = isLoading  =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// loadPhone();
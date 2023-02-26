const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
const displayPhones = (phones, dataLimit) => {
  // console.log(phones);

  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";

  // Show only 10 phone

  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    const showAll = document.getElementById("show-all-section");
    showAll.classList.remove("d-none");
  } else {
    const showAll = document.getElementById("show-all-section");
    showAll.classList.add("d-none");
  }

  if (phones.length === 0) {
    document.getElementById("no-found-message").classList.remove("d-none");
  } else {
    document.getElementById("no-found-message").classList.add("d-none");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-3">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick ="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  /* Loader stop here */
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  /* Loader start here */
  processSearch(10);
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// Show All not best method
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

// Search on enter key
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

// Load Phone details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
const displayPhoneDetails = (phone) => {
  console.log(phone);
  document.getElementById("phoneDetailsModalLabel").innerText = phone.name;
  document.getElementById("phone-details").innerHTML = `
  <p>Release date: ${
    phone.releaseDate ? phone.releaseDate : "No release date"
  }</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : "Not Found"}
  `;
};
loadPhone("apple");

// html section id 
const searchResult = document.getElementById('search-result');

const phoneDetails = document.getElementById('phone-details');
phoneDetails.className ='row align-items-center';

// get data by search
const getSearch = () => {
    document.getElementById('fill-error').style.display ='none';
    document.getElementById('result-found').style.display= "none";
    document.getElementById('not-found').style.display = "none";
    document.getElementById('spinner-section').style.display='block';
    searchResult.innerHTML = '';

    //take input value
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();
    // error check
    if (searchValue === '') {
        searchResult.innerHTML = '';
        document.getElementById('not-found').style.display = "none";
        document.getElementById('spinner-section').style.display='none';
        document.getElementById('fill-error').style.display ='block';
    }
    else {
        document.getElementById('fill-error').style.display ='none';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(response => response.json())
        .then(data => displayResult(data.data))
    };
    searchInput.value = '';
};

// display search result
const displayResult = data => {
    // search not found check
    if (data.length !== 0) {
        document.getElementById('not-found').style.display = "none";
        document.getElementById('result-text').innerText =`${data.length}`;
        document.getElementById('result-found').style.display= "block";
        //search result
        const topTwenty = data.filter(result => data.indexOf(result) < 20);
        showDisplay(topTwenty,searchResult);
        document.getElementById('spinner-section').style.display='none';
    }
    else {
        document.getElementById('not-found').style.display = "block";
        document.getElementById('spinner-section').style.display='none';
    }
};


// get phone details to api
const getDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`

    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.data))
};

// display phone details 
const displayDetails = data => {
    phoneDetails.innerHTML = '';
    // title section
    const div = document.createElement('div');
    div.className = 'details-photo col-sm-6'
    div.innerHTML = `
        <div class="d-flex justify-content-center"><img class="w-50" src="${data.image}"></div>
        <h1 class="text-center my-2">${data?.name || 'No Found'}</h1>
        <h3 class="text-center fs-4 my-2">Band: ${data?.brand || 'No Found'}</h3>
    `;
    phoneDetails.appendChild(div);

    // details section
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'container-fluid details-text col-sm-6 my-3';
    detailsDiv.innerHTML = `
    <div class="row">
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Release Date:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data?.releaseDate || 'No release Date found'}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Display Size:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures?.displaySize || 'No found'}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>ChipSet:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures?.chipSet || 'No found'}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Memory:</h4>
            </div>
            <div class="col-sm-8 col-8">
                 <p>${data.mainFeatures?.memory || 'No found'}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4 col-4">
                <h4>Sensors:</h4>
            </div>
            <div class="col-sm-8 col-8" id="sensors-div">
                <p>${data.mainFeatures?.sensors.join(", ") || 'No found'}</p>
                 
            </div>
        </div>
    </div>
    `;
    phoneDetails.appendChild(detailsDiv);

    // display others details 
    const othersDiv = document.createElement('div');
    if(data.others !== undefined){
        othersDiv.innerHTML=`
        <div class="row">
        </div>`
        for (const prop in data.others) {
            const div = document.createElement('div');
            div.className = 'row';
            div.innerHTML = `
                    <div class="row">
                        <div class="col-sm-4 col-4">
                            <h4 class="text-end">${prop}:</h4>
                        </div>
                        <div class="col-sm-8 col-8">
                             <p>${data?.others[prop] || 'No'}</p>
                        </div>
                `;
            othersDiv.appendChild(div);
            detailsDiv.appendChild(othersDiv);
        };
    }
    else{
        othersDiv.innerHTML ='';
        detailsDiv.appendChild(othersDiv);
    }
    phoneDetails.appendChild(detailsDiv);
};

// show display result function
const showDisplay =(data , section) =>{
    data.forEach(result => {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
        <div class="card border-0">
            <img src="${result.image}" class="card-img-top w-50 mx-auto mt-3" alt="${result?.phone_name || 'No Found'}">
            <div class="card-body text-center">
                <h5 class="card-title phone-title">${result?.phone_name || 'No Found'}</h5>
                <p class="card-text mb-2">Band: ${result?.brand ||'No Found'}</p>
                <button class="btn btn-info details-button" onclick="getDetails('${result.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details</button>
            </div>
        </div>
         `;
        section.appendChild(div);
    });
};

// add enter key button
document.onkeydown = function(){
    if(window.event.keyCode === 13){
        getSearch();
    }
};



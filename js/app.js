// // Add preloader 
// const spin = param => {
//     document.getElementById('spinner').style.display = param;
// }
// // Load Data From Api Using Fetch 
// const loadBooksData = async () => {
//     const searchField = document.getElementById('search-input');
//     const searchText = searchField.value;
//     // Clear Search Input 
//      searchInput.value = '';
//     // Error Handle for Empty Search 

//     // if (searchText === '') {
//     //     const error = document.getElementById('count')
//     //     document.getElementById('count').style.display='block'
//     //     error.innerText = `
//     //     Please write a Book Name in search box.`;
//     //     document.getElementById('books-container').textContent = '';
//     //     error.style.color = 'red';
//     // }
//     // else {
//     //     spin('block');
//     //     // Url Dynamic 
//     //     const url = `https://openlibrary.org/search.json?q=${searchText}`
//     //     const res = await fetch(url);
//     //     const data = await res.json();
//     //     showBooks(data.docs, data);
//     //     // Clear Search Input 
//     //     searchInput.value = '';
//     // }
//     const booksContainer = document.getElementById('books-container');
//     // Clear Books Container Data 
//     booksContainer.textContent = '';
//     // Count Items 
//     const count = document.getElementById('count');
//     count.innerText = `
//         Your Result: ${books.length} Out of ${data.numFound}
//         `;
//     count.style.color = 'green';
//     if(searchText == ''){
//         const error = document.getElementById('count')
//         error.innerText = `
//         Please write a Book Name in search box.`;
//     }
//     else {
//         spin('block');
//             // Url Dynamic 
//             const url = `https://openlibrary.org/search.json?q=${searchText}`
//         try{
//             const res = await fetch(url);
//                 const data = await res.json();
//                 showBooks(data.docs, data);
        
//         }
//         catch(error){
//             document.getElementById('count').style.display = 'block';
//         }
        

//     }


// }
// const showBooks = (books, data) => {
//     const booksContainer = document.getElementById('books-container');
//     // Clear Books Container Data 
//     booksContainer.textContent = '';
//     // Count Items 
//     const count = document.getElementById('count');
//     count.innerText = `
//         Your Result: ${books.length} Out of ${data.numFound}
//         `;
//     count.style.color = 'green';
//     // Error Handle for No items in result 
//     if (books.length === 0) {
//         const error = document.getElementById('count');
//         error.innerText = `
//         Please write a valid Book Name.`;
//         error.style.color = 'red';
//     }
//     else {
//         books.forEach(book => {
//             // Create Dynamically Div in UI 
//             const div = document.createElement('div');
//             div.classList.add('col');
//             div.classList.add('card-style')
//             div.innerHTML = `
//                 <div class="card">
//                     <img height= '350px' p-5 src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
//                     <div class="card-body" style="height:200px; overflow:hidden">
//                         <h5 class="card-title"> <b>Book Name:</b> ${book.title}</h5>
//                         <p><b>Author Name:</b> ${book.author_name ? book.author_name.slice(0, 2) : 'No Author'}</p>
//                         <p><b>Publisher:</b> ${book.publisher ? book.publisher : 'No Publisher'}</p>

//                         <p class="card-text"><b>Published year:</b> ${book.first_publish_year ? book.first_publish_year : 'No Published Year'}</p>
//                     </div>
//                 </div>
//             `;
//             booksContainer.appendChild(div);
//         });

//     }
//     spin('none');

// }



// error message display none 
document.getElementById('error-message').style.display='none'
// spinner
const spin = spiner => {
    document.getElementById('spinner').style.display = spiner;
}
// Load Data From Api
const searchBooks = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Error for empty text 
    if (searchText === '') {
        const error = document.getElementById('error-message')
        error.innerText = `
        Please write a Book Name in search box.`;
        document.getElementById('error-message').style.display='block'
        document.getElementById('books-container').textContent = '';
    }
    else {
        spin('block');
        // Url
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.docs, data);
        // Clear Search Input field 
        searchField.value = '';
    }


}
const displaySearchResult = (books, data) => {
    const booksContainer = document.getElementById('books-container');
    // Clear books container 
    booksContainer.textContent = '';
    // Amount of item 
    const count = document.getElementById('error-message');
    count.innerText = `
        Your Result: ${books.length} Out of ${data.numFound}
        `;
    count.style.color = 'green';
    // Error for No items
    if (books.length === 0) {
        const error = document.getElementById('error-message');
        error.innerText = `
        Please write a valid Book Name.`;
        document.getElementById('error-message').style.display='block'
    }
    else {
        books.forEach(book => {
            // Diyanamicly show books
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('card-style')
            div.innerHTML = `
                <div class="card">
                    <img height= '350px' p-5 src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body" style="height:200px; overflow:hidden">
                        <h5 class="card-title"> <b>Book Name:</b> ${book.title}</h5>
                        <p><b>Author Name:</b> ${book.author_name ? book.author_name.slice(0, 2) : 'No Author'}</p>
                        <p><b>Publisher:</b> ${book.publisher ? book.publisher : 'No Publisher'}</p>

                        <p class="card-text"><b>Published year:</b> ${book.first_publish_year ? book.first_publish_year : 'No Published Year'}</p>
                    </div>
                </div>
            `;
            booksContainer.appendChild(div);
        });

    }
    spin('none');

}
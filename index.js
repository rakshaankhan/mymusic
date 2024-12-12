// Get references to the form and container
const musicForm = document.getElementById("music-form");
const albumContainer = document.getElementById("album-container");

// Load existing data from localStorage or start with an empty array
let albums = JSON.parse(localStorage.getItem("albums")) || [];

// Function to render albums
function renderAlbums() {
    albumContainer.innerHTML = ""; // Clear existing albums
    albums.forEach((album, index) => {
        const albumDiv = document.createElement("div");
        albumDiv.className = "album";
        albumDiv.innerHTML = `
            <img src="${album.albumCover}" alt="${album.title}">
            <p>${album.title}</p>
            <button onclick="deleteAlbum(${index})">Delete</button>
        `;
        albumContainer.appendChild(albumDiv);
    });
}

// Function to delete an album
function deleteAlbum(index) {
    albums.splice(index, 1); // Remove the album from the array
    localStorage.setItem("albums", JSON.stringify(albums)); // Save updated data
    renderAlbums(); // Re-render albums
}

// Handle form submission
musicForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const title = document.getElementById("title").value;
    const albumCover = document.getElementById("albumCover").value;
    const trackUrl = document.getElementById("trackUrl").value;

    // Add the new album to the array
    albums.push({ title, albumCover, trackUrl });

    // Save the updated array to localStorage
    localStorage.setItem("albums", JSON.stringify(albums));

    // Clear the form
    musicForm.reset();

    // Re-render the albums
    renderAlbums();
});

// Initial rendering of albums
renderAlbums();

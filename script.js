const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const profileContainer = document.getElementById("profile-container");

searchBtn.addEventListener("click", getProfile);

async function getProfile() {
  const username = usernameInput.value.trim();

  if (username === "") {
    error.classList.remove("hidden");
    error.innerText = "Please enter a username";
    return;
  }

  error.classList.add("hidden");
  profileContainer.innerHTML = "";

  loading.classList.remove("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    displayProfile(data);
  } catch (err) {
    error.classList.remove("hidden");
    error.innerText = err.message;
  } finally {
    loading.classList.add("hidden");
  }
}

function displayProfile(user) {
  profileContainer.innerHTML = `
    
    <div class="profile-card">

        <img src="${user.avatar_url}" alt="Avatar">

        <div class="profile-info">

            <h2>${user.name || "No Name Available"}</h2>

            <p>${user.bio || "No Bio Available"}</p>

            <div class="stats">
                <div>
                    Followers<br>
                    <strong>${user.followers}</strong>
                </div>

                <div>
                    Following<br>
                    <strong>${user.following}</strong>
                </div>

                <div>
                    Repositories<br>
                    <strong>${user.public_repos}</strong>
                </div>
            </div>

            <a href="${user.html_url}" target="_blank">
                View GitHub Profile
            </a>

        </div>

    </div>
    
    `;
}

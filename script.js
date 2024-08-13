const apiEp = "https://randomuser.me/api?results=6";
let userList = [];
// Slide to go to app screen
const slider = document.getElementById("mySlider");
slider.addEventListener("change", (e) => {
  const { value } = e.target;
  const label = document.getElementById("label");
  //   alert("You can go to the next page");
  if (value > 70) {
    label.textContent = "";
    displayAppScreen();
  } else {
    label.textContent = "Slide to unluck";
  }
});

const displayAppScreen = () => {
  //Hide home screen
  document.querySelector(".homeScreen").remove();

  // Show app screen
  document.querySelector(".appScreen").style.display = "block";
};
const displayContactScreen = () => {
  //Hide app screen
  document.querySelector(".appScreen").remove();

  // Show contact list screen
  document.querySelector(".contactListScreen").style.display = "block";
  fetchUsers(apiEp);
};

const fetchUsers = async (url) => {
  // fetch the users from the api
  // promise method
  //   fetch(url)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((Data) => {
  //       console.log(Data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // async await
  const response = await fetch(url);
  const data = await response.json();
  userList = data.results;

  // Hide the spinner
  document.querySelector(".showSpinner").style.display = "none";
  // Show the user
  displayContactList(userList);
};

// Display contact list
const displayContactList = (userList) => {
  console.log(userList);
  document.getElementById("list").style.display = "block";

  let str = "";
  userList.map((item, i) => {
    str += `
<div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse${i}"
                      aria-expanded="false"
                      aria-controls="collapse${i}"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="50px"
                        class="rounded-circle"
                      />
                      <div class="ms-2">
                        <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
                        <small> ${item.location.street.number} ${item.location.street.name}</small>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapse${i}"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body d-flex flex-column align-items-center"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="150px"
                        class="rounded-circle"
                      />
                      <div>
                        <div class="fw-bolder">
                          <i class="bi bi-person-circle"></i>${item.name.title} ${item.name.first} ${item.name.last}
                        </div>
                        <a href="${item.phone}"
                          ><i class="bi bi-phone"></i>${item.phone}</a
                        >
                      </div>
                      <div>
                        <a href="${item.email}"
                          ><i class="bi bi-envelope-at"></i>${item.email}</a
                        >
                      </div>
                      <div>
                        <a
                          href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.city}"
                          target=""
                        >
                          <i class="bi bi-globe-asia-australia"></i> ${item.location.street.number} ${item.location.street.name}</a
                        >
                      </div>
                    </div>
                  </div>
                </div>`;
  });
  document.getElementById("userAccordion").innerHTML = str;
};

// Enable search button
document.getElementById("Search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  console.log(value);
  const filteredUsers = userList.filter((item) => {
    const name = (item.name.first + " " + item.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });
  displayContactList(filteredUsers);
});

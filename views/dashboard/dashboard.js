import { renderCard } from "/views/dashboard/cardBuilder.js"

const navListItems = document.querySelectorAll('nav li');


async function getVolumeItems() {
  try {
    const res = await fetch('/api/volumes');
    const data = await res.json();

    if (!data.ok) {
      console.error("Failed to load volumes:", data.message);
      return;
    }

    console.log("Views:", data.volumes);
    return data.volumes; // <- your function to display them
  } catch (err) {
    console.error("Error fetching volumes:", err);
  }
}

async function getCurrentUser() {
  let currentUser;

  //GET user data for the page
  let response;

  try {
    response = await fetch('/api/user');
  } catch (err) {    
    throw new Error("User not logged in");
  }

  let json = await response.json();
  console.log(json)

  if (!json.ok) {   
    throw new Error("User not logged in");
  }
  return json.user;
}


export async function init(container) {

  const sidebarToggleBtn = document.querySelector(".sidebar-drawer-btn");
  const sidebar = document.querySelector('.sidebar');
  const sidebarListItems = document.querySelectorAll('.sidebar li');
  const userAvatar = document.querySelector('.avatar');
  const userMenu = document.getElementById('userMenu');
  let libraryRow = document.querySelector('.library .row');

  sidebarListItems.forEach(li => {
    li.addEventListener('click', () => {
      var currentPage = document.querySelector('.sidebar li.active');
      currentPage.classList.remove('active');
      document.querySelector(`.${currentPage.dataset.page}`).style.display = "none";
      li.classList.add('active');
      document.querySelector(`.${li.dataset.page}`).style.display = "block";
    });
  });

  //Side bar hide/show arrow button  
  sidebarToggleBtn.addEventListener("click", function () {
    this.classList.toggle("open");
    sidebar.classList.toggle("open");
  });

  
  let currentUser;
  try {

    currentUser = await getCurrentUser();

  } catch (err) {

    //redirect to login...
    window.location.href = "/authentication/login";

  }

  //No access to Volume creation for admin user.
  if (!currentUser.administrator) {
    document.querySelector('li[data-page="create-new-volume"]').style.display = "none";
  }

  document.querySelector("#user-name").textContent = `${currentUser.username}`;  

  userAvatar.addEventListener('click', () => {
    userMenu.classList.toggle('show');
  });

  window.addEventListener('click', (e) => {
    if (!userAvatar.contains(e.target) && !userMenu.contains(e.target)) {
      userMenu.classList.remove('show');
    }
  });

  //ACCOUNTS-SETTINGS

  const emailInput = document.querySelector('input[type="email"]');
  emailInput.value = currentUser.email;

   let volumes;
   try {

    volumes = await getVolumeItems();

  } catch(err) { }

  if(volumes && volumes.length) libraryRow.innerHTML = await renderLibraryHtml(volumes);

  document.querySelectorAll('.volume-card').forEach(card => {
    card.addEventListener('click', (e) => {
      var id = e.target.closest('.volume-card').id;
      console.log(id);
      window.location.href = `/viewer?id=${id}`
    })
  })
}

async function renderLibraryHtml(volumes) {  
  let html = '';  
  volumes.forEach(volume => {
    var card = renderCard({
      _id: volume._id,
      index: volume.index,
      title: volume.title,
      imgUrl: `${volume.volumePath}folder.png?resize=500`
    })
    html += card;
  })
  return html;
}

let ready = false;


$(document).ready(function(){
  var firebaseConfig = {
    apiKey: "AIzaSyC7nwRUnNljthqlgaWo7clS_14dUP7_XfI",
    authDomain: "new-portfolio-61444.firebaseapp.com",
    databaseURL: "https://new-portfolio-61444.firebaseio.com",
    projectId: "new-portfolio-61444",
    storageBucket: "",
    messagingSenderId: "956903884963",
    appId: "1:956903884963:web:d3fa56005fb0101c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();

  database.ref().on('value', function(snapshot){
    let projects = snapshot.val().projects;
    if(projects){
      getProjectsGit(projects);
    }else{
      console.log("Error retreiving projects from firebase");
    }
  }); 

  $.ajax({
    url: 'https://api.github.com/users/stevenDixonDev',
    method: 'GET'
  }).then(function(res){
    
    $(".user-image").attr("src", res.avatar_url);
    $(".user-about").append(`<h5>${res.bio}</h5>`);
    $(".user-info").append(`<h4>${res.name}</h4>`);
    $(".user-info").append(`<h4>@${res.login}</h4>`);
    $(".user-contact").append(`<h6><i class="fab fa-github"></i> <a href="${res.html_url}">Github</a></h6>`);
    $(".user-contact").append(`<h6><i class="fas fa-map-marker-alt"></i> ${res.location}</h6>`);
  });
})

function getProjectsGit(currentProjects){
  $.ajax({
    url: 'https://api.github.com/users/stevenDixonDev/repos',
    method: 'GET'
  }).then(function(res){
    let projectKeys = Object.keys(currentProjects);
    $.each(res, function(index, project){
      $.each(projectKeys, function(index, allowed){
        if(allowed === project.name){
          $("#projects").append(`
          <div class="col-md-12 col-lg-6 col-xl-4 mb-3">
          <div class="card bg-dark text-white">
          <img class="card-img-top d-none d-lg-block" src="${currentProjects[allowed].picture}" alt="${project.name}" />
          <div class="card-body">
            <h4 class="card-title">${project.name}</h4>
            <h5 class="card-text">${project.description}</h5>
            <div class="d-flex flex-row">
                <p><i class="fas fa-code"></i> ${project.language}</p>
                <p class="ml-3"><i class="fas fa-star"></i> ${project.stargazers_count}</p>
                <p class="ml-3"><i class="fas fa-code-branch"></i> ${project.forks} </p>
            </div>
            <div>
              <a href="${project.html_url}" target="_Blank" class="card-link">View Code</a>
              <a href="${project.homepage}" target="_Blank" class="card-link">View Project</a>
            </div>
          </div>
          </div>
          </div>
          `);
        }
      })
      //
    })
  })
}

// Use jquery to handle click events on portfolio items
// $(".card").click(function(){
//   window.open($(this).attr("data"));
// })
//./assets/images/portfolio


/* 
  new Ideas
  
  keep allowed projects with their pictures in firebase 
  then get the projects from github.

  add articles? maybe I could start writing on meduim?
*/




const allowedProjects = [
  {name: "Word-Guess-Game", picture: "Guess the Word.png"},
  {name: "unit-4-game", picture: "Starwars.jpg"},
  {name: "TriviaGame", picture: "TriviaGame.png"},
  {name: "GifTastic", picture: "Giftastic.png"}
]



$(document).ready(function(){
  $.ajax({
    url: 'https://api.github.com/users/stevenDixonDev',
    method: 'GET'
  }).then(function(res){
    console.log(res);
    $(".user-image").attr("src", res.avatar_url);
    $(".user-about").append(`<h5>${res.bio}</h5>`);
    $(".user-info").append(`<h4>${res.name}</h4>`);
    $(".user-info").append(`<h4>@${res.login}</h4>`);
    $(".user-contact").append(`<h6><i class="fab fa-github"></i> <a href="${res.html_url}">Github</a></h6>`);
    $(".user-contact").append(`<h6><i class="fas fa-map-marker-alt"></i> ${res.location}</h6>`);
  })

  $.ajax({
    url: 'https://api.github.com/users/stevenDixonDev/repos',
    method: 'GET'
  }).then(function(res){
    $.each(res, function(index, project){
      console.log(project)
      $.each(allowedProjects, function(index, allowed){
        if(allowed.name === project.name){
          $("#projects").append(`
          <div class="col-md-12 col-lg-6 col-xl-4 mb-3">
          <div class="card bg-dark text-white">
          <img class="card-img-top d-none d-lg-block" src="./assets/images/portfolio/${allowed.picture}" alt="${project.name}" />
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
})

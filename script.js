// Example data
const movies = [
  { title:"Movie 1", image:"https://via.placeholder.com/300x400", description:"Description 1",
    seasons:[{name:"Part 1",servers:["https://example.com/m1p1.mp4","https://example.com/m1p1s2.mp4"]},
             {name:"Part 2",servers:["https://example.com/m1p2.mp4"]}]},
  { title:"Movie 2", image:"https://via.placeholder.com/300x400", description:"Description 2",
    seasons:[{name:"Full Movie",servers:["https://example.com/m2.mp4"]}]}
];

const series = [
  { title:"Series 1", image:"https://via.placeholder.com/300x400", description:"Description S1",
    seasons:[{name:"S1 Ep1",servers:["https://example.com/s1e1.mp4"]},
             {name:"S1 Ep2",servers:["https://example.com/s1e2.mp4"]}]}
];

const moviesGrid=document.getElementById("moviesGrid");
const seriesGrid=document.getElementById("seriesGrid");

// Render grid
function renderGrid(data,grid){
  data.forEach(item=>{
    const card=document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`<img src="${item.image}" alt="${item.title}"><h3>${item.title}</h3>`;
    card.onclick=()=>openModal(item);
    grid.appendChild(card);
  });
}
renderGrid(movies,moviesGrid);
renderGrid(series,seriesGrid);

// Tabs
document.getElementById("moviesTab").onclick=()=>{
  document.getElementById("moviesSection").classList.add("active");
  document.getElementById("seriesSection").classList.remove("active");
  document.getElementById("moviesTab").classList.add("active");
  document.getElementById("seriesTab").classList.remove("active");
};
document.getElementById("seriesTab").onclick=()=>{
  document.getElementById("moviesSection").classList.remove("active");
  document.getElementById("seriesSection").classList.add("active");
  document.getElementById("seriesTab").classList.add("active");
  document.getElementById("moviesTab").classList.remove("active");
};

// Modal
const modal=document.getElementById("detailsModal");
const closeModal=document.querySelector(".close");
const modalTitle=document.getElementById("modalTitle");
const modalDescription=document.getElementById("modalDescription");
const seasonContainer=document.getElementById("seasonContainer");
const serverSelect=document.getElementById("serverSelect");
const video=document.getElementById("videoPlayer");
const player=new Plyr(video);

let currentServers=[],currentServerIndex=0;

function openModal(item){
  modalTitle.textContent=item.title;
  modalDescription.textContent=item.description;

  // Season select
  seasonContainer.innerHTML=`<select id="seasonSelect"></select>`;
  const seasonSelect=document.getElementById("seasonSelect");
  item.seasons.forEach(s=>{
    const opt=document.createElement("option");
    opt.value=JSON.stringify(s.servers);
    opt.textContent=s.name;
    seasonSelect.appendChild(opt);
  });

  currentServers=item.seasons[0].servers;
  currentServerIndex=0;
  player.source={type:'video',sources:[{src:currentServers[currentServerIndex],type:'video/mp4'}]};

  // Server select
  serverSelect.innerHTML="";
  currentServers.forEach((link,index)=>{
    const opt=document.createElement("option");
    opt.value=index;
    opt.textContent=`Server ${index+1}`;
    serverSelect.appendChild(opt);
  });

  serverSelect.onchange=e=>{
    currentServerIndex=e.target.value;
    player.source={type:'video',sources:[{src:currentServers[currentServerIndex],type:'video/mp4'}]};
  };

  seasonSelect.onchange=e=>{
    currentServers=JSON.parse(e.target.value);
    currentServerIndex=0;
    player.source={type:'video',sources:[{src:currentServers[currentServerIndex],type:'video/mp4'}]};
    serverSelect.innerHTML="";
    currentServers.forEach((link,index)=>{
      const opt=document.createElement("option");
      opt.value=index;
      opt.textContent=`Server ${index+1}`;
      serverSelect.appendChild(opt);
    });
  };

  modal.style.display="flex";
}

closeModal.onclick=()=>modal.style.display="none";
window.onclick=e=>{if(e.target==modal) modal.style.display="none";}

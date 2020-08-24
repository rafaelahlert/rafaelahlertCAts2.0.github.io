
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
        try {
          var data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          console.log(err.message + " in " + xmlhttp.responseText);
          return;
        }
        callback(data);
      }
    };
  
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  
  ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
    document.getElementById("id").innerHTML = data[0]["id"];
    document.getElementById("url").innerHTML = data[0]["url"];
  
    var html = '<img src="' + data[0]["url"] + '">';
    document.getElementById("image").innerHTML = html;
  });
  

  const ImageDiv = document.querySelector('#image');
  const id = document.querySelector("#id");
  const url = document.querySelector("#url");
  
  const redDivLabel = document.querySelector(".redDiv label");
  const greenDivLabel = document.querySelector(".greenDiv label");
  const blueDivLabel = document.querySelector(".blueDiv label");
  
  const clearBtn = document.querySelector('#clearBtn');
  const palette = document.querySelector('#palette');
  let cats = JSON.parse(localStorage.getItem('cats')) || [];
  
  for(cats of cats) {
    createCatsBox(cats);
  }
  
  function addToLocalStorage() {
    if(cats.length < 5) {
      cats.push(ImageDiv.textContent);
      localStorage.setItem('cats', JSON.stringify(cats));
      createCatsBox(ImageDiv.textContent);
    }
  }
  
  function createCatsBox(cat) {
    const div = document.createElement('div');
    div.style.backgroundColor = cat;
    palette.appendChild(div);
  }
  
  function clearPalette() {
    localStorage.removeItem('cats');
    cats = [];
    palette.innerHTML = '';
  }
  

  
  function copyToClipboard() {
    navigator.clipboard.writeText(colorDiv.textContent).then(() => {
      console.log(`Valor copiado: ${colorDiv.textContent}`);
    }).catch(error => {
      console.error(`Erro ao acessar área de transferência: ${JSON.stringify(error)}`);
    });
  }
  
  async function asyncCopyToClipboard() {
    try {
      await navigator.clipboard.writeText(colorDiv.textContent);
      console.log(`Valor copiado: ${colorDiv.textContent}`);    
    } catch (error) {
      console.error(`Erro ao acessar área de transferência: ${JSON.stringify(error)}`);
    }
  }
   
  ImageDiv.addEventListener('click', asyncCopyToClipboard);
  ImageDiv.addEventListener('click', addToLocalStorage);
  clearBtn.addEventListener('click', clearPalette);
  
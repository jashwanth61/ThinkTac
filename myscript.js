let keywords = [];
let allData = [];
let filtered = allData;
let autoCompleteOptions = [];
const autoComplete = document.getElementById("autocomplete")

const getContents = async () => {
    let data;
    var xhr = new XMLHttpRequest();
    xhr.open( "GET", "https://gist.githubusercontent.com/manzooralam/4b6aca6e1aa794c57c0cb6e7a2605109/raw/694828a0b1084ef63ff507ed85de3db6e3931e99/list.json" ); // false for synchronous request
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            const home = document.getElementById("home");
            data.forEach((item) => {
                allData.push(item)
                keywords.push(item.Name);
                const html = 
                `<div class="col-lg-4 col-md-6 col-12 item-box">
                    <div class="inner-box w-100">
                        <div class="item-name me-3 w-50 w-md-75">${item.Name}</div>
                        <div class="image-container my-auto">
                            <img class="img-fluid w-100 h-100 me-2 border" src="./images/${item.Name}.jpg" />
                        </div>
                    </div>
                </div>`
                home.innerHTML = home.innerHTML + html
            })
          } else {
            console.error(xhr.statusText);
          }
        }
      };
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(null);
}

const searchHandler = (e) => {
    if(e.length > 0) {
    autoCompleteOptions = [];
    autoComplete.innerHTML = ""
    allData.forEach((item) => {
        if(item.Name.toLowerCase().includes(e.toLowerCase())) {
            autoCompleteOptions.push(item.Name)
        }
    })
    if (autoCompleteOptions.length > 0) {
        autoComplete.style.display = "flex" 
    } else {
        autoComplete.style.display = "none"
    }
    autoCompleteOptions.forEach((item) => {
        autoComplete.innerHTML = autoComplete.innerHTML + 
        `<li>${item}</li>`
    })
} else {
    filtered = allData
    setinnerHtml(filtered)
}
}

const selectHandler = (e) => {
    if(e==="hindi") {
        filtered = allData.filter((item) => (item.Version.startsWith("HI")))
    } else if (e==="english") {
        filtered = allData.filter((item) => (item.Version.startsWith("EN")))
    } else {
        filtered = allData;
    }
    setinnerHtml(filtered)
}

const openSidebar = () => {
    var s = document.getElementsByClassName('sidebar')[0];
    if (s.classList.contains('hider')) {
      s.classList.remove("hider");
      s.classList.add("shower");
    } else {
      s.classList.remove("shower");
      s.classList.add("hider");
    }
};

window.onload = function() {
    getContents();
    const list = document.getElementById("autocomplete")
    const input = document.getElementById("search")

    list.onclick = function(e) {
        e.stopPropagation();
        if(e.target.innerText.length > 0) {
        filtered = allData.filter((item) => (item.Name === e.target.innerText))
        } else {
            filtered = allData;
        }
        setinnerHtml(filtered)
        if(list.style.display === "flex") {
            list.style.display = "none"
        }
    }

    input.onclick = function(e) {
        e.stopPropagation();
    }

    document.onclick = function() {
        if(list.style.display === "flex") {
            list.style.display = "none"
        }
    };
}

const setinnerHtml = (data) => {
    const home = document.getElementById("home");
    home.innerHTML = ""
    data.forEach((item) => {
    const html = 
            `<div class="col-lg-4 col-md-6 col-12 item-box">
            <div class="inner-box w-100">
                <div class="item-name me-3 w-50 w-md-75">${item.Name}</div>
                    <div class="image-container my-auto">
                        <img class="img-fluid w-100 h-100 me-2 border" src="./images/${item.Name}.jpg" />
                    </div>
                </div>
            </div>`
        home.innerHTML = home.innerHTML + html
    })
}
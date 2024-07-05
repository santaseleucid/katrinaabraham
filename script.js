console.log("Hello, World!");

let current_page_name = window.location.href;
let page_source = document.referrer;
if (page_source === "") {
  // could be direct traffic or Internet explorer
  page_source = "empty";
}

window.addEventListener("load", function () {
  let screen_width = window.screen.width;
  let screen_height = window.screen.height;
  let screen_available_width = window.screen.availWidth;
  let screen_available_height = window.screen.availHeight;
  let browser_type = navigator.userAgent;
  let language = navigator.language;
  let time_zone_offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let performance_data = window.performance.timing;
  let page_load_time =
    performance_data.loadEventEnd - performance_data.navigationStart;
  let request_response_time =
    performance_data.responseEnd - performance_data.requestStart;
  let render_time = performance_data.domComplete - performance_data.domLoading;

  console.log("Screen Width:", screen_width);
  console.log("Screen Height:", screen_height);
  console.log("Screen Available Width:", screen_available_width);
  console.log("Screen Available Height:", screen_available_height);
  console.log("Browser Type:", browser_type);
  console.log("Language:", language);
  console.log("Time Zone Offset:", time_zone_offset);
  console.log("Page Load Time:", page_load_time);
  console.log("Request Response Time:", request_response_time);
  console.log("Render Time:", render_time);

  // page load time: wait until load event is finished with setTimeout
  setTimeout(function () {
    //var form = document.getElementById('data-form');
    //var formData = new FormData(form);
   
    
    var xhr = new XMLHttpRequest();
    var url = "https://script.google.com/macros/s/AKfycbyjS_Zwyy9vbUANmePxzjSxdGRg79IgNma_rwz6DmsVqbxucVR_QeAaI-XTVe96bDlcwA/exec"; // Replace with your Web App URL
            //"https://script.google.com/macros/s/AKfycbyjS_Zwyy9vbUANmePxzjSxdGRg79IgNma_rwz6DmsVqbxucVR_QeAaI-XTVe96bDlcwA/exec"
            //"https://script.google.com/macros/s/AKfycbyjS_Zwyy9vbUANmePxzjSxdGRg79IgNma_rwz6DmsVqbxucVR_QeAaI-XTVe96bDlcwA/exec"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var jsonData = {
        "field1": "John Doe",
        "field2": "johndoe@example.com"
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("JSON data submitted successfully!");
        }
    };

    xhr.send(JSON.stringify(jsonData));
  }, 0);
});

function scrollToTarget(targetId) {
  console.log(targetId);
  const target = document.getElementById(targetId);
  target.scrollIntoView({ behavior: "smooth" });
}


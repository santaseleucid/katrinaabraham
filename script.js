console.log("Hello, World!");

let current_page_name = window.location.href;
let page_source = document.referrer;
if (page_source === "") {
  // could be direct traffic or Internet explorer
  page_source = "empty";
}

// window.addEventListener("load", function () {
//   let screen_width = window.screen.width;
//   let screen_height = window.screen.height;
//   let screen_available_width = window.screen.availWidth;
//   let screen_available_height = window.screen.availHeight;
//   let browser_type = navigator.userAgent;
//   let language = navigator.language;
//   let time_zone_offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   let performance_data = window.performance.timing;
//   let page_load_time =
//     performance_data.loadEventEnd - performance_data.navigationStart;
//   let request_response_time =
//     performance_data.responseEnd - performance_data.requestStart;
//   let render_time = performance_data.domComplete - performance_data.domLoading;
//
//   // console.log("Screen Width:", screen_width);
//   // console.log("Screen Height:", screen_height);
//   // console.log("Screen Available Width:", screen_available_width);
//   // console.log("Screen Available Height:", screen_available_height);
//   // console.log("Browser Type:", browser_type);
//   // console.log("Language:", language);
//   // console.log("Time Zone Offset:", time_zone_offset);
//   // console.log("Page Load Time:", page_load_time);
//   // console.log("Request Response Time:", request_response_time);
//   // console.log("Render Time:", render_time);
//
//   // page load time: wait until load event is finished with setTimeout
//   setTimeout(function () {
//
//     var url = "https://script.google.com/macros/s/AKfycbztymiZjI8iTeWYt-_wYeZn8gcqcOq2nEFy26V9DDmGl5RoRAn_A2WETze11jJ7FR6UOQ/exec"; // Replace with your Web App URL
//
//     var jsonData = {
//       screen_width: screen_width,
//       screen_height: screen_height,
//       screen_available_width: screen_available_width,
//       screen_available_height: screen_available_height,
//       browser_type: browser_type,
//       language: language,
//       time_zone_offset: time_zone_offset,
//       page_load_time: page_load_time,
//       request_response_time: request_response_time,
//       render_time: render_time
//     };
//     fetch(url, {
//       method: 'POST',
//       // headers: {
//       //   'Content-Type': 'application/json'
//       // },
//       body: JSON.stringify(jsonData),
//       redirect: 'follow'
//     })
//   }, 0);
// });
//
function scrollToTarget(targetId) {
  console.log(targetId);
  const target = document.getElementById(targetId);
  target.scrollIntoView({ behavior: "smooth" });
}


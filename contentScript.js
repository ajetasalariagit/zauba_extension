const init = function () {
  const injectElement = document.createElement('div');
  injectElement.className = "get_data_btn";
  injectElement.innerHTML = '<div class="btn-container"><div class="vertical-center"><form id="myform"><button  id="myCheck">Start</button></form></div></div>';
  document.body.appendChild(injectElement);
}
init();
myCheck.addEventListener("click", async () => {
  document.querySelector('#myform').addEventListener('submit', e => {
    e.preventDefault();
    var p = 1;
    const myInterval = setInterval(function () {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "drupal.samesite=1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://www.zaubacorp.com/company-list/status-Active/p-" + p + "-company.html", requestOptions)
        .then(response => response.text())
        .then(text => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(text, "text/html");
          var cin = doc.getElementById("table");
          var dataArr = [];
          for (var i = 1; i < cin.rows.length; i++) {
            var cinn = cin.rows[i].cells[0].innerHTML;
            var company = cin.rows[i].cells[1].firstElementChild.getAttribute('href');
            dataArr.push({
              cin: cinn,
              company_link: company
            })
          }
          if (dataArr.length) {
            var my_data = JSON.stringify(dataArr);
            var formData = new FormData();
            formData.append('data', my_data);
           
            var requestSubmit = {
              method: 'POST',
              redirect: 'follow',
              body: formData,
            };
            fetch('http://localhost/zauba_data/submit.php', requestSubmit)
            .then(response => response.json())
            .catch(error => console.log('error', error));
          }
       
        }).catch(error => console.log('error', error));
        if (p == 13333) {
          clearInterval(myInterval);
          return;
      }
      p++;
       
     }, 5000);
  });
});

document.getElementById("addExpenceBtn").addEventListener("click",async (e) => {
  console.log("addExpence btn callled");

  let title = document.getElementById("title").value;
  let expenceType = document.getElementById("expenceType").value;
  let transactionAmount = document.getElementById("transactionAmount").value;
  let date = document.getElementById("date").value;



  try {
    const url = "http://localhost:4000/";
    const query = `
    mutation {
      createExpence(
        data: {
          title: \"${title}\",
          moneyStatus: ${expenceType},
          transactionAmount: ${transactionAmount},
          date: \"${date}\"
        }
      ){
        title
        moneyStatus
        transactionAmount
        date
      }
    }
  `;

    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : "bearer " + localStorage.getItem("token")
          },
        body : JSON.stringify({query})
    }


    const res = await fetch(url , params);
    const data = await res.json();
    console.log(data);

    title = "";
    expenceType = "";
    date = "";
    transactionAmount = "";

    location = "../html/homePage.html"
   
    // localStorage.setItem("expenseToken" , data.data.login.token)
    // window.location = "http://127.0.0.1:5500/client/homePage.html"
}
catch(err)
{
    alert("error please add field appropriatly")
    console.log(err);
}
  console.log(title);
  console.log(expenceType);
  console.log(transactionAmount);
  console.log(date);
});

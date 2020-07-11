document
  .getElementById("addExpenceBtn")
  .addEventListener("click", async (e) => {
    // getting all the data from client side
    let title = document.getElementById("title").value;
    let expenceType = document.getElementById("expenceType").value;
    let transactionAmount = document.getElementById("transactionAmount").value;
    let date = document.getElementById("date").value;

    // call graphQL api
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
          "Content-Type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ query }),
      };

      const res = await fetch(url, params);
      const data = await res.json();

      // clear form value

      title = "";
      expenceType = "";
      date = "";
      transactionAmount = "";

      location = "../html/homePage.html";
    } catch (err) {
      alert("error please add field appropriatly");
    }
  });

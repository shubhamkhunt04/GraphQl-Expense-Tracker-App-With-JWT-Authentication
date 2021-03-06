document.getElementById("addExpence").addEventListener("click", async (e) => {
  location = "../html/expenceForm.html";
});

// display table dynamically

const displayTable = async (e) => {
  // call graphQl api

  const url = "http://localhost:4000";
  const query = `
    query {
          expences {
          id
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

  const response = await fetch(url, params);
  const data = await response.json();

  var index = 1;
  let html = "";
  html1 = `<hr><div class="container my-5 table-responsive">
      <table class="table table-hover table-primary" id="outline">
        <thead>
          <tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">Title</th>
            <th scope="col">Expence Type</th>
            <th scope="col">Transaction Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
    `;
  html2 = ``;
  html3 = ` </tbody>
    </table>
    </div>`;

  data.data.expences.forEach((element) => {
    let moneyReceiveOrPaid = " ";
    let transactionAmountSign = " ";
    if (element.moneyStatus === "MONEYIN") {
      moneyReceiveOrPaid = "Money Receive";
      transactionAmountSign = " +";
    } else {
      moneyReceiveOrPaid = "Money Paid";
      transactionAmountSign = " - ";
    }

    html2 += `
        <tr>
          <th scope="row">${index}</th>
          <th>${element.title}</th>
          <th>${moneyReceiveOrPaid}</th>
          <th>${transactionAmountSign + element.transactionAmount}</th>
          <th>${element.date}</th>
          <th class="zoom"><button value="${
            element.id
          }" onclick="editExpence(this.value)" class="btn btn-dark">EDIT</button></th>
          <th class="zoom"><button value="${
            element.id
          }" onclick="deleteExpence(this.value)" class="btn"><img src="../images/delete.svg" width=30 height=30/></button></th>

          </th>        
          </tr>`;
    index++;
  });

  html = html1 + html2 + html3;
  // setting html code dynamically
  document.getElementById("showtable").innerHTML = html;
};
// funcation call
displayTable();

// Edit Expencec Function

editExpence = async (id) => {
  // call graphQl api
  const url = "http://localhost:4000";
  const query = `
  query{
      findExpence(id:"${id}"){
      id
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

  const response = await fetch(url, params);
  const data = await response.json();

  //   document.getElementById("edit").addEventListener("click", (e) => {
  //     let userdata = localStorage.getItem("userdata");
  //     let data = JSON.parse(userdata);

  html = `
        <!-- Modal -->
            <div class="container p-3 bg-dark w-50 rounded-lg text-white">
                <form method="POST">
                    <div class="form-group">
                        <label for="updatedTitle">Title</label>
                        <input type="text" class="form-control" id="updatedTitle" autocomplete="off" value="${data.data.findExpence.title}">
                    </div>
                    <div class="form-group">
                        <label for="updatedExpenceType">Expence Type</label>
                        <input type="text" class="form-control" id="updatedExpenceType" autocomplete="off" value="${data.data.findExpence.moneyStatus}">
                
                    </div>
                    <div class="form-group">
                        <label for="updatedTransactionAmount">Transaction Amount</label>
                        <input type="number" class="form-control" id="updatedTransactionAmount" autocomplete="off" value="${data.data.findExpence.transactionAmount}">
                    </div>
                    <div class="form-group">
                        <label for="updatedDate">Date</label>
                        <input type="date" class="form-control" id="updatedDate" autocomplete="off" value="${data.data.findExpence.date}">
                    </div>
                    <button type="button" id="updateBtn" class="btn w-25 btn-primary zoom">Update</button>

                </form>
                </div>
        `;
  document.getElementById("editmodal").innerHTML = html;

  // Update API call when user click on update button

  document.getElementById("updateBtn").addEventListener("click", async (e) => {
    const updatedTitle = document.getElementById("updatedTitle").value;
    const updatedExpenceType = document.getElementById("updatedExpenceType")
      .value;
    const updatedTransactionAmount = document.getElementById(
      "updatedTransactionAmount"
    ).value;
    const updatedDate = document.getElementById("updatedDate").value;

    // call graphQl api
    const url = "http://localhost:4000";
    const query = `
    mutation {
      updateExpence(
        id: "${id}"
        data: {
          title: \"${updatedTitle}\"
          moneyStatus: ${updatedExpenceType}
          transactionAmount: ${updatedTransactionAmount}
          date: \"${updatedDate}\"
        }
      ) {
        id
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

    const response = await fetch(url, params);
    const data = await response.json();

    document.getElementById("editmodal").innerHTML = "";

    location = "../html/homePage.html";
  });
};

// Delete Expence Function

deleteExpence = async (id) => {
  // call graphQl api
  const url = "http://localhost:4000";
  const query = `
    mutation{
      deleteExpence(id:"${id}"){
        id
        title
        moneyStatus
        transactionAmount
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

  const response = await fetch(url, params);
  const data = await response.json();

  location = "../html/homePage.html";
};

// Total Money Receive

const date = new Date();
const currentDate = `${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;

totalMoneyReceive = async () => {
  // call graphQl api
  const url = "http://localhost:4000";
  const query = `
    query{
      currentMonthMoneyIn(date:\"${currentDate}\")  
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

  const response = await fetch(url, params);
  const data = await response.json();

  document.getElementById("totalMoneyReceive").innerHTML =
    data.data.currentMonthMoneyIn;
};
totalMoneyReceive();

// Total Money Paid

totalMoneyPaid = async () => {
  const url = "http://localhost:4000";
  const query = `
    query{
      currentMonthMoneyOut(date:\"${currentDate}\")  
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

  const response = await fetch(url, params);
  const data = await response.json();

  document.getElementById("totalMoneyPaid").innerHTML =
    data.data.currentMonthMoneyOut;
};
totalMoneyPaid();

document.getElementById("ssignup").addEventListener("click", async (e) => {
  console.log("btm clcik");

  e.preventDefault();

  const susername = document.getElementById("susername").value;
  const semail = document.getElementById("semail").value;
  const spassword = document.getElementById("spassword").value;
  try {
    const url = "http://localhost:4000";
    const query = `
        mutation{
          registerUser(data:{
            username:\"${susername}\",
            password:\"${spassword}\",
            email:\"${semail}\"
          })
          {
            username
          }
        }
      `;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    const response = await fetch(url, params);
    const data = await response.json();
    // console.log(data.data.registerUser.username);

    localStorage.setItem("username", data.data.registerUser.username);

    location = "../html/login.html";
    // console.log(data.data.register.token);
    // localStorage.setItem("expenseToken" , data.data.register.token)
    // window.location = "http://127.0.0.1:5500/client/homePage.html"
  } catch (err) {
    throw err;
  }

  console.log(susername);
  console.log(semail);
  console.log(spassword);

  // window.location = "../html/login.html"
});

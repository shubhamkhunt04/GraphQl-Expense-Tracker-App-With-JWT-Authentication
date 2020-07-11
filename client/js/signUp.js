document.getElementById("ssignup").addEventListener("click", async (e) => {
  e.preventDefault();

  const susername = document.getElementById("susername").value;
  const semail = document.getElementById("semail").value;
  const spassword = document.getElementById("spassword").value;

  // call graphQl api
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

    localStorage.setItem("username", data.data.registerUser.username);

    location = "../html/login.html";
  } catch (err) {
    throw err;
  }
});

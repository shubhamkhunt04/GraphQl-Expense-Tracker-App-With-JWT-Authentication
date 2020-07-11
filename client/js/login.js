document.getElementById("llogin").addEventListener("click", async (e) => {
  const lusername = document.getElementById("lusername").value;
  const lpassword = document.getElementById("lpassword").value;

  // call graphQl api

  try {
    const url = "http://localhost:4000";
    const query = `
        mutation{
            loginUser(data:{
              username:\"${lusername}\",
              password:\"${lpassword}\"
            })
            {
              token
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

    localStorage.setItem("token", data.data.loginUser.token);

    location = "../html/homePage.html";
  } catch (err) {
    throw err;
  }
});

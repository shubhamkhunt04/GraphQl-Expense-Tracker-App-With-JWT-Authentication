document.getElementById('llogin').addEventListener('click',async(e)=>{
    console.log("btm clcik")

    const lusername = document.getElementById('lusername').value;
    const lpassword = document.getElementById('lpassword').value;

    console.log(lusername);
    console.log(lpassword);


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
        // console.log(data);
        // console.log(data.data.loginUser.token);
    
        localStorage.setItem("token", data.data.loginUser.token);
    
        location = "../html/homePage.html";
        // console.log(data.data.register.token);
        // localStorage.setItem("expenseToken" , data.data.register.token)
        // window.location = "http://127.0.0.1:5500/client/homePage.html"
      } catch (err) {
        throw err;
      }
    
    
    // window.location = "../html/login.html"

})
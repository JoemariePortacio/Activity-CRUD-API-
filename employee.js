function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const queryString = window.location.search; // Returns:'?id=1' in HTML URL
const params = new URLSearchParams(queryString); // Search URL paramerter
const id = params.get("id"); // is the number of id like 1 and so on

// GET one record
$(document).ready(function() {
    $.ajax({
        url: `http://localhost/Activity(CRUD-API)/Emp_Crud_Api/index.php?id=${id}`,
        method: "GET", 
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            document.getElementById("id").value = response[0].id;
            document.getElementById("lastname").value = response[0].firstname;
            document.getElementById("firstname").value = response[0].lastname;
            document.getElementById("middle").value = response[0].lastname;
            document.getElementById("address").value = response[0].address;
            document.getElementById("email").value = response[0].email;
            document.getElementById("birthday").value = response[0].birthday;
            document.getElementById("cel").value = response[0].cel;
            document.getElementById("department").value = response[0].department;
            document.getElementById("gender").value = response[0].gender;
            document.getElementById("bio").value = response[0].bio;
            document.getElementById("pic").value = response[0].pic;
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            alert(err.Message);
        }
    })
});

//PUT record
function updateRecord(){
    var data = {
        lastname : document.getElementById("lastname").value,
        firstname : document.getElementById("firstname").value,
        middle : document.getElementById("middle").value,
        address : document.getElementById("address").value,
        email : document.getElementById("email").value,
        cel : document.getElementById("cel").value,
        birthday : formatDate(document.getElementById("birthday").value),
        department : document.getElementById("department").value,
        gender : document.getElementById("gender").value,
        bio : document.getElementById("bio").value,
        pic : document.getElementById("pic").value,
    }
    $.ajax({
        url: `http://localhost/Activity(CRUD-API)/Emp_Crud_Api/index.php?id=${id}`,
        method: "PUT",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function(response) {
            window.location.assign("/");
            
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            console.log(err.Message);
        }
    });
}

// DELETE Record
function deleteRecord(){
    const id = document.getElementById("id").value;
    $(document).ready(function() {
        $.ajax({
            url: `http://localhost/Activity(CRUD-API)/Emp_Crud_Api/index.php?id=${id}`,
            method: "DELETE", 
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                window.location.assign("/");
                
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert(err.Message);
            }
        })
    });
}


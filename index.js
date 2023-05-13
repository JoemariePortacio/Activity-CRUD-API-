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
function getAllRecord(){
        $.ajax({
            url: "http://localhost/Activity(CRUD-API)/Emp_Crud_Api/",
            method: "GET", 
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                txt = "";
                for(var item of response){
                    txt += 
                    `
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.lastname}</td>
                        <td>${item.firstname}</td>
                        <td>${item.middle}</td>
                        <td>${item.address}</td>
                        <td>${item.email}</td>
                        <td>${item.cel}</td>
                        <td>${item.birthday}</td>
                        <td>${item.department}</td>
                        <td>${item.gender}</td>
                        <td>${item.bio}</td>
                        <td>${item.pic}</td>
                        <td>
                            <a href="employee.html?id=${item.id}" class="btn btn-outline-dark btn-sm">More Details</a>
                        </td>
                    </tr>
                    
                    `;
                    document.getElementById("api").innerHTML = txt;
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert(err.Message);
            }
        });
}

function addRecord(){
    var data = {
        lastname : document.getElementById("firstname").value,
        firstname : document.getElementById("lastname").value,
        middlename : document.getElementById("middlename").value,
        address : document.getElementById("address").value,
        email : document.getElementById("email").value,
        cel : document.getElementById("cel").value,
        birthday : formatDate(document.getElementById("birthday").value),
        department : document.getElementById("department").value,
        gender : document.getElementById("gender").value,
        bio : document.getElementById("bio").value,
        pic : document.getElementById("imageInput").value,

    }
    $(document).ready(function() {
        $.ajax({
            url: "http://localhost/Activity(CRUD-API)/Emp_Crud_Api/",
            method: "POST", 
            
            data: JSON.stringify(data),
            success: function(response) {
                getAllRecord()
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert(err.Message);
            }
        })
    });
}
$(document).ready(function() {
    getAllRecord();
});
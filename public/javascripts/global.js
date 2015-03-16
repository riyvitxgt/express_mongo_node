/**
 * Created by King on 2015/3/16.
 */
var userListData = [];

$(document).ready(function(){
    populateTable();
    $('#userList table tbody').on('click', 'td a.linkshowuser',showUserInfo);
});

//Fill table with data
function populateTable(){
    //Empty conttent string
    var tableContent = '';
    //jQuery AjAX call for JSON
    $.getJSON('/users/userlist',function(data){
        userListData = data;
        $.each(data,function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);
    });
}

//show user info
function showUserInfo(event){
    event.preventDefault();

    var thisUserName = $(this).attr('rel');

    var arrayPosition = userListData.map(function(arraItem){
        return arraItem.username;
    }).indexOf(thisUserName);

    var thisUserObject = userListData[arrayPosition];

    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}

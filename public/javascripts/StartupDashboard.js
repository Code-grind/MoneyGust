let listcoin = $('#listContainer');
$(document).ready(function() {
    $(function () {
        $.ajax({
            url: "http://localhost:3000/success",
            type: "GET",
        }).done(function (json) {
            //console.log(json);
        }).fail(function (xhr, status) {
            console.log(status);
        });
    });
    $(function () {
        $.ajax({
            url: "http://localhost:3000/investorList",
            type: "GET",
        }).done(function (json) {
            console.log(json);
            AppendList(json);
        }).fail(function (xhr, status) {
            console.log(status);
        });
    });
});

function AppendList(data) {
    let temp = "";
    $.each(data, function (index, value) {
        temp += `<div class="item">
                    <div class="image">
                        <img src="https://semantic-ui.com/images/avatar2/large/kristy.png">
                    </div>
                    <div class="content">
                        <a class="header">${value['CompanyName']}</a>
                        <div class="meta">
                            <span class="cinema">${value['Email']}</span>
                        </div>
                        <div class="description">
                            <p>${value['AboutCompany']}</p>
                        </div>
                        <div class="extra">
                            <div class="ui right floated primary button">
                                Approach
                                <i class="right chevron icon"></i>
                            </div>
                            <div class="ui label">Amount Investor can fund (dynamic)</div>
                        </div>
                    </div>
                </div>`;
    });
    //$("body").html("");
    listcoin.html(temp);
}

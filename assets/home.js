
$(document).ready(function () {
    var mydata = [];
    $.ajax({
        url: './assets/data.json',
        async: false,
        dataType: 'json',
        success: function (json) {
            mydata = json;
            mydata.forEach(element => {
                display(element);

            });
        }
    });

    // alert(mydata[0]['company']);
    function display(job) {
        $("#card-container").append(`
            <div class="card mt-5 mx-auto">
                <div class="card-body  ">
                    <div class="img-container rounded d-flex align-items-center justify-content-center " style="background-color:${job.logoBackground}">
                    <img src=${job.logo} class="my-auto" />
                    </div>
                    <div>
                    <p>${job.postedAt} . ${job.contract}</p>
                    <h3 class="link" id=${job.id}>${job.position}</h3>
                    <span>${job.company}</span>
                    </div>
                    <br>
                    <h4>${job.location}</h4>
                </div>
            </div>
            `);
    }

    $("#submit").click(function (event) {
        var searchResults = mydata;
        const title = $("#title").val()
        const location = $("#location").val()
        const fullTimeOnly = $("#full-time").is(":checked")
        // alert($("#full-time").is(":checked"))
        searchResults = searchResults.filter((job, index, arr) => {
            console.log(job)
            if (job['position'].indexOf(title) != -1) {
                return true;
            }
            if (job.company.indexOf(title) != -1) {
                return true;
            }
            return false;
        });


        searchResults = searchResults.filter((job, index, arr) => {
            if (job.location.indexOf(location) != -1) {
                return true;
            }
            return false;
        })
        if (fullTimeOnly) {
            searchResults = searchResults.filter((job, index, arr) => {
                if (job.contract === "Full Time") {
                    return true;
                }
                return false;
            })
        }
        $("#card-container").empty();
        if (searchResults.length > 0) {
            searchResults.forEach(element => {
                display(element);

            });
        } else {
            $("#card-container").append("No Results Found")
        }



        event.preventDefault();
        return false;
    });

    $('.link').click(function (event) {
        const id = event.target.id;
        var job = mydata.find(item => item.id == id);
        var data = ""
        console.log(job.id);

        if ($("#search-bar").is(":visible")) {
            $("#search-bar").hide();
        }
        if ($("#card-container").is(":visible")) {
            $("#card-container").empty();
            $("#card-container").hide();
        }
        if ($("#load-more").is(":visible")) {
            $("#load-more").hide();
        }
        data = `
                <div id="job-header" 
                style="height: 140px;background:white;width:70%;max-width:768px;min-width: calc(100% - 49vw);top:-40px;position:relative;margin:auto;border-radius: 5px;display: flex;align-items: center;" class="row">
                    <div class="col-sm-2 h-100 img-container rounded d-flex align-items-center justify-content-center" style="background-color:${job.logoBackground}">
                        <img class="my-auto"  src=${job.logo} style="width:80px; height:23px;">
                    </div>
                    <div class="col-sm-10" style="display: flex;flex-direction:row;">
                        <div class="row w-100">
                            <div class="col-sm-7">
                                <h2 id="company-name">${job.company}</h2>
                                <span>${job.website}</span>
                            </div>
                            <div class="col-sm-5">
                                <a type="button" style="height:48px;width:147px;text-align:center;" class=" btn button-default button-light"><h4>Company Site</h4></a>
                            </div>
                        </div>
                    </div>
            </div>
            `;
        data += `
            <div id="job-body"
                    style="height: auto;background:white;width:70%;max-width:768px;min-width: calc(100% - 49vw);top:-40px;position:relative;margin:auto;border-radius: 5px;display: flex;align-items: center;" class="row px-4 py-4 mt-4">
                <div class="row w-100">
                <div class="col-sm-9">
                    <p>${job.postedAt} . ${job.contract}</p>
                    <h3>${job.position}</h3>
                    <h4>${job.location}</h4>
                </div>
                <div class="col-sm-3 my-auto">
                    <button  type="button" style="height:48px;width:147px;color:white;background-color:#5964E0" class=" btn mx-auto btn-primary my-auto"><b>Apply Now</b></button>
                </div>
                </div>
                <br>
                <div class="row w-100 mt-4">
                <span>${job.description}</span>
                </div>
                <div class="row w-100 mt-4">
                <h3>Requirements</h3><br>
                <p>${job.requirements.content}</p>
                <ul style="padding-left:2em">`;
        job.requirements.items.forEach(item => data += ` <li>${item}</li><br>`);
        data += `</ul>
                </div>
            
                <div class="row w-100">
                <span>${job.description}</span>
                </div>
                <div class="row w-100 mt-4">
                <h3>What You Will Do</h3><br>
                <p>${job.role.content}</p>
                <ol style="padding-left:2em">`;
        job.role.items.forEach(item => data += ` <li>${item}</li><br>`);
        data += `</ol>
                </div>
            </div>
            `
        data += `
            <div class="row" id="job-footer" style="height:96px;background-color:white">
                <div class="row h-100 mx-auto py-4 " style="width:70%;max-width:768px;min-width: calc(100% - 49vw);">
                <div class="col-sm-8">
                    <h3>${job.position}</h3> 
                    <span>${job.company}</span>
                </div>
                <div class="col-sm-4 my-auto">
                    <button type="button" class="btn btn-primary">Apply Now</button>
                </div>
                </div>
            </div>
                `;
        $("body").append(data);
        switchDarkMode()
    })
    $("#switch-mode").click(switchDarkMode);
    var darkMode = localStorage.getItem('myCat');
    if (darkMode==true){
        $('#switch-mode').attr('checked','checked');
        if ($("#switch-mode").is(":checked")){
            switchDarkMode();
        }
    }
    function switchDarkMode() {
        if ($("#switch-mode").is(":checked")){
        localStorage.setItem('dark-mode',true);
        $('.card').addClass('card-dark-mode');
        $('#search-bar').addClass('card-dark-mode');
        $('input').addClass('card-dark-mode');
        $('.link').addClass('link-dark-mode');
        $('h3').addClass('link-dark-mode');
        $('#full-time-text').addClass('link-dark-mode')
        $('#company-name').addClass('link-dark-mode')
        $('body').addClass('body-dark-mode');
        $('#full-time').addClass('full-time-dark-mode');
        $("#job-header").addClass('card-dark-mode');
        $("#job-body").addClass('card-dark-mode');
        $("#job-footer").addClass('card-dark-mode');
    } else{
        localStorage.removeItem('dark-mode')
        $('.card').removeClass('card-dark-mode');
        $('#search-bar').removeClass('card-dark-mode');
        $('input').removeClass('card-dark-mode');
        $('.link').removeClass('link-dark-mode');
        $('h3').removeClass('link-dark-mode');
        $('#full-time-text').removeClass('link-dark-mode');
        $('#company-name').removeClass('link-dark-mode')
        $('body').removeClass('body-dark-mode');
        $('#full-time').removeClass('full-time-dark-mode');
        $("#job-header").removeClass('card-dark-mode');
        $("#job-body").removeClass('card-dark-mode');
        $("#job-footer").removeClass('card-dark-mode');
        }
        
    }

});
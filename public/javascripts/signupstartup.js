function asd(a)
{
    if(a==1)
        document.getElementById("asd").style.display="none";
    else
        document.getElementById("asd").style.display="block";
};



$('.restore.example .button')
    .on('click', function() {
        $('.restore.example .ui.dropdown')
            .dropdown('restore defaults')
        ;
    })
;
 if(location.pathname.toLowerCase()=='/planning-resources/brochure-request')
{
    ///hide the cta's 
    $("[href='#digital'], [href='#print']").hide();
   
    //show digital form
    $('#digital').removeClass('collapse')
    $('#digital-brochure-cta').parents('[id="Feature Photo"]').hide();
    
    //Change text of intro copy
    $("[id^=Feature]").eq(0).find('span').text('Discover a world of beautiful, high-performing appliances for your dream kitchen and home with this free guide from Sub-Zero, Wolf, and Cove. Page through dozens of inspiring photos and informative product features in this convenient digital brochure.')
    $("[id^=Feature]").eq(1).find('span').remove()


    //log user input to load on next form page
    MktoForms2.whenReady(function (form) 
    {
        form.onSuccess(function()
        {
            sessionStorage.setItem('adobeTarget',JSON.stringify(form.vals()))
        });
    });
}
else if(location.pathname.toLowerCase().indexOf('thank-you')>-1)
{
  document.title = 'Thank You! Digital Brochure Request | Sub-Zero, Wolf, and Cove Appliances'
  
  $('[id^=Feature] span').eq(0).text("Your brochure request is confirmed—start paging through the digital version today. We recommend bookmarking or saving the brochure for easy access in the future.")
    //append the form
    var placeHere = $('#main-content .col-xs-12').eq(0)
    placeHere.append('<div class ="col-xs-12 secondIntro"><div id="Feature Photo" class="component component-general-content-block"><div class="component-general-content-block__list narrow-container-width"><span style="background-color: #ffffff;">Would you also like to receive a printed copy of the brochure? Complete the form below and a printed brochure will be delivered to you in 2–4 weeks.</span></div></div><form id="mktoForm_1511"></form>')
    
    //parse the user's input from the old form
    var vals = JSON.parse(sessionStorage.getItem('adobeTarget'))
    
    // !!! Form page utilizies a different URL of the form2.min.js file. I assume this is because issues with SameSite cookie setting
    $.getScript('//pages.subzero-wolf.com/js/forms2/js/forms2.min.js', function() {
        // !!! After the file has loaded, run the function
        // load in the form where the form tag was appended from API
        MktoForms2.loadForm("//app-ab03.marketo.com", "029-CEK-917", 1511)
        MktoForms2.whenReady(function (form) 
        {
            //Change copy of CTA (client request)
            $('form button').text('REQUEST PRINTED BROCHURE')
            
            //fill values from previous form to minimize effort
            form.setValues(vals)
            //loop through and hide the form fields that were previously filled out
            for (var i=0; i<$('.mktoField').length;i++)
            {
                if($('.mktoField').eq(i).val().length>0)
                {
                  //Postal code is a little different
                    if ($('.mktoField').eq(i).attr('id')=='PostalCode')
                    {
                        $('.mktoField').eq(i).parents('.mktoFieldDescriptor').hide()
                    }
                    else
                    {
                        $('.mktoField').eq(i).parents('.mktoFormRow').hide()
                    }
                }
            }
            //random styling
            $('#State').parents('.mktoFieldDescriptor').attr('style','width:49%!important')
            $('#City').parents('.mktoFieldDescriptor').attr('style','width:49%!important')
            
            form.onSuccess(function(values, followUpUrl) {
           // Get the form's jQuery element and hide it
           form.getFormElem().hide();
           //Remove the lead in copy
           $('.secondIntro').hide()
           //change the copy at the top of the page
           $("[id^=Feature]").eq(0).find('span').text('Your printed brochure request is confirmed. You can expect it to arrive in 2–4 weeks. In the meantime, start paging through the digital version today. We recommend bookmarking or saving the brochure for easy access in the future.')
           //cheap way to scroll user back to top
           $('.back-to-top-button').click()
document.title = 'Thank You! Printed Brochure Request | Sub-Zero, Wolf, and Cove Appliances'

           // Return false to prevent the submission handler from taking the lead to the follow up url
           return false;
         
                });
        });
    });
}
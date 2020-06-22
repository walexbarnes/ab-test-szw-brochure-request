# szw-brochure-request

## Background
The key conversion point on the website is the brochure request form. Prospective shoppers can submit a brochure request form and receive an informational brochure with information about the products. Historically, the form has been offered in both a digital format and a printed format. The digital brochure is available immediately. The printed brochure takes between 2-4 weeks to arrive at the user's door. 

Recently, an analysis showed that submissions that utilized the digital brochure led to more revenue. As such, the client requested that we begin to phase out the printed brochure. 

The client wanted to ensure that removing the printed option did not negatively impact conversion rates before they implemented the change in their CMS, Sitecore. As such, we leveraged our A/B Testing tool, Adobe Target, to implement and test the impact of the change with agility. 


## How did the form operate before?

The form page gives the user the option as to which form they would like to receive. 
The form is not visible until the user selects what kind of form they would like. 
Once the user selects a form type, the respective form appears for the user to fill out. 
For the test, these two buttons should no longer appear. Furthermore, the digital form should display upon page load instead of on click of the button. 

![ControlForm1](images/control1.png)

The digital form is displayed below. This form should load on page load, instead of on click of the Digital Download button as before. 

![ControlForm2](images/control2.png)

The printed form is displayed below, This form is longer than is the digital form. It should not be displayed at all. 

![ControlForm3](images/control3.png)

Regardless of the type of form submission, the user is taken to the thank you page once they are done. This is what the page looks like before. For the test, on page load, the printed brochure should load between the View Digital Brochure button and the Create Account module. There should be some copy to lead the user into the form so as not to appear jarring. Furthermore, the copy above should change to reflect that the user can also submit a form to receive a printed brochure. This form is longer than the digital brochure, but has many overlapping fields. The user's input from the previous form should automatically fill out these overlapping fields once the form has loaded, and then hide those forms, so as not to encumber the user. Upon submission, the copy should change at the top to reflect the successful submission. The user should be scrolled to the top. 

![ControlForm4](images/control4.png)

## How does the form look after the test is implemented?

On page load, the two buttons for form type choice are hidden. The digital form is set to display on page load instead of on click of these buttons (by toggling a CSS class). The intro copy is changed to reflect that this is a digital only brochure form. 

Upon submission, the form's API is accessed - through this API, I retrieve the form's field values and store them in the browser's storage. Since the API returns these values in a JSON, I stringify these results so that I can store them in the browser storage. 

![TestForm1](images/test1.png)

The user is taken to the thank you page, as usual. However, now, the printed form displays on this page on load. 
To load the form, I need to be able to call the API to the form vendor. However, I cannot access the relevant object without first loading in the vendor's .js file. I did not have to load this .js file on the previous page, as it was already present. 
Once I load the script, and verify it is done loading, I am able to access the form object. 
Once I am able to access the form object, I load the printed form using one of its methods. 
Once the form is loaded, I access the browser storage item that has all the user's input on the previous page. 
I parse that browser storage item, and proceed to fill out all overlapping fields between the printed and digital brochure forms. 
Once that is done, I check the length of all form fields and hide the ones that have values within them. In this way, the form looks much easier for the user to fill out than it was before. 

![TestForm2](images/test2.png)

Once the user submits this second form, I hide the form and the intro copy. I change the copy at the top of the page to reflect the successful form submission. I scroll the user to the top of the page to help solidify the feeling of submisssion. I return false on the submission handler so that the user is not taken to the follow up page (which would just reload the page). 

![TestForm3](images/test3.png)



({
     doSave : function(component, event, helper) {
          var action = component.get('c.createContact');
        var contc = component.get('v.CreateContact');
       
         var validContact = component.find('contactForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
         
         if(validContact){
             
            action.setParams({
                con : component.get('v.CreateContact'),
                AccountId : component.get('v.accountId')
            });
            
            action.setCallback(this, function(response){
                console.log("Hello3");
                var state = response.getState();
                console.log(state);
                if(state === 'SUCCESS' || state === 'DRAFT'){
                    var reponseValue = response.getReturnValue();
                   
                    var componentEvent = component.getEvent('addItem');
                    componentEvent.setParams({
                        "item" : reponseValue
                    });
                    componentEvent.fire();
                }else if(state === 'INCOMPLETE'){
                    
                }else if(state === 'ERROR'){
                    var errors = response.getError(); //Array of Error
                    console.log('Error ', errors[0].duplicateResults);
                    console.log('Error ', errors[0].fieldErrors);
                    console.log('Error ', errors[0].pageErrors[0].message);
                    component.set('v.ErroMessage' , errors[0].pageErrors[0].message);
                    if(errors || errors[0].message){
                        
                    }
                    
                }
            },'ALL');
            $A.enqueueAction(action);
        }
     }
    
})
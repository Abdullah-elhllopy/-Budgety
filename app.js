//budjet controller
 var BudgetControler =( ()=> {       
    var Expences = function(id, description, value){
           this.description = description 
           this.value = value
           this.id = id 
        }
    var Incomes = function(id, description, value){
           this.description = description 
           this.value = value
           this.id = id 
        }
     
    var data = {
           allItems : {
                exp : [] ,
                inc: []
            },
           total : {
                exp : 0 ,
                inc :  0
            },
            budjet :0,
            prestange : -1
        }    
    function calculateTotal (type){
     let sum = 0;
     data.allItems[type].forEach((cur)=>{
        sum += cur.value ;
     })
     data.total[type] = sum;
     
     }    
    return{
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expences(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Incomes(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
       
           }, calculateBudjet : function(){
             //calculate incomes and Expences
             calculateTotal('inc');
             calculateTotal('exp');
             // calculate budjet = income - Expences
             data.budjet = data.total.inc-data.total.exp;
             // calculate the presentage
             data.prestange = Math.round((data.total.exp / data.total.inc) * 100) ;
            
            },
              getbudjet : ()=>{
              return{
              budjet : data.budjet,
              totalinc : data.total.inc,
              totalexp : data.total.exp,
              prestange : data.prestange
              }

              }


        } 
     



}) ();
       
    // ui controler
 var uicontroler = (()=>{
    var DomString = {
           inputType : '.add__type' ,
           description : '.add__description' ,
           value :     '.add__value' ,
           addbtn : '.add__btn'    ,
           incomeContainer: '.income__list',
           expensesContainer: '.expenses__list',
           budjetValue : ".budget__value",
           budjetIncomeValue : ".budget__income--value",
           budjetExpencesValue : ".budget__expenses--value",
           budjetprestange : ".budget__expenses--percentage"
        
        }
    return{
           
        handbudjetvalue :(obj)=>{
       /* return{
            budjet : document.querySelector(DomString.budjetValue),
            income : document.querySelector(DomString.budjetIncomeValue),
            expences : document.querySelector(DomString.budjetExpencesValue),
            presentage : document.querySelector(DomString.budjetprestange)
        //}*/
        document.querySelector(DomString.budjetValue).textContent = obj.budjet;
        document.querySelector(DomString.budjetIncomeValue).textContent = obj.totalinc;
        document.querySelector(DomString.budjetExpencesValue).textContent = obj.totalexp;
            (obj.prestange > 0) ? document.querySelector(DomString.budjetprestange).textContent = obj.prestange + '%': document.querySelector(DomString.budjetprestange).textContent = '--';

       }
        ,
        getinput : ()=>{
                 return{
                    type : document.querySelector(DomString.inputType).value, 
                    description : document.querySelector(DomString.description).value,
                    value : parseFloat( document.querySelector(DomString.value).value )
                }   
           }
       ,   getDomstring : () =>{
                 return DomString ;
           }
         , addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DomString.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DomString.expensesContainer;
                
                html = '<div class="item clearfix" id="expence-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }, 
        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DomString.description + ', ' + DomString.value);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
    }} ) ();
    
var UpdateBudjet = function(){
          //calculate budjet
          BudgetControler.calculateBudjet();
          
          // return budjet
           var input= BudgetControler.getbudjet();
         
          //display budjet i UI
          uicontroler.handbudjetvalue(input);
         /*
          display.budjet.textContent = input.budjet;
          display.income.textContent = input.totalinc;
          display.expences.textContent = input.totalexp;
          display.presentage.textContent = input.prestange;
        */
        }


 var controler = ((BudgetCtrl , UiCtrl)=>{
    var setEventlisiter = ()=>{
          var Dom = UiCtrl.getDomstring();
          document.querySelector(Dom.addbtn).addEventListener('click',ctrlAddItem);
       } 
    var ctrlAddItem = ()=>{
    //take item from the user
          var input = UiCtrl.getinput();
   
          if(input.description != "" && !isNaN( input.value) && input.value>0 ){
                //Add input to the budjet
                var newItem = BudgetCtrl.addItem(input.type , input.description ,input.value)
                            
                //displsy item in UI
                    UiCtrl.addListItem(newItem,input.type); 
                // clear a filed
                UiCtrl.clearFields();
             UpdateBudjet();

            }

   
          //calculate budjet
    
    //display budjet i UI
           }
    return {
     init : ()=>{
    UiCtrl.handbudjetvalue( {budjet : 0,
        totalinc : 0,
        totalexp : 0,
        prestange : 0 });
        setEventlisiter();
             
    }
           };
    
    })(BudgetControler,uicontroler);
     
   controler.init();
  /*
   var array =[80,1,7,9,6,5,8,3,0];
  function returnSmallIndex(arr){
   var small = arr[0]
   var  small_index = 0
  for(let i =0 ;i<arr.length ; i++){
      if(arr[i] < small ){
          small = arr[i];
      small_index = i ;
        }
  }
return small_index ;
}
function selection(arr){
 var small = 0;
    let newArray = []
   for(let i = 0 ; i< arr.length ; i++){
     small = returnSmallIndex(arr);
     newArray.push(arr[small]);
       arr.splice(small,1);
   }
    return newArray;
       }
var x = selection(array);

console.log(x)
*/
/*
function factorial(n){ 
   if(n===0){
       return 1 ;
   }
   else{
       return n * factorial(n-1)
   } 
}
*/







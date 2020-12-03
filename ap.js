
// Budject controler
var BudgetControler =( ()=> {
let x
    return{    
updatebudjet : (d , v)=>{
 x = Number(d) - Number(v);
return x;
}
 }

}) ();




// ui controler

var uicontroler = (()=>{
    
    let income = 0;
   let expences = 0;
    return{
    updateIncome : (d)=>{
        income = income + Number(d);
       return income;
        }
    , updateExpences : (g)=>{
     expences = expences + Number(g);
      return expences;
        }
        , updatePres : (s,k) =>{
    var pres= 0 ;      
   pres =Math.floor((s*100)/k) + ' %';        
return pres;
}      
    }

} ) ();





// controler
var controler = ((BudgetCtrl , UiCtrl)=>{
var ctrlAddItem = ()=>{
//take item from the user
   var description = document.querySelector('.add__description').value;
   var values = document.querySelector('.add__value').value;



//Add item to the budjet


//displsy item in UI

var select= document.querySelector('.add__type').options[0];
if(select.selected == true && select.value == 'inc' ){
    document.querySelector('.budget__income--value').textContent = ' + '+ UiCtrl.updateIncome(values);
   values = 0;
   document.querySelector('.budget__expenses--percentage').textContent = UiCtrl.updatePres(UiCtrl.updateExpences(values),UiCtrl.updateIncome(values))

}
else{
    document.querySelector('.budget__expenses--value').textContent = '  - ' + UiCtrl.updateExpences(values);;
    values = 0;
    document.querySelector('.budget__expenses--percentage').textContent = UiCtrl.updatePres(UiCtrl.updateExpences(values),UiCtrl.updateIncome(values))

  }
 



//calculate budjet

document.querySelector('.budget__value').textContent = BudgetCtrl.updatebudjet(UiCtrl.updateIncome(values) , UiCtrl.updateExpences(values))


//display budjet i UI

}

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);



})(BudgetControler,uicontroler);



























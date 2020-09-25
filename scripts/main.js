(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var PAY_SELECTOR = '[data-payment="payment"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var PaymentHandler = App.PaymentHandler;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);
    var paymentHandler = new PaymentHandler(PAY_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList,data);
    });
    
    paymentHandler.addSubmitHandler(function(data) {
        console.log("Payment Complete");

    });

    $(document).ready(function(){
        $("#payment-form").load("form.html");   
    });


})(window);
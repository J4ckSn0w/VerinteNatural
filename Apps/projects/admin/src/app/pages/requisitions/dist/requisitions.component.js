"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequisitionsComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var RequisitionsComponent = /** @class */ (function () {
    function RequisitionsComponent(modalService, productService, requisitionService, router, providerService, harvestService, calendar) {
        this.modalService = modalService;
        this.productService = productService;
        this.requisitionService = requisitionService;
        this.router = router;
        this.providerService = providerService;
        this.harvestService = harvestService;
        this.calendar = calendar;
        /*Modal Inicio*/
        this.newForm = new forms_1.FormGroup({
            date: new forms_1.FormControl(null, [forms_1.Validators.required]),
            quantity: new forms_1.FormControl(null),
            quantity_real: new forms_1.FormControl(null),
            provider_id: new forms_1.FormControl(null)
        });
        this.currentView = 0;
        this.arrayViewsNames = ['Nueva solicitud de compra', 'Editar solicitud de compra', 'Info solicitud de compra', 'Hoja de Recoleccion'];
        this.show = false;
        this.closeResult = '';
        this.tableLoad = false;
        this.arrayRequisitions = [];
        this.arrayRequisitionProducts = [];
        this.currentRequisition = {
            id: '',
            products: [],
            status: 0
        };
        this.errorProducts = false;
        this.errorDate = false;
        this.currentProduct = {
            id: '',
            quantity: '',
            name: '',
            provider_id: '',
            quantity_real: ''
        };
        this.arrayProducts = [];
        this.arrayOrderProducts = [];
        this.minDate = {};
        /*Hoja general de recoleccion */
        this.errorGeneralProduct = '';
        this.arrayProviders = [];
        this.arrayGeneralProduct = [];
    }
    RequisitionsComponent.prototype.getDismissReason = function (reason) {
        if (reason == ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason == ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a background';
        }
        else {
            return "with " + reason;
        }
    };
    RequisitionsComponent.prototype.fnCloseModal = function () {
        this.modalService.dismissAll();
        /**Funcion para cargar la informacion de nuevo depsues de incambio */
        //this.fnLoadProducts();
    };
    RequisitionsComponent.prototype.fnOpenModal = function () {
        var _this = this;
        this.modalService.open(this.myModal, { size: 'lg' }).result.then(function (result) {
        }, function (reason) {
            _this.getDismissReason(reason);
        });
    };
    RequisitionsComponent.prototype.ngOnInit = function () {
        this.fnLoadProducts();
        this.fnLoadRequisitions();
        /**Trying to set this to a variable to acces in callback functions */
        this.globalContext = this;
        this.minDate = this.calendar.getToday();
    };
    RequisitionsComponent.prototype.fnLoadRequisitions = function () {
        var _this = this;
        this.tableLoad = false;
        this.arrayRequisitions = [];
        this.requisitionService.fnGetAllRequisition()
            .then(function (res) {
            res.data.forEach(function (element) {
                _this.arrayRequisitions.push(element);
            });
            _this.tableLoad = true;
            console.log(res);
        })["catch"](function (rej) {
            console.log('Algo salio mal');
            console.log(rej);
        });
    };
    RequisitionsComponent.prototype.fnLoadRequisition = function (id) {
        var _this = this;
        this.requisitionService.fnGetRequisitionById(id)
            .then(function (res) {
            _this.currentRequisition = res.data;
            _this.arrayOrderProducts = res.data.products;
            console.log(_this.currentRequisition);
            //console.log('Date');
            var first = res.data.created_at.split('-');
            var last = first[2].split('T');
            _this.firstDate = { year: Number(first[0]), month: Number(first[1]), day: Number(last[0]) };
            //console.log(this.firstDate);
            _this.fnUpdateGeneralProducts(); //Solo para cantidades autorizadas al hacer hoja de recoleccion general
            _this.fnCheckRemainingProducts();
        });
    };
    RequisitionsComponent.prototype.fnVer = function (id) {
        this.show = true;
        this.currentView = 1;
        this.fnOpenModal();
        this.fnLoadRequisition(id);
    };
    RequisitionsComponent.prototype.fnEdit = function (id) {
        this.show = false;
        this.currentView = 1;
        this.fnCheckRemainingProducts();
        this.fnLoadRequisition(id);
        this.fnCleanProducts();
        this.fnOpenModal();
    };
    RequisitionsComponent.prototype.fnNew = function () {
        this.newForm.reset();
        this.currentView = 0;
        this.show = false;
        this.fnCleanProducts();
        this.fnOpenModal();
    };
    RequisitionsComponent.prototype.fnCleanProducts = function () {
        this.arrayOrderProducts = [];
        this.fnLoadProducts();
    };
    RequisitionsComponent.prototype.fnDelete = function (id) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'warning',
            title: 'Eliminar Solicitud.',
            text: 'Desea eliminar la solicitud de mercancia?',
            showDenyButton: true,
            denyButtonText: 'Si',
            confirmButtonText: 'No'
        }).then(function (result) {
            if (result.isDenied) {
                _this.requisitionService.fnDeleteRequisition(id)
                    .then(function (res) {
                    sweetalert2_1["default"].fire({
                        icon: 'success',
                        title: 'Correcto!',
                        text: 'Se elimino la solicitud de mercancia correctamente',
                        didClose: function () {
                            _this.fnLoadRequisitions();
                        }
                    });
                })["catch"](function (rej) {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Hubo un error al intentar eliminar la solicitud de mercancia'
                    });
                });
            }
        });
    };
    RequisitionsComponent.prototype.fnLoadProducts = function () {
        var _this = this;
        this.arrayProducts = [];
        //this.arrayRequisitions = [];
        this.productService.fnGetProducts()
            .then(function (res) {
            res.data.forEach(function (element) {
                _this.arrayProducts.push(element);
                //console.log('ELEMENT');
                //console.log(element);
            });
            _this.fnCheckRemainingProducts();
            //console.log('Respuesta');
            //console.log(res.data);
        });
    };
    RequisitionsComponent.prototype.fnDateFormat = function (date) {
        return this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + (this.firstDate.day > 10 ? '' : '0') + this.firstDate.day;
        //return ''+date.year + '-'+((date.month <10 )? +('0'):'' )+date.month +'-'+ (date.day < 10) ? +('0'):'' + date.day;
    };
    RequisitionsComponent.prototype.onSubmitEdit = function () {
        var _this = this;
        this.errorProducts = false;
        this.errorDate = false;
        var data = {
            required_to: this.fnDateFormat(this.firstDate),
            products: this.arrayOrderProducts,
            id: this.currentRequisition.id
        };
        console.log('Data');
        console.log(data);
        console.log(this.currentRequisition);
        this.requisitionService.fnUpdateRequisition(data)
            .then(function (res) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se edito correctamente la solicitud de mercancia',
                didClose: function () {
                    //this.fnLoadProducts();
                    _this.fnCloseModal();
                    _this.fnLoadRequisitions();
                }
            });
        })["catch"](function (rej) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error!',
                text: 'Hubo un error al intentar editar la solicitud de mercancia'
            });
            console.log('ERROR');
            console.log(rej);
        });
    };
    RequisitionsComponent.prototype.onSubmitNew = function () {
        var _this = this;
        this.errorProducts = false;
        this.errorDate = false;
        this.lastDate = this.calendar.getToday();
        if (this.fnCheckDates() == true) {
            console.log('Fecha erronea');
            return;
        }
        var data = {
            required_to: this.fnDateFormat(this.firstDate),
            products: this.arrayOrderProducts
        };
        console.log('Length');
        console.log(this.arrayOrderProducts.length);
        if (this.arrayOrderProducts.length <= 0) {
            this.errorProducts = true;
            return;
        }
        console.log(this.firstDate);
        console.log('FECHA');
        console.log(data.required_to);
        this.requisitionService.fnPostNewRequisition(data)
            .then(function (res) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Correcto!',
                text: 'Se creo la solicitud de mercancia correctamente',
                didClose: function () {
                    _this.fnLoadRequisitions();
                    _this.fnCloseModal();
                }
            });
        })["catch"](function (rej) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error!',
                text: 'Algo salio mal al intentar crear la nueva solicitud.'
            });
            console.log('ALGO SALIO MAL');
            console.log(rej);
        });
    };
    RequisitionsComponent.prototype.fnDeleteProduct = function (id) {
        //console.log('Entre aqui');
        //console.log(this.arrayOrderProducts.length);
        //this.arrayProviderProducts.splice(id);
        //delete this.arrayProviderProducts[id];
        for (var i = 0; i < this.arrayOrderProducts.length; i++) {
            if (this.arrayOrderProducts[i].id == id) {
                this.arrayOrderProducts.splice(i, 1);
                i--;
            }
        }
        //console.log('Despues');
        //console.log(this.arrayOrderProducts.length);
        this.fnLoadProducts();
        this.fnCheckRemainingProducts();
        //CALANDO CON CANTIDAD AUTORIZADA
        /*
        for(var i = 0 ; i < this.arrayGeneralProduct.length; i ++ ){
          if( this.arrayGeneralProduct[i].id == id){
            this.arrayGeneralProduct.splice(i,1);
            i--;
          }
        }*/
    };
    RequisitionsComponent.prototype.onOptionsSelected = function (event) {
        console.log(event); //option value will be sent as event
        this.currentProduct.id = event;
    };
    RequisitionsComponent.prototype.fnAddProduct = function () {
        var _this = this;
        //let data = this.arrayProducts[this.currentProduct.id];
        var data = this.arrayProducts.find(function (element) { return element.id == _this.currentProduct.id; });
        //console.log('AL CONSULTAR');
        //console.log(data);
        //console.log(data);
        if (this.currentProduct.id == undefined || this.newForm.value.quantity == undefined || data == undefined) {
            return;
        }
        var newProduct = {
            id: this.currentProduct.id,
            quantity: this.newForm.value.quantity,
            name: data.name
        };
        // console.log('Nuevo producto');
        // console.log(newProduct);
        console.log('Antes de agregar producto en arrayOrderProduct');
        console.log(this.arrayOrderProducts);
        this.arrayOrderProducts.push(newProduct);
        /*Limpia el valor de cantidad */
        this.newForm.value.quantity = '';
        this.newForm.controls['quantity'].setValue('');
        //console.log(this.arrayOrderProducts);
        //CALANDO CON CANTIDAD AUTORIZZADA
        /*
        let otherProduct = {
          id:newProduct.id,
          quantity:'',
          provider_id:''
        }
    
        this.arrayGeneralProduct.push(otherProduct);*/
        this.fnCheckRemainingProducts();
    };
    RequisitionsComponent.prototype.fnCheckRemainingProducts = function () {
        for (var i = 0; i < this.arrayOrderProducts.length; i++) {
            for (var j = 0; j < this.arrayProducts.length; j++) {
                if (this.arrayOrderProducts[i].id == this.arrayProducts[j].id) {
                    this.arrayProducts.splice(j, 1);
                    j--;
                }
            }
        }
    };
    RequisitionsComponent.prototype.fnChangheStatus = function (id) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'info',
            title: 'Cambiar Status',
            text: 'Cambiar status de la solicitud de mercancia',
            showDenyButton: true,
            denyButtonText: 'Rechazar',
            confirmButtonText: 'Acceptar'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.changeStatus(id, 2);
            }
            else if (result.isDenied) {
                _this.changeStatus(id, 3);
            }
        });
    };
    RequisitionsComponent.prototype.changeStatus = function (id, status) {
        var _this = this;
        this.requisitionService.fnPutChangeStatusRequisition(id, status)
            .then(function (res) {
            if (status != 2) {
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Correcto!',
                    text: 'Se cambio el status de la solicitud correctamente',
                    didClose: function () {
                        _this.fnLoadRequisitions();
                    }
                });
            }
        })["catch"](function (rej) {
            if (status != 2) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Hubo un error al intentar cambiar el status de la solicitud de mercancia'
                });
            }
            console.log('Error');
            console.log(rej);
        });
    };
    /* Check para ventas en cada hoja de requerimientos */
    RequisitionsComponent.prototype.fnCheckRequisition = function (id) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'question',
            title: 'Aprobar Hoja',
            text: 'Desea aprobar esta hoja de requerimientos?',
            confirmButtonText: 'Confirmar.'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.requisitionService.fnPutChangeStatusRequisition(id, 1)
                    .then(function (res) {
                    sweetalert2_1["default"].fire({
                        icon: 'success',
                        title: 'Correcto',
                        text: 'Se confirmo la hoja de requerimientos correctamente',
                        didClose: function () {
                            _this.fnLoadRequisitions();
                        }
                    });
                })["catch"](function (rej) {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Algo salio mal al intentar confirmar la hoja de requerimientos'
                    });
                    console.log('Error');
                    console.log(rej);
                });
            }
        });
    };
    /*Generar hoja de recoleccion*/
    RequisitionsComponent.prototype.fnGenerateCollectionOrder = function (id) {
        var _this = this;
        this.fnLoadProviders();
        this.currentView = 3;
        this.show = false;
        this.fnLoadRequisition(id);
        return;
        console.log('id');
        console.log(id);
        this.requisitionService.fnGetRequisitionById(id)
            .then(function (res) {
            _this.currentRequisition = res.data;
        })["catch"](function (rej) {
            console.log('Error al traer la informacion de requisition');
            console.log(rej);
        });
        console.log('Current Requisition');
        console.log(this.currentRequisition);
        console.log('Status');
        console.log(this.currentRequisition.status);
        if (this.currentRequisition.status != 2) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error!',
                text: 'No puede crear una hoja de recoleccion de esta hoja de requerimientos, hasta ser aceptada por compras.'
            });
            return;
        }
        this.router.navigate(["/admin/purchase", id]);
    };
    RequisitionsComponent.prototype.fnLoadProviders = function () {
        var _this = this;
        this.arrayProviders = [];
        this.providerService.fnGetProvidersWithProducts()
            .then(function (res) {
            res.data.forEach(function (element) {
                _this.arrayProviders.push(element);
            });
            console.log('Array en res');
            console.log(_this.arrayProviders);
            _this.fnOpenModal();
        });
    };
    RequisitionsComponent.prototype.fnLoadProvider = function (id) {
        this.providerService.fnGetProviderById(id)
            .then(function (res) {
            return res.data;
        })["catch"](function (rej) {
            console.log('Algo salio mal al traer al proveedor');
            console.log(rej);
        });
    };
    RequisitionsComponent.prototype.fnProviderContainsProduct = function (id, elemento) {
        console.log('Elemento');
        console.log(elemento);
        console.log('ID');
        console.log(id);
        var provider = this.fnLoadProvider(elemento.id);
        return elemento;
        /*
       if(provider.products.include(id))
       {
         return elemento;
       }
       else{
         return null;
       }*/
    };
    RequisitionsComponent.prototype.fnFilterProvidersByProductId = function (product_id) {
        var newArray = [];
        //  console.log('Providers');
        //  console.log(this.arrayProviders[1].products);
        this.arrayProviders.forEach(function (element) {
            if (element.products.hasOwnProperty(product_id)) {
                newArray.push(element);
            }
        });
        return newArray;
    };
    RequisitionsComponent.prototype.fnCreateGeneralRecolectionOrder = function () {
        var _this = this;
        var newProductsArray = [];
        this.errorGeneralProduct = '';
        console.log('Orden de recoleccion general');
        console.log(this.currentRequisition);
        console.log('ArrayGeneralProducts');
        console.log(this.arrayGeneralProduct);
        if (this.arrayGeneralProduct.length == 0) {
            //error
            this.errorGeneralProduct = 'No puede crear una orden de recoleccion general sin productos!';
        }
        this.arrayGeneralProduct.forEach(function (element) {
            if (element.quantity_real == undefined || element.quantity_real == 0 || element.quantity_real == ""
                || element.provider_id == 0 || element.provider_id == "" || element.provider_id == undefined) {
                //error
                _this.errorGeneralProduct = 'Favor de llenar todos los campos necesarios.';
            }
            else {
                newProductsArray.push({
                    id: element.id,
                    quantity_real: '',
                    provider_id: element.provider_id,
                    name: element.name,
                    quantity: element.quantity_real
                });
            }
        });
        var data = {
            requisition_id: this.currentRequisition.id,
            products: newProductsArray
        };
        console.log('Data');
        console.log(data);
        this.harvestService.fnPostNewHarvest(data)
            .then(function (res) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Correcto',
                text: 'Se creo la hoja de recoleccion general',
                didClose: function () {
                    _this.changeStatus(_this.currentRequisition.id, 2);
                    _this.fnCloseModal();
                }
            });
        })["catch"](function (rej) {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error!',
                text: 'Ocurrion un error al intentar crear la hoja de recoleccion general'
            });
        });
    };
    RequisitionsComponent.prototype.fnUpdateGeneralProducts = function () {
        var _this = this;
        console.log('Entre a update general product');
        this.arrayGeneralProduct = [];
        if (this.arrayOrderProducts.length > 0) {
            if (this.arrayGeneralProduct.length == 0) {
                this.arrayOrderProducts.forEach(function (element) {
                    _this.arrayGeneralProduct.push({
                        id: element.id,
                        quantity_real: '',
                        provider_id: '',
                        name: element.name,
                        quantity: element.quantity
                    });
                });
                console.log('Tamaño de productos orden general');
                console.log(this.arrayGeneralProduct.length);
                console.log(this.arrayGeneralProduct);
            }
            else {
            }
        }
        else {
            this.arrayGeneralProduct = [];
        }
    };
    RequisitionsComponent.prototype.fnAddProductToGeneral = function () {
        var _this = this;
        console.log('Entre a ProductGeneral');
        var data = this.arrayProducts.find(function (element) { return element.id == _this.currentProduct.id; });
        //if(this.currentProduct.id == undefined || this.newForm.value.quantity == undefined || data == undefined){
        if (this.currentProduct.id == undefined || this.currentProduct.quantity == undefined || data == undefined) {
            console.log('Entre a aquijujujuju');
            console.log(this.currentProduct.id);
            console.log(this.newForm.value.quantity);
            console.log(data);
            return;
        }
        console.log('Aqui tambien');
        var newProduct = {
            id: Number(this.currentProduct.id),
            quantity: Number(this.currentProduct.quantity),
            name: data.name,
            quantity_real: Number(this.currentProduct.quantity),
            provider_id: Number(this.currentProduct.provider_id)
        };
        console.log('Ando aca');
        /**Probando auxiliar */
        //this.arrayGeneralProduct = this.arrayGeneralProduct;
        //let newArray = [...this.arrayGeneralProduct];
        var newArray = [];
        this.arrayGeneralProduct.forEach(function (element) {
            newArray.push({
                id: element.id,
                quantity: element.quantity,
                quantity_real: element.quantity_real,
                provider_id: element.provider_id,
                name: element.name
            });
        });
        console.log('Antes de push');
        console.log(newArray);
        //setTimeout(() => { newArray.push(newProduct); console.log('Dentro del delay'); console.log(newArray);this.arrayGeneralProduct = newArray}, 1000);
        console.log('NewArray');
        console.log(newArray);
        /*Limpia el valor de cantidad */
        //this.newForm.value.quantity = '';
        //this.newForm.controls['quantity'].setValue('');
        this.currentProduct = {
            id: '',
            name: '',
            quantity: '',
            provider_id: '',
            quantity_real: ''
        };
        newArray.push(newProduct);
        console.log('Dentro del delay');
        console.log(newArray);
        this.arrayGeneralProduct = newArray;
        this.fnCheckRemainingProducts();
    };
    RequisitionsComponent.prototype.fnDeleteProductToGeneral = function (id) {
        for (var i = 0; i < this.arrayGeneralProduct.length; i++) {
            if (this.arrayGeneralProduct[i].id == id) {
                this.arrayGeneralProduct.splice(i, 1);
                i--;
            }
        }
        this.fnLoadProducts();
        this.fnCheckRemainingProducts();
    };
    RequisitionsComponent.prototype.fnCheckDates = function () {
        if (this.lastDate.year > this.firstDate.year) {
            console.log('Año menor');
            return true;
        }
        else {
            if (this.lastDate.month > this.firstDate.month) {
                console.log('Mes menor');
                return true;
            }
            else {
                if ((this.lastDate.day > this.firstDate.day) && this.lastDate.month == this.firstDate.month) {
                    console.log('Dia es menor');
                    return true;
                }
            }
        }
    };
    __decorate([
        core_1.ViewChild('myModal')
    ], RequisitionsComponent.prototype, "myModal");
    RequisitionsComponent = __decorate([
        core_1.Component({
            selector: 'app-requisitions',
            templateUrl: './requisitions.component.html',
            styleUrls: ['./requisitions.component.css']
        })
    ], RequisitionsComponent);
    return RequisitionsComponent;
}());
exports.RequisitionsComponent = RequisitionsComponent;

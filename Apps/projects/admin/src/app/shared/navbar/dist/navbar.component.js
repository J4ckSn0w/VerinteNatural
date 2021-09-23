"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, sessionService) {
        this.router = router;
        this.sessionService = sessionService;
        this.logged = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.fnSesionIniciada();
        /*this.myFunction();*/
        this.MyQuery($);
    };
    NavbarComponent.prototype.MyQuery = function ($) {
        $(".sidebar-dropdown > a").click(function () {
            $(".sidebar-submenu").slideUp(200);
            if ($(this)
                .parent()
                .hasClass("active")) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            }
            else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(200);
                $(this)
                    .parent()
                    .addClass("active");
            }
        });
        $("#close-sidebar").click(function () {
            $(".page-wrapper").removeClass("toggled");
        });
        $("#show-sidebar").click(function () {
            $(".page-wrapper").addClass("toggled");
        });
    };
    ;
    NavbarComponent.prototype.fnSesionIniciada = function () {
        var valor = localStorage.getItem("authorization");
        if (localStorage.getItem("authorization")) {
            console.log('Entre al true');
            this.logged = true;
        }
        else {
            console.log('Entre a false');
            this.logged = false;
        }
    };
    NavbarComponent.prototype.fnLogout = function () {
        this.sessionService.fnLogOut();
        this.router.navigate(['/']);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;

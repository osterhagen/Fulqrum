var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '../../services/auth.service';
var NbLogoutComponent = (function () {
    function NbLogoutComponent(service, router) {
        this.service = service;
        this.router = router;
        this.redirectDelay = 1500;
    }
    NbLogoutComponent.prototype.ngOnInit = function () {
        this.logout('email');
    };
    NbLogoutComponent.prototype.logout = function (provider) {
        var _this = this;
        this.service.logout(provider).subscribe(function (result) {
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    return NbLogoutComponent;
}());
NbLogoutComponent = __decorate([
    Component({
        selector: 'nb-logout',
        template: "\n    <div>Logging out, please wait...</div>\n  ",
    }),
    __metadata("design:paramtypes", [NbAuthService,
        Router])
], NbLogoutComponent);
export { NbLogoutComponent };
//# sourceMappingURL=logout.component.js.map
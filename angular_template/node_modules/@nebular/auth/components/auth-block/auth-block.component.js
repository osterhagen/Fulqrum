var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var NbAuthBlockComponent = (function () {
    function NbAuthBlockComponent() {
    }
    return NbAuthBlockComponent;
}());
NbAuthBlockComponent = __decorate([
    Component({
        selector: 'nb-auth-block',
        styles: ["@media (max-width: 550px){:host /deep/ .accept-group{font-size:12px;padding:0}}:host /deep/ form{width:100%}:host /deep/ .alert{text-align:center}:host /deep/ .title{margin-bottom:0.75rem;text-align:center}:host /deep/ .sub-title{margin-bottom:2rem;text-align:center}:host /deep/ .checkbox{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:normal}:host /deep/ .form-group.accept-group{display:flex;justify-content:space-between;margin:2rem 0}:host /deep/ .form-group.accept-group .forgot-password{line-height:2}:host /deep/ .links{text-align:center;margin-top:1.75rem}:host /deep/ .links .socials{margin:1.5rem 0 2.5rem}:host /deep/ .links .socials a{font-size:2rem;margin:0 1rem;text-decoration:none} "],
        template: "\n    <ng-content></ng-content>\n  ",
    })
], NbAuthBlockComponent);
export { NbAuthBlockComponent };
//# sourceMappingURL=auth-block.component.js.map
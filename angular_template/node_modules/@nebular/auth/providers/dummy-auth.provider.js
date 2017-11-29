var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NbAuthResult } from '../services/auth.service';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
var NbDummyAuthProvider = (function (_super) {
    __extends(NbDummyAuthProvider, _super);
    function NbDummyAuthProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultConfig = {
            delay: 1000,
        };
        return _this;
    }
    NbDummyAuthProvider.prototype.authenticate = function (data) {
        return Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.register = function (data) {
        return Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.requestPassword = function (data) {
        return Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.resetPassword = function (data) {
        return Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.logout = function (data) {
        return Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.createDummyResult = function (data) {
        if (this.getConfigValue('alwaysFail')) {
            return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
        }
        return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
    };
    return NbDummyAuthProvider;
}(NbAbstractAuthProvider));
NbDummyAuthProvider = __decorate([
    Injectable()
], NbDummyAuthProvider);
export { NbDummyAuthProvider };
//# sourceMappingURL=dummy-auth.provider.js.map
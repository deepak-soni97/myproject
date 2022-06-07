import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SvcLocalStorageService {

    constructor() { }
    GetData(KeyName: string): (string | undefined) {
        return localStorage.getItem(KeyName)||undefined;
    }
    SetData(KeyName: string, Value: string): void {
        return localStorage.setItem(KeyName, Value);
    }
    DeleteData(KeyName: string): void {
        localStorage.removeItem(KeyName);
    }
    DeleteAll(): void {
        localStorage.clear();
    }
}

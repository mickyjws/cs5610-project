import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';


@Injectable()

export class ItemService {

    constructor(private _http: Http) {
    }

    baseUrl = environment.baseUrl;

    createItem(userId: String, item: any) {
        const body = {
            category: item.category,
            name: item.name,
            url: item.url,
            price: item.price,
            title: item.title,
            description: item.description,
            isNew: item.isNew
        };
        return this._http.post(this.baseUrl + '/api/user/' + userId + '/item', body)
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    findAllSellingItemsForUser(userId: String) {
        return this._http.get(this.baseUrl + '/api/user/' + userId + '/item')
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    findAllItems() {
        return this._http.get(this.baseUrl + '/api/item')
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    findLatestSixItems() {
        return this._http.get(this.baseUrl + '/api/item6')
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    findItemById(itemId: String) {
        return this._http.get(this.baseUrl + '/api/item/' + itemId)
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    // findItemWatcher(itemId: String) {
    //     return this._http.get(this.baseUrl + '/api/item/' + itemId + '/watcher')
    //         .map(
    //             (res: Response) => {
    //                 return res.json();
    //             }
    //         );
    // }

    updateItem(itemId: String, item: any) {
        // const body = {
        //     _seller: item._seller,
        //     category: item.category,
        //     name: item.name,
        //     price: item.price,
        //     url: item.url,
        //     title: item.title,
        //     description: item.description,
        //     is_new: item.is_new
        // };
        return this._http.put(this.baseUrl + '/api/item/' + itemId, item)
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }

    deleteItem(itemId: String) {
        return this._http.delete(this.baseUrl + '/api/item/' + itemId)
            .map(
                (res: Response) => {
                    return res.json();
                }
            );
    }
}

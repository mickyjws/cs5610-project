import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Http, Response} from '@angular/http';


@Injectable()

export class WidgetService {

  constructor(private _http: Http) {
  }

  baseUrl = environment.baseUrl;

  createWidget(pageId: String, widget: Widget) {
    const body = {
      type: widget.type,
    };
    return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findWidgetsByPageId(pageId: String) {
    return this._http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findWidgetById(widgetId: String) {
    return this._http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updateWidget(widgetId: String, widget: Widget) {
    const body = {
      _page: widget.pageId,
      widgetType: widget.type,
      size: widget.size,
      text: widget.text,
      url: widget.url,
      width: widget.width,
      name: widget.name,
      rows: widget.rows,
      placeholder: widget.placeholder,
      formatted: widget.formatted,
      height: widget.height
    };
    return this._http.put(this.baseUrl + '/api/widget/' + widgetId, body)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deleteWidget(widgetId: String) {
    return this._http.delete(this.baseUrl + '/api/widget/' + widgetId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  sortWidgets(pageId: String, start: number, end: number) {
    return this._http.put(this.baseUrl + '/api/page/' + pageId + '/widget?startIndex=' + start
      + '&endIndex=' + end, ' ')
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}

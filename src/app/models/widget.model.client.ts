export class Widget {
  _id: String;
  type: String;
  pageId: String;
  size: string;
  text: string;
  url: string;
  width: string;
  name: string;
  rows: string;
  placeholder: string;
  formatted: boolean;
  height: string;

  constructor(_id, widgetType, pageId, size = '1', text = 'text', url = 'url', width = '100%',
              name = null, rows = null, placeholder = null, formatted = null, height = '100%') {
    this._id = _id;
    this.type = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.url = url;
    this.width = width;
    this.name = name;
    this.rows = rows;
    this.placeholder = placeholder;
    this.formatted = formatted;
    this.height = height;
  }
}


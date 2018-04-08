var mongoose = require("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("Widget", WidgetSchema);
var PageModel = require("../page/page.model.server");

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;


// Creates new widget instance for parent page whose _id is pageId
function createWidget(pageId, widget) {
  // return WidgetModel.create(widget).then(function (widget) {
  //   PageModel.findPageById(pageId).then(function (page) {
  //     page.widgets.push(widget);
  //     return page.save();
  //   });
  // });
  widget._page = pageId;
  return WidgetModel.create(widget);
}

// Retrieves all widgets for parent page whose _id is pageId
function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId});
}

// Retrieves widget whose _id is widgetId
function findWidgetById(widgetId) {
  return WidgetModel.findById(widgetId);
}

// Updates widget whose _id is widgetId
function updateWidget(widgetId, widget) {
  return WidgetModel.update({_id: widgetId}, widget);
}

// Removes widget whose _id is widgetId
function deleteWidget(widgetId) {
  return WidgetModel.remove({_id: widgetId});
}


// Modifies the order of widget at position start into final position end in page whose _id is pageId
function reorderWidget(pageId, start, end) {

  return WidgetModel.findAllWidgetsForPage(pageId).then(function (widgets) {

    // sort the widget list by its position
    widgets.sort(function (x, y) {
      return x.position - y.position;
    });

    const startWidget = widgets[start];
    const startIndex = widgets.indexOf(startWidget);
    const endWidget = widgets[end];
    const endIndex = widgets.indexOf(endWidget);

    if (start > end) {
      widgets.splice(endIndex, 0, startWidget);
      widgets.splice(startIndex + 1, 1);
    } else {
      widgets.splice(endIndex + 1, 0, startWidget);
      widgets.splice(startIndex, 1);
    }

    widgets.forEach(function (widget, index) {
      widget.position = index;
      widget.save();
    });

  });
}

module.exports = WidgetModel;

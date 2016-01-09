var mongoose=require("mongoose");

require("../schemas/user");
require("../schemas/publish");
require("../schemas/record");
require("../schemas/book");
require("../schemas/message");
require("../schemas/manage");
require("../schemas/publish_book");


exports.User=mongoose.model("User");
exports.Publish=mongoose.model("Publish");
exports.Book=mongoose.model("Book");
exports.Record=mongoose.model("Record");
exports.Message=mongoose.model("Message");
exports.Manage=mongoose.model("Manage");
exports.PublishBook=mongoose.model("PublishBook");
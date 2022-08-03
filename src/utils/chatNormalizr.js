const {schema, normalize} = require('normalizr')
const util = require('util')


normalizeChat = (data) => {
    
    const authorSchema = new schema.Entity(
        "E-mail",
        {},
        { idAttribute: "mail" }
      );
      const postSchema = new schema.Entity("POST", {
        author: authorSchema,
      });
      const dataSchema = new schema.Entity("DATA", {
        posts: [postSchema],
      });
    
      const normalicedBlog = normalize(data, dataSchema);
      return normalicedBlog;
    
}

module.exports = {normalizeChat}

# Website Blog Thing

A feature rich, very lightweight and scalable alternative to wordpress, joomla and drupel. This software is **not** really intended for users with zero web dev experience, but is heading in that direction.


# Themes

Themes are designed to be light weight, self contained and all editable in browser. A versioning system will be coming in the future, but for now you can just clone a theme and rename it, adjusting the version number as you go. 

Each theme is comprised of three parts. The templates, SASS and Typescript. (Typescript will compile to JS (es6) and then browserify. There will be features in the future to select your compile options and use regular es6/7 instead of typescript.

The themes are structured as follows: 

```
.
├── layouts
│   ├── main.hbs
│   └── store.hbs
├── templates
│   ├── home-1.hbs
│   ├── blog-1-no-sidebar.hbs
│   └── blog-2-left-sidebar.hbs
├── partials
│   ├── header-1.hbs
│   ├── footer-1.hbs
│   ├── blog-thumbnail-1.hbs
│   └── blog-thumbnail-2.hbs
└── theme-config.json
```
If you are unfamiliar with handlebars, you can read more about it here: https://handlebarsjs.com/

# Development

### Getting Started
In order to make your own routes, sockets, models (database calls) and controllers, or to make any changes to the existing code base; you will want to do the following:

1. ``` git clone ```
2. ``` npm install ```
3.  Create a .env file in the root directory for all of your environment variables (notably 'NODE_ENV=development)'
4. ``` npm run build ```
5. ``` npm run dev ```

# iBlogle

[![CircleCI](https://circleci.com/gh/megmut/iblogle.svg?style=svg)](https://circleci.com/gh/megmut/iblogle)


A feature rich, very lightweight and scalable alternative to wordpress, joomla and drupel. This software is **not** really intended for users with zero web-dev experience, but is heading in that direction.


# Out Of The Box


This project is designed to give you a very strong, fast and lightweight setup for creating a website, blog and even eCommerce (see road-map). Without any extra development or plugins, the following features are as standard:

1. Pages (live & preview)
2. Posts (live & preview)
3. Media
4. Secure Login for Users & Clients (see docs)
5. In browser theme editor
6. Development mode (theme preview)
7. Database Cacher (currently only mysql)
8. Server Stats (queries per hour, memory used, website hits etc)
9. In browser logging (server side logs available in admin interface for development)

# Themes

Themes are designed to be light weight, self contained and all editable in browser. A versioning system will be coming in the future, but for now you can just clone a theme and rename it, adjusting the version number as you go.

Each theme is comprised of three parts. The templates, SASS and Typescript. (Typescript will compile to JS (es6) and then browserify. There will be features in the future to select your compile options and use regular es6/7 instead of typescript.

The themes are structured as follows:

```
.
..
├── layouts
│ ├── main.hbs
│ └── store.hbs
├── templates
│ ├── home-1.hbs
│ ├── blog-1-no-sidebar.hbs
│ └── blog-2-left-sidebar.hbs
├── partials
│ ├── header-1.hbs
│ ├── footer-1.hbs
│ ├── blog-thumbnail-1.hbs
│ └── blog-thumbnail-2.hbs
└── theme-config.json

```

If you are unfamiliar with handlebars, you can read more about it here: https://handlebarsjs.com/


# Development


### Getting Started

In order to make your own routes, sockets, models (database calls) and controllers, or to make any changes to the existing code base; you will want to do the following:

1.  ``` git clone ```
2.  ``` npm install ```
3. Create a .env file in the root directory for all of your environment variables (notably 'NODE_ENV=development)'
4.  ``` npm run build ```
5.  ``` npm run dev ```


Here is an example of the .env file, loaded by dotenv.

```

NODE_ENV=development

MYSQL_ADDRESS=localhost

MYSQL_PORT=3306

MYSQL_NAME=test_blog

MYSQL_USERNAME=root

MYSQL_PASSWORD=adminpassword

```

## File Path Caching

When reading, saving, deleting or creating new files, the path is cached on the backend to ensure that no paths are sent to any client. This takes place in the FileController class, found in src/server/controller/fileController.ts.

When any requests to do with a file on disk is required, a new unique id (uuidv4) is generated, and the file is stored in a hash map against that ID. That ID is then returned to the client and sent back with subsequent requests, where the server can lookup the hash map to retrieve the path. This stops the client or any malicious web requests from ever getting access to a path without the correct ID.
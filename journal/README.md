<!--
SPDX-FileCopyrightText: Rafael Muselmann <ch.subel@gmx.de>
SPDX-License-Identifier: CC0-1.0
-->

# Journal
Place this app in **nextcloud/apps/**

## Building the app

The app can be built by using the provided Makefile by running:

    make

This requires the following things to be present:
* make
* which
* tar: for building the archive
* curl: used if phpunit and composer are not installed to fetch them from the web
* npm: for building and testing everything JS, only required if a package.json is placed inside the **js/** folder

The make command will install or update Composer dependencies if a composer.json is present and also **npm run build** if a package.json is present in the **js/** folder. The npm **build** script should use local paths for build systems and package managers, so people that simply want to build the app won't need to install npm libraries globally, e.g.:

**package.json**:
```json
"scripts": {
    "test": "node node_modules/gulp-cli/bin/gulp.js karma",
    "prebuild": "npm install && node_modules/bower/bin/bower install && node_modules/bower/bin/bower update",
    "build": "node node_modules/gulp-cli/bin/gulp.js"
}
```


## Publish to App Store

First get an account for the [App Store](http://apps.nextcloud.com/) then run:

    make && make appstore

The archive is located in build/artifacts/appstore and can then be uploaded to the App Store.

## Running tests
You can use the provided Makefile to run all tests by using:

    make test

This will run the PHP unit and integration tests and if a package.json is present in the **js/** folder will execute **npm run test**

Of course you can also install [PHPUnit](http://phpunit.de/getting-started.html) and use the configurations directly:

    phpunit -c phpunit.xml

or:

    phpunit -c phpunit.integration.xml

for integration tests


## Setup dev environment
- Add `docker-compose.yml`:
  ```yaml
    version: '3.8'
    
    services:
        db:
            image: postgres:13
            container_name: nextcloud-db
            volumes:
            - nextcloud-db:/var/lib/postgresql/data
            environment:
              - POSTGRES_DB=nextcloud
              - POSTGRES_USER=nextcloud
              - POSTGRES_PASSWORD=your-db-password
            restart: unless-stopped
            
        app:
            image: nextcloud:latest
            container_name: nextcloud-app
            user: ":1000"
            depends_on:
            - db
            ports:
              - "8080:80"
            volumes:
              - ./journal/:/var/www/html/custom_apps/journal
            environment:
              - POSTGRES_HOST=db
              - POSTGRES_DB=nextcloud
              - POSTGRES_USER=nextcloud
              - POSTGRES_PASSWORD=your-db-password
            restart: unless-stopped
  
    volumes:
        nextcloud-db:
    ```
- Run `npm install` here.
- Run `make all`
- Run `docker-compose up -d` where the compose file is located above.
- Go to `localhost:8080` and configure admin account.
  - Ignore, that recommend apps can't be fetched. Instead refresh the page.
- Go to installed apps. 
- Activate `Journal` app (2x necessary).
- Go into app: `docker-compose exec  app /bin/bash`
- Install vim: `apt update && apt install vim`
- Update config.php: 
  Add trusted ip: 
  ```
    array (
         # 'localhost:8080',
         # '192.*.*.*',
          '10.*.*.*',
  ),
  ```
- Add on Android phone in DAVx5 app the created admin account with `ip:8080/remote.php/dav`
- Add a new calendar with journal as type.
- Run `npm run watch` to keep build up to date.
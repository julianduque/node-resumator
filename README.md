# Resumator [![Build Status](https://travis-ci.org/julianduque/node-resumator.svg)](https://travis-ci.org/julianduque/node-resumator)

Resumator Node.js API Client

## Usage

```
$ npm install resumator --save
```

A basic example using `resumator` client to save an Applicant

``` js
var resumator = require('resumator');

var client = resumator.createClient({
  apiKey: process.env.RESUMATOR_API_KEY
});

client.applicants.save({
  first_name: 'Julian',
  last_name: 'Duque',
  email: 'julianduquej@gmail.com'
}, function (err, res, body) {
  // process result
});
```
## API

### Activities

Get activity by id

``` js
client.activities.get(id, callback);
```

Get activities list

``` js
client.activities.list([options], callback);
```

### Applicants

Get applicant by id

``` js
client.applicants.get(id, callback);
```

Get applicants list

``` js
client.applicants.list([options], callback);
```

Save an applicant

``` js
client.applicants.save(applicant, callback);
```

### Categories

Get category by id

``` js
client.categories.get(id, callback);
```

Get categories list

``` js
client.categories.list([options], callback);
```

Save a category

``` js
client.categories.save(applicant, callback);
```

### Contacts

Get contact by id

``` js
client.contacts.get(id, callback);
```

Get contacts list

``` js
client.contacts.list([options], callback);
```

### Files

```
Not implemented yet
```

### Jobs

Get job by id

``` js
client.jobs.get(id, callback);
```

Get jobs list

``` js
client.jobs.list([options], callback);
```

Save a job

``` js
client.jobs.save(applicant, callback);
```

### Questionnaire

```
Not implemented yet
```

### Notes

```
Not implemented yet
```

### Tasks

Get task by id

``` js
client.tasks.get(id, callback);
```

Get tasks list

``` js
client.tasks.list([options], callback);
```

### Users

Get user by id

``` js
client.users.get(id, callback);
```

Get users list

``` js
client.users.list([options], callback);
```


## The MIT License (MIT)

Copyright (c) 2014 - Julian Duque, NodeSource

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

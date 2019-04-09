### E-Commerce SaS for selling Electronic Products, such as Pdf's, Illustations

a sample Ruby on Rails application integrated with two factor authentication based E-Commerce App.

## Local Setup

* Clone the Repository
```cassandraql
    git clone https://github.com/mkmms/ecommerce-kalebr
    cd ecommerce-kalebr
```

* Install the dependencies.
```cassandraql
    bundle install
```

Copy the .env.example file to .env, and edit it including your credentials for the Twilio API and Mailer configs


* Create database and run migrations.
 
```
    bundle exec rake db:setup
```

* Start the server
```
    rails s
```